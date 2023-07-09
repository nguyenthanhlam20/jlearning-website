using AutoMapper;
using BusinessObjects.DTO;
using BusinessObjects.Models;
using DataAccess;
using Microsoft.AspNetCore.Mvc;
using Reporitories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/chapter")]
    [ApiController]
    public class ChapterController : ControllerBase
    {
        // Repository
        private IChapterRepository repository = new ChapterRepository();

        // Mapper
        private readonly IMapper _mapper;

        // Get mapper singleton
        public ChapterController(IMapper mapper)
        {
            _mapper = mapper;
        }


        // POST api/<ChapterController>
        [HttpPost("insert")]
        public ActionResult Post(InsertChapterDTO chapterDTO)
        {
            Chapter chapter = _mapper.Map<Chapter>(chapterDTO);
            repository.CreateChapter(chapter);
            return Ok();
        }

        // PUT api/<ChapterController>/5
        [HttpPut("update")]
        public ActionResult Put(UpdateChapterDTO chapterDTO)
        {
            var chapter = repository.FindChapterById((int)chapterDTO.ChapterId);
            if (chapter == null) return NotFound();
            Chapter chap = _mapper.Map<Chapter>(chapterDTO);
            repository.UpdateChapter(chap);
            return Ok();
        }

        // DELETE api/<ChapterController>/5
        [HttpPost("delete")]
        public ActionResult Delete(DeleteChapterDTO chapterDTO)
        {
            Console.WriteLine("Delete chapter: " + chapterDTO.ChapterId);
            var chapter = repository.FindChapterById(chapterDTO.ChapterId);
            if (chapter == null) return NotFound();
            else
            {
                repository.DeleteChapter(chapter);
                return Ok();
            }
        }
    }
}
