using AutoMapper;
using BusinessObjects.DTO;
using BusinessObjects.Models;
using DataAccess;
using Microsoft.AspNetCore.Mvc;
using Reporitories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/question")]
    [ApiController]
    public class QuestionController : ControllerBase
    {
        // Repository
        private IQuestionRepository repository = new QuestionRepository();

        // Mapper
        private readonly IMapper _mapper;

        // Get mapper singleton
        public QuestionController(IMapper mapper)
        {
            _mapper = mapper;
        }


        // POST api/<QuestionController>
        [HttpPost("insert")]
        public ActionResult Post([FromBody] QuestionDTO questionDTO)
        {
                Question question = _mapper.Map<Question>(questionDTO);
                repository.CreateQuestion(question);
                return Ok();
        }

        // PUT api/<QuestionController>/5
        [HttpPut("update")]
        public ActionResult Put([FromBody] QuestionDTO questionDTO)
        {
            Console.WriteLine("Update question: " + questionDTO.QuestionId);
            var question = repository.FindQuestionById((int)questionDTO.QuestionId);
            if (question == null) return NotFound();
            Question ques = _mapper.Map<Question>(questionDTO);
            repository.UpdateQuestion(ques);
            return Ok();
        }

        // DELETE api/<QuestionController>/5
        [HttpPost("delete")]
        public ActionResult Delete([FromBody] QuestionDTO questionDTO)
        {
            var question = repository.FindQuestionById(questionDTO.QuestionId);
            if (question == null) return NotFound();
            else
            {
                repository.DeleteQuestion(question);
                return Ok();
            }
        }
    }
}
