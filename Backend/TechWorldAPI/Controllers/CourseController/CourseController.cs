using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using TechWorldAPI.DTO_s.Course;
using TechWorldAPI.Services.CourseService.Interfaces;

namespace TechWorldAPI.Controllers.CourseController
{
    public class CourseController : ControllerBase
    {
        private readonly ICourseHandler _courseHandler;
        private readonly IMapper _mapper;
        
        public CourseController(ICourseHandler courseHandler, IMapper mapper)
        {
            _courseHandler = courseHandler;
            _mapper = mapper;
        }

        [HttpPost("CreateCourse")]
        public async Task<IActionResult> CreateCourse([FromBody] CourseDto course)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var result = await _courseHandler.CreateCourse(course);

                return Ok(new
                {
                    success = true,
                    message = "Course created successfully",
                    data = result
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }
    }
}
