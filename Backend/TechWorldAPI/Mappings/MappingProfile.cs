using AutoMapper;
using TechWorldAPI.DTO_s.Auth;
using TechWorldAPI.DTO_s.Course;
using TechWorldAPI.DTO_s.User;
using TechWorldAPI.Model.AuthModel;
using TechWorldAPI.Model.CourseContent;
using TechWorldAPI.Model.CourseModel;
using TechWorldAPI.Model.UserProfileModel;

namespace TechWorldAPI.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserSignupDto, UserModel>();
            CreateMap<UserModel, UserSignupDto>();
            CreateMap<UserProfile, UserProfileDto>();
            CreateMap<UserProfileDto, UserProfile>();
            CreateMap<CourseContentDto, CourseContentModel>();
            CreateMap<CourseContentModel, CourseContentDto>();
            CreateMap<CourseDto, Courses>();
            CreateMap<Courses, CourseDto>();
        }
    }
}
