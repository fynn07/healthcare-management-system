using Microsoft.EntityFrameworkCore;
using PostgreSQL.Data;
using DotNetEnv;
using Microsoft.OpenApi.Models;
using server_dotnet.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;

var builder = WebApplication.CreateBuilder(args);

Env.Load();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>(); // Register IHttpContextAccessor
builder.Services.AddScoped<TokenService>(); // Register TokenService
builder.Services.AddScoped<PaginationService>();
builder.Services.AddAuthentication("Token")
    .AddScheme<AuthenticationSchemeOptions, TokenAuthenticationHandler>("Token", options => { });

builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Token", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Token", // Custom token scheme
        Description = "Enter 'Token' followed by a space and your custom token"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Token"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins", builder =>
        builder.WithOrigins("http://127.0.0.1:3000")  // Replace with your frontend URLs
               .AllowAnyMethod()  // Allows any HTTP method (GET, POST, etc.)
               .AllowAnyHeader()  // Allows any HTTP header
               .AllowCredentials());  // Allows credentials like cookies or authorization headers
});

// builder.Services.AddScoped<TokenAuthenticationMiddleware>();

var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION");


builder.Services.AddDbContext<ApplicationDBContext>(options =>
    options.UseNpgsql(connectionString) 
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigins");

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();