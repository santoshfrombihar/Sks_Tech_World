using TechWorldAPI.Model.AuthModel;

namespace TechWorldAPI.Model.CourseModel
{
    public class Courses
    {
        public int Id { get; set; }
        public string? CourseName { get; set; }
        public List<UserModel>? User { get; set; }

    }
}
