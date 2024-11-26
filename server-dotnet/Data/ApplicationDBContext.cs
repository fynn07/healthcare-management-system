using Microsoft.EntityFrameworkCore;
using server_dotnet.Models;

using Microsoft.Extensions.Configuration;
using YourNamespace;

namespace PostgreSQL.Data
{
    public class ApplicationDBContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public ApplicationDBContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            // connect to postgres with connection string from app settings
            options.UseNpgsql(Environment.GetEnvironmentVariable("DATABASE_CONNECTION"));
        }

        public DbSet<Token> Tokens { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Provider> Providers { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<MedicationHistory> MedicationHistory { get; set; }
        public DbSet<VaccinationHistory> VaccinationHistory { get; set; }
    }
}