using TechWorldAPI.DTO_s.Course;

namespace TechWorldAPI.Services.CourseService.Interfaces
{
    public interface ICourseHandler
    {
        public CourseDto GetCourse(int Id);
        public CourseDto UpdateCourse(CourseDto course);
        public Task<CourseDto> CreateCourse(CourseDto course);
        public CourseContentDto GetCourseContent(int Id);
        public CourseContentDto UpdateCourseContent(CourseContentDto courseContent);
        public CourseContentDto CreateCourseContent(CourseContentDto courseContent);
    }
}
