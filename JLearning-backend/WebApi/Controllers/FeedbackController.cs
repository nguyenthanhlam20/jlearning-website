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
        public ActionResult Get([FromBody] FeedbackDTO feedback)
        {
            var fb = repository.FindFeedBackById(feedback.CourseId, feedback.Email);
            if (fb == null) return NotFound();
            FeedbackDTO feedbackDTO = _mapper.Map<FeedbackDTO>(fb);
            return Ok(feedbackDTO);
        }

        [HttpGet("get")]
        public ActionResult GetFeedbacks()
        {
            List<Feedback> feedbacks =  repository.GetFeebacks();
            return Ok(feedbacks);
        }

        // POST api/<FeedbackController>
        [HttpPost("insert")]
        public ActionResult InsertFeedback([FromBody] FeedbackDTO feedbackDTO)
        {
                Feedback Feedback = _mapper.Map<Feedback>(feedbackDTO);
                repository.CreateFeedback(Feedback);
                return Ok();
        }

        // PUT api/<FeedbackController>/5
        [HttpPut("update")]
        public ActionResult UpdateFeedback([FromBody] FeedbackDTO feedbackDTO)
        {
            var fb = repository.FindFeedBackById((int)feedbackDTO.CourseId, feedbackDTO.Email);
            if (fb == null) return NotFound();
            Feedback feedback = _mapper.Map<Feedback>(feedbackDTO);
            repository.UpdateFeedback(feedback);
            return Ok();
        }
    }
}
