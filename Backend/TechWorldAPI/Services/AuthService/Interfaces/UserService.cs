using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TechWorldAPI.DTO_s.Auth;
using TechWorldAPI.Model.AppDbContext;
using TechWorldAPI.Model.AuthModel;
using TechWorldAPI.Services.AuthService.Implementation;

namespace TechWorldAPI.Services.AuthService.Interfaces
{
    public class UserService : IUserService
    {
        private AppDbContext _appDbContext;
        private IMapper _mapper;
        public UserService(AppDbContext appDbContext, IMapper mapper)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
        }
        public UserSignupDto GetUserById(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<UserSignupDto> SetUserModel(UserSignupDto userDto)
        {
            try
            {
                // Check if user already exists in the database (based on email)
                var existingUser = await _appDbContext.Users.FirstOrDefaultAsync(u => u.Email == userDto.Email);
                if (existingUser != null)
                {
                    Console.WriteLine("User with this email already exists.");
                    return null; // Or handle appropriately (e.g., throw an exception)
                }

                // Map DTO to Entity Model
                var user = _mapper.Map<UserModel>(userDto);

                // Add new user to the database
                _appDbContext.Users.Add(user);
                await _appDbContext.SaveChangesAsync();

                // Map saved user back to DTO (if needed)
                var resultDto = _mapper.Map<UserSignupDto>(user);

                return resultDto;
            }
            catch (Exception e)
            {
                // Log the error
                Console.WriteLine($"Error: {e.Message}");
                throw; // Rethrow for further handling
            }
        }

    }
}
