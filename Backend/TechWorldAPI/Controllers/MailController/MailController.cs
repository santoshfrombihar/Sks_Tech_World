using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Concurrent;
using TechWorldAPI.Model.AppDbContext;
using TechWorldAPI.Services.MailService;

namespace TechWorldAPI.Controllers.MailController
{
    [ApiController]
    [Route("api/[controller]")]
    public class MailController : ControllerBase
    {
        private readonly MailService _emailService;
        private readonly AppDbContext _appDbContext;
        private static ConcurrentDictionary<string, (string Otp, DateTime Expiry)> otpStorage
            = new ConcurrentDictionary<string, (string, DateTime)>();

        public MailController(MailService emailService, AppDbContext appDbContext)
        {
            _emailService = emailService;
            _appDbContext = appDbContext;
        }

        [HttpPost("send-otp")]
        public IActionResult SendOtp([FromQuery] string email)
        {
            var existingUser = _appDbContext.Users.FirstOrDefault(u => u.Email == email);
            if(existingUser == null)
            {
                var otp = new Random().Next(100000, 999999).ToString();
                var expiry = DateTime.Now.AddMinutes(5);

                otpStorage[email] = (otp, expiry);

                _emailService.SendEmail(email, "Your OTP Code", $"Your OTP is: {otp}");

                return Ok(new { Message = "OTP sent to email" });
            }
            else
            {
                return Conflict(new { userExists = "true" , message = "User with this email already exists." });
            }
          
        }

        [HttpPost("verify-otp")]
        public IActionResult VerifyOtp([FromQuery] string email, [FromQuery] string otp)
        {
            if (otpStorage.TryGetValue(email, out var storedOtp))
            {
                if (storedOtp.Expiry > DateTime.Now && storedOtp.Otp == otp)
                {
                    otpStorage.TryRemove(email, out _); 
                    return Ok(new { Message = "OTP Verified!" });
                }
                return BadRequest(new { Message = "Invalid or expired OTP" });
            }

            return BadRequest(new { Message = "No OTP found for this email" });
        }
    }
}
