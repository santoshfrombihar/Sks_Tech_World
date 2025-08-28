using AutoMapper;
using TechWorldAPI.DTO_s.Auth;
using TechWorldAPI.DTO_s.User;
using TechWorldAPI.Model.AuthModel;
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
        }
    }
}
