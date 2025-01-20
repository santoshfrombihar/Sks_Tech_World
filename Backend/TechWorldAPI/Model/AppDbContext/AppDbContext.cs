
using Microsoft.EntityFrameworkCore;
using TechWorldAPI.Model.AuthModel;

namespace TechWorldAPI.Model.AppDbContext
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<UserModel> User { get; set; }
    }
}
