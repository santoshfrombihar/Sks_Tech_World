using Amazon.Lambda.AspNetCoreServer;

namespace TechWorldAPI
{
    public class LamdaEntry : APIGatewayHttpApiV2ProxyFunction
    {
        protected override void Init(IWebHostBuilder builder)
        {
            builder
                .UseStartup<Startup>(); 
        }
    }
}
