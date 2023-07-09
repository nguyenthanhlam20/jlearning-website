using AutoMapper;
using BusinessObjects.DTO;
using BusinessObjects.Models;
using Microsoft.AspNetCore.Mvc;
using Reporitories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/feedback")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        // Repository
        private IFeedbackRepository repository = new FeedbackRepository();

        // Mapper
        private readonly IMapper _mapper;

        // Get mapper singleton
        public FeedbackController(IMapper mapper)
        {
            _mapper = mapper;
        }

        // GET api/<FeedbackController>/5
        [HttpPost("get/by-id")]
        public ActionResult Get(int course_id, string email)
        {
            var fb = repository.FindFeedBackById(course_id, email);
            if (fb == null) return NotFound();
            FeedbackDTO feedbackDTO = _mapper.Map<FeedbackDTO>(fb);
            return Ok(feedbackDTO);
        }

        // POST api/<FeedbackController>
        [HttpPost("insert")]
        public ActionResult Post([FromBody][Bind("course_id,course_name,email,message,name,star,user_avatar_url")] FeedbackDTO feedbackDTO)
        {
                Feedback Feedback = _mapper.Map<Feedback>(feedbackDTO);
                repository.CreateFeedback(Feedback);
                return Ok();
        }

        // PUT api/<FeedbackController>/5
        [HttpPost("update")]
        public ActionResult Put([FromBody][Bind("feedback_id,course_id,course_name,email,message,name,star,user_avatar_url")] FeedbackDTO feedbackDTO)
        {
            var fb = repository.FindFeedBackById((int)feedbackDTO.CourseId, feedbackDTO.Email);
            if (fb == null) return NotFound();
            Feedback feedback = _mapper.Map<Feedback>(feedbackDTO);
            repository.UpdateFeedback(feedback);
            return Ok();
        }
    }
}
