using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TechWorldAPI.DTO_s.Auth;
using TechWorldAPI.Model.AuthModel;
using TechWorldAPI.Services.AuthService.Implementation;

namespace TechWorldAPI.Controllers.AuthController
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IMapper _mapper;
        private IUserService _userService;
        public AuthController(IMapper mapper, IUserService userService)
        {
            _mapper = mapper;
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {
            UserSignupDto user  =  _userService.GetUserByEmail(login.Email).Result;
            if (user != null)
            {
                if (login.Email == user.Email && login.Password == user.Password)
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.UTF8.GetBytes("MyVerySecureAndStrongJWTKey123456!"); // Replace with your secret key
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new[]
                        {
                    new Claim(ClaimTypes.Name, login.Email),
                    new Claim(ClaimTypes.Role, "Admin") // Optional: Add roles or custom claims
                }),
                        Expires = DateTime.UtcNow.AddHours(1),
                        Issuer = "localhost",
                        Audience = "postmanClient",
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                    };

                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    return Ok(new { Token = tokenHandler.WriteToken(token), UserName = user.FirstName + ' ' +user.LastName, Email = user.Email});
                }
            }
            return Unauthorized();
        }



        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserSignupDto userDto)
        {
            var user = await _userService.SetUserModel(userDto);
            if(user != null)
            {
                return Ok(user);
            }
            else
            {
                return Conflict(new { message = "User with this email already exists." }); // HTTP 409 Conflict
            }
        }
    }
}
