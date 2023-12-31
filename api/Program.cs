using api;
using api.Data;
using api.Interfaces;
using api.Repository;
using Microsoft.EntityFrameworkCore;

var AllowSpecificOrigins = "_AllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://host.docker.internal.*", "http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
                      });
});

builder.Services.AddControllers();
builder.Services.AddTransient<Seed>();
builder.Services.AddScoped<IFileRepository, FileRepository>();
builder.Services.AddScoped<ILotRepository, LotRepository>();
builder.Services.AddScoped<IFilePackRepository, FilePackRepository>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(options =>
{
    var serverVersion = new MySqlServerVersion(new Version(8, 0, 34));
    options.UseMySql(builder.Configuration.GetConnectionString("MYSQLConnection"), serverVersion);
});

var app = builder.Build();

if (args.Length == 1 && args[0].ToLower() == "seeddata")
    SeedData(app);
void SeedData(IHost app)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();
    using (var scope = scopedFactory.CreateScope())
    {
        var service = scope.ServiceProvider.GetService<Seed>();
        service.SeedDataContext();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(AllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
