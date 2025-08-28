using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TechWorldAPI.DTO_s.User;
using TechWorldAPI.Model.AppDbContext;
using TechWorldAPI.Model.UserProfileModel;

namespace TechWorldAPI.Controllers.UserController
{

   

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _appDbContext;
        private readonly IMapper _mapper;

        public UserController(AppDbContext appDbContext, IMapper mapper)
        {
            _appDbContext = appDbContext;
            _mapper = mapper;
        }

        [HttpPost("userprofile")]
        public async Task<ActionResult<UserProfile>> CreateUserProfile([FromBody] UserProfileDto userProfileDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var userProfile = _mapper.Map<UserProfile>(userProfileDto);

                await _appDbContext.UserProfiles.AddAsync(userProfile);
                await _appDbContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetUserProfileById),new { id = userProfile.Id }, userProfile);
            }
            catch (Exception ex)
            {
                // Log error properly instead of Console.WriteLine in real apps
                Console.WriteLine(ex);

                return StatusCode(500, "An error occurred while creating the user profile.");
            }
        }

        [HttpGet("userprofile/{id}")]
        public async Task<ActionResult> GetUserProfileById(int id)
        {
            var userProfile = await _appDbContext.UserProfiles.FindAsync(id);

            if (userProfile == null)
                return NotFound();

            return Ok(userProfile);
        }
    }
}
