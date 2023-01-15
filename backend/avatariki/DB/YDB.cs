using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Avatariki.Models;
using Avatariki.Models.Request;
using Ydb.Sdk.Table;
using Ydb.Sdk.Value;

namespace Avatariki.DB
{
    public class YDB
    {
        private TableClient client;

        public YDB(TableClient client)
        {
            this.client = client;
        }

        public async Task<Reviews[]> GetAll()
        {
            var response = await client.SessionExec(async session =>
            {
                var query = @"SELECT id, userName , description, mark FROM reviews";

                return await session.ExecuteDataQuery(
                    query,
                    parameters: new Dictionary<string, YdbValue>(),
                    txControl: TxControl.BeginSerializableRW().Commit()
                );
            });

            response.Status.EnsureSuccess();
            var queryResponse = (ExecuteDataQueryResponse)response;
            return queryResponse.Result.ResultSets[0].Rows.Select(row => new Reviews
            {
                id = (ulong?)row["id"],
                userName = (string?)row["userName"],
                description = (string?)row["description"],
                mark = (int?)row["mark"]
            }).ToArray();
        }

        public async Task<Reviews> Create(CreateReviews createGuestRequest)
        {
            var newId = (await GetAll()).Max(g => g.id).Value + 1;

            var response = await client.SessionExec(async session =>
            {
                var query = @"
DECLARE $id AS Uint64;
DECLARE $description AS Utf8;
DECLARE $mark AS Int32;
DECLARE $userName AS Utf8;

INSERT INTO reviews (id, description, mark, userName) VALUES ($id, $description, $mark, $userName)";

                return await session.ExecuteDataQuery(
                    query,
                    parameters: new Dictionary<string, YdbValue>()
                    {
                        { "$id", YdbValue.MakeUint64(newId) },
                        { "$userName", YdbValue.MakeUtf8(createGuestRequest.Name) },
                        { "$description", YdbValue.MakeUtf8(createGuestRequest.Description) },
                        { "mark", YdbValue.MakeInt32(createGuestRequest.Mark) }
                    },
                    txControl: TxControl.BeginSerializableRW().Commit()
                );
            });

            response.Status.EnsureSuccess();

            return new Reviews()
            {
                id = newId,
                userName = createGuestRequest.Name,
                description = createGuestRequest.Description,
                mark = createGuestRequest.Mark
            };
        }
    }
}