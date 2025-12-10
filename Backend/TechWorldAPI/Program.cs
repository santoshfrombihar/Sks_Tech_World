using TechWorldAPI;

var builder = WebApplication.CreateBuilder(args);

// Use Startup.cs
var startup = new Startup(builder.Configuration);
startup.ConfigureServices(builder.Services);


builder.Services.AddAWSLambdaHosting(LambdaEventSource.HttpApi);

var app = builder.Build();
startup.Configure(app);

app.Run();
