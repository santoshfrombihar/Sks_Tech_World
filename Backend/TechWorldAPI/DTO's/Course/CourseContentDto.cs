using TechWorldAPI.Model.CourseModel;

namespace TechWorldAPI.DTO_s.Course
{
    public class CourseContentDto
    {
        public int Id { get; set; }
        public int LessionNumer { get; set; }
        public int CourseId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}
