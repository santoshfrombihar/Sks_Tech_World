using Microsoft.EntityFrameworkCore;
using TechWorldAPI.Model.CourseModel;

namespace TechWorldAPI.Model.CourseContent
{
    public class CourseContentModel
    {
        public int Id { get; set; }
        public int LessionNumer { get; set; }
        public int CourseId { get; set; }
        public Courses? Courses { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }

    }
}
