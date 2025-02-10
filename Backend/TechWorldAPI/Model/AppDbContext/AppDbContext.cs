
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>()
                .HasOne(u => u.UserProfile) // One User has one UserProfile
                .WithMany() // No reverse navigation needed in UserProfile
                .HasForeignKey(u => u.UserProfileId) // Foreign key in User table
                .OnDelete(DeleteBehavior.Cascade); // Optional: Set delete behavior
        }
    }
}
