using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Concurrent;
using TechWorldAPI.Services.MailService;

namespace TechWorldAPI.Controllers.MailController
{
    [ApiController]
    [Route("api/[controller]")]
    public class MailController : ControllerBase
    {
        private readonly MailService _emailService;
        private static ConcurrentDictionary<string, (string Otp, DateTime Expiry)> otpStorage
            = new ConcurrentDictionary<string, (string, DateTime)>();

        public MailController(MailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("send-otp")]
        public IActionResult SendOtp([FromQuery] string email)
        {
            var otp = new Random().Next(100000, 999999).ToString();
            var expiry = DateTime.Now.AddMinutes(5);

            otpStorage[email] = (otp, expiry);

            _emailService.SendEmail(email, "Your OTP Code", $"Your OTP is: {otp}");

            return Ok(new { Message = "OTP sent to email" });
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
