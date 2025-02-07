using TechWorldAPI.DTO_s.Auth;

namespace TechWorldAPI.Services.AuthService.Implementation
{
    public interface IUserService
    {
        public Task<UserSignupDto> GetUserByEmail(string email);
        public Task<UserSignupDto> SetUserModel(UserSignupDto user);
    }
}
