using AutoMapper;
using BusinessObjects.DTO;
using BusinessObjects.Models;
using Microsoft.AspNetCore.Mvc;
using Reporitories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/course")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        // Repository
        private ICourseRepository repository = new CourseRepository();

        // Mapper
        private readonly IMapper _mapper;

        // Get mapper singleton
        public CourseController(IMapper mapper)
        {
            _mapper = mapper;
        }
        // GET: api/<CourseController>
        [HttpGet("get")]
        public ActionResult<IEnumerable<CourseDTO>> GetCourses()
        {
            IEnumerable<Course> courses = repository.GetCourses();
            IEnumerable<CourseDTO> courseDTOs = _mapper.Map<IEnumerable<CourseDTO>>(courses);
            return Ok(courseDTOs);
        }

        // GET api/<BlogController>/5
        [HttpPost("get/by-id")]
        public ActionResult GetCourseById(GetCourseDTO getCourseDTO)
        {
            Console.WriteLine("Get course by id: " + getCourseDTO.CourseId);
            var course = repository.FindCourseById(getCourseDTO.CourseId);
            CourseDTO courseDTO = _mapper.Map<CourseDTO>(course);
            return Ok(courseDTO);
        }

        // POST api/<CourseController>
        [HttpPost("insert")]
        public ActionResult InsertCourse(InsertCourseDTO courseDTO)
        {
                Course course = _mapper.Map<Course>(courseDTO);
                repository.CreateCourse(course);
                return Ok();
        }

        // PUT api/<CourseController>/5
        [HttpPut("update")]
        public ActionResult UpdateCourse(UpdateCourseDTO courseDTO)
        {
            Console.WriteLine("update course by id: " + courseDTO.CourseId);
            Course cours = _mapper.Map<Course>(courseDTO);
            repository.UpdateCourse(cours);
            return Ok();
        }

        [HttpPost("get/user-courses")]
        public ActionResult<IEnumerable<CourseDTO>> GetUserCourses([FromBody] AccountDTO accountDTO)
        {
            IEnumerable<Course> courses = repository.FindCoursesByEmail(accountDTO.Email);
            IEnumerable<CourseDTO> courseDTOs = _mapper.Map<IEnumerable<CourseDTO>>(courses);
            Console.WriteLine("Number of course: " + courseDTOs.Count());
            return Ok(courseDTOs);
        }

        [HttpPost("insert/user-course")]
        public ActionResult InsertUserCourse(UserCourseDTO userCourseDTO)
        {
            UserCourse userCourse = _mapper.Map<UserCourse>(userCourseDTO);
            repository.CreateUserCourse(userCourse);
            return Ok();
        }
    }
}
