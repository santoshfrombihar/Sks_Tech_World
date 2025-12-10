using AutoMapper;
using TechWorldAPI.DTO_s.Course;
using TechWorldAPI.DTO_s.User;
using TechWorldAPI.Model.AppDbContext;
using TechWorldAPI.Model.CourseModel;
using TechWorldAPI.Model.UserProfileModel;
using TechWorldAPI.Services.CourseService.Interfaces;

namespace TechWorldAPI.Services.CourseService.Implementation
{
    public class CourseHandler : ICourseHandler
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;
        public CourseHandler(AppDbContext appDbContext, IMapper mapper)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
        }
        public async Task<CourseDto> CreateCourse(CourseDto course)
        {
            var coursedata = _mapper.Map<Courses>(course);
            await _appDbContext.AddAsync(coursedata);
            await _appDbContext.SaveChangesAsync();
            return course;
        }

        public CourseContentDto CreateCourseContent(CourseContentDto courseContent)
        {
            throw new NotImplementedException();
        }

        public CourseDto GetCourse(int Id)
        {
            throw new NotImplementedException();
        }

        public CourseContentDto GetCourseContent(int Id)
        {
            throw new NotImplementedException();
        }

        public CourseDto UpdateCourse(CourseDto course)
        {
            throw new NotImplementedException();
        }

        public CourseContentDto UpdateCourseContent(CourseContentDto courseContent)
        {
            throw new NotImplementedException();
        }
    }
}
