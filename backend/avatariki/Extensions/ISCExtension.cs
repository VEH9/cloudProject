using Avatariki.DB;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Ydb.Sdk;
using Ydb.Sdk.Table;
using Ydb.Sdk.Yc;

namespace Avatariki.Extensions
{
    public static class ISCExtension
    {
        public static IServiceCollection AddDB(this IServiceCollection services)
        {
            var saProvider = new ServiceAccountProvider(
                saFilePath: "creds.json", // Path to file with service account JSON info
                loggerFactory: new LoggerFactory());

            saProvider.Initialize().GetAwaiter().GetResult();
            var config = new DriverConfig(
                endpoint: "grpcs://ydb.serverless.yandexcloud.net:2135",
                database: "/ru-central1/b1gevtcmhcfbmj6mcng5/etnnkgclhkbqis85ajas",
                credentials: saProvider
            );

            var driver = new Driver(
                config: config,
                loggerFactory: new LoggerFactory()
            );

            driver.Initialize().GetAwaiter().GetResult(); // Make sure to await driver initialization
            return services
                .AddSingleton(new TableClient(driver, new TableClientConfig()))
                .AddSingleton<YDB>();
        }
    }
}