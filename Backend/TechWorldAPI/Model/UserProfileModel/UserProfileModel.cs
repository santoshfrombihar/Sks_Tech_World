using TechWorldAPI.Model.AuthModel;

namespace TechWorldAPI.Model.UserProfileModel
{
    public class UserProfile
    {
        public int Id { get; set; }

        public UserModel? UserId { get; set; }

        public string? SchoolName { get; set; }

        public string? CollegeName { get; set; }

        public string? UniversityName { get; set; }

        public string? Class { get; set; }

        public string? Course { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }

    }
}
