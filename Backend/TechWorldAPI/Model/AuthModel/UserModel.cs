using TechWorldAPI.Model.UserProfileModel;

namespace TechWorldAPI.Model.AuthModel
{
    public class UserModel
    {
        public int ID { get; set; }

        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }

        public int? UserProfileId { get; set; }

        public UserProfile? UserProfile { get; set; }

    }
}
