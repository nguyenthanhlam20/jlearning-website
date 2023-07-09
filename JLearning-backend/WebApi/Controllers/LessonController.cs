using AutoMapper;
using BusinessObjects.DTO;
using BusinessObjects.Models;
using Microsoft.AspNetCore.Mvc;
using Reporitories;
using System.Collections;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/lesson")]
    [ApiController]
    public class LessonController : ControllerBase
    {
        // Repository
        private ILessonRepository repository = new LessonRepository();
        private ILessonDoneReposotory repositoryLessonDone = new LessonDoneReposotory();
        // Mapper
        private readonly IMapper _mapper;

        // Get mapper singleton
        public LessonController(IMapper mapper)
        {
            _mapper = mapper;
        }


        // POST api/<LessonController>
        [HttpPost("insert")]
        public ActionResult Post(InsertLessonDTO lessonDTO)
        {
            Lesson lesson = _mapper.Map<Lesson>(lessonDTO);
            repository.CreateLesson(lesson);
            return Ok();
        }

        // PUT api/<LessonController>/5
        [HttpPost("update")]
        public ActionResult Put( UpdateLessonDTO lessonDTO)
        {
            var less = repository.FindLessonById((int)lessonDTO.LessonId);
            if (less == null) return NotFound();
            Lesson lesson = _mapper.Map<Lesson>(lessonDTO);
            repository.UpdateLesson(lesson);
            return Ok();
        }

        // DELETE api/<LessonController>/5
        [HttpPost("delete")]
        public ActionResult Delete(DeleteLessonDTO lessonDTO)
        {
            var less = repository.FindLessonById(lessonDTO.LessonId);
            if (less == null) return NotFound();
            else
            {
                repository.DeleteLesson(less);
                return Ok();
            }
        }
        [HttpPost("insert/lesson-done")]
        public ActionResult PostLessonDone([FromBody][Bind("lesson_id,email,course_id")] LessonDoneDTO lessonDoneDTO)
        {
            var checkLessonDone = repositoryLessonDone
                .FindLessonDone((int)lessonDoneDTO.CourseId, lessonDoneDTO.Email, (int)lessonDoneDTO.LessonId);
            if (checkLessonDone == null)
            {
                LessonDone lessonDone = _mapper.Map<LessonDone>(lessonDoneDTO);

                repositoryLessonDone.CreateLessonDone(lessonDone);
                
            }
            return Ok();
        }
        [HttpPost("get/lesson-done")]
        public ActionResult<ArrayList> GetLessonDone([FromBody][Bind("course_id,email")] LessonDoneDTO lessonDoneDTO)
        {
                ArrayList lessID = repositoryLessonDone.GetLessonDones((int)lessonDoneDTO.CourseId, lessonDoneDTO.Email);
                return Ok(lessID);
        }
    }
}

