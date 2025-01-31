using TechWorldAPI.DTO_s.Auth;

namespace TechWorldAPI.Services.AuthService.Implementation
{
    public interface IUserService
    {
        public UserSignupDto GetUserById(int id);
        public Task<UserSignupDto> SetUserModel(UserSignupDto user);
    }
}
