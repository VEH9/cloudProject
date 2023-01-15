using System.Threading.Tasks;
using Avatariki.DB;
using Avatariki.Models;
using Avatariki.Models.Request;
using Microsoft.AspNetCore.Mvc;

namespace Avatariki.Controllers
{
    public class StateController : ControllerBase
    {
        private YDB YandexDB;
        public StateController(YDB yandexDb)
        {
            this.YandexDB = yandexDb;
        }
    
        [HttpGet]
        public async Task<ActionResult<Reviews[]>> GetAsync()
        {
            return await YandexDB.GetAll();
        }

        [HttpPost("rewiews")]
        public async Task<ActionResult<Reviews>> CreateGuestAsync(CreateReviews createGuestRequest)
        {
            return await YandexDB.Create(createGuestRequest);
        }
    }
}