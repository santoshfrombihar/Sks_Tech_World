using AutoMapper;
using TechWorldAPI.DTO_s.Auth;
using TechWorldAPI.Model.AuthModel;

namespace TechWorldAPI.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<UserSignupDto, UserModel>();
        }
    }
}
