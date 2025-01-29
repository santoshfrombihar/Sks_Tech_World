using TechWorldAPI.Model.AuthModel;

namespace TechWorldAPI.Services.AuthService.Implementation
{
    public interface IUserService
    {
        public UserModel GetUserById(int id);
        public UserModel SetUserModel(UserModel user);
    }
}
