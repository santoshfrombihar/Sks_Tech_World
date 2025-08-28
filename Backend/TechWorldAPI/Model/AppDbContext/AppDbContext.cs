
using Microsoft.EntityFrameworkCore;
using TechWorldAPI.Model.AuthModel;
using TechWorldAPI.Model.UserProfileModel;

namespace TechWorldAPI.Model.AppDbContext
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<UserModel> Users { get; set; }

        public DbSet<UserProfile> UserProfiles { get; set; }

        
    }
}
