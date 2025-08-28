using System.ComponentModel.DataAnnotations;

namespace TechWorldAPI.DTO_s.User
{
    public class UserProfileDto
    {
        public int Id { get; set; }

        public string? SchoolName { get; set; }

        public string? CollegeName { get; set; }

        public string? UniversityName { get; set; }

        public string? Class { get; set; }

        public string? Course { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }

        [Required]
        public int UserModelId { get; set; }
    }
}
