using AutoMapper;
using BusinessObjects.DTO;
using BusinessObjects.Models;
using DataAccess;
using Microsoft.AspNetCore.Mvc;
using Reporitories;
using System.Collections;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/test")]
    [ApiController]
    public class TestController : ControllerBase
    {
        // Repository
        private ITestRepository repository = new TestRepository();
        private IChapterRepository repositoryChapter = new ChapterRepository();
        private ICourseRepository repositoryCourse = new CourseRepository();
        private ITestDoneRepository repositoryTestDone = new TestDoneRepository();
        // Mapper
        private readonly IMapper _mapper;

        // Get mapper singleton
        public TestController(IMapper mapper)
        {
            _mapper = mapper;
        }

        // GET: api/<TestController>
        [HttpGet("get")]
        public ActionResult<IEnumerable<TestDTO>> Get()
        {
            IEnumerable<Test> test = repository.GetTests();
            IEnumerable<TestDTO> testDTO = _mapper.Map<IEnumerable<TestDTO>>(test);
            foreach (var item in testDTO)
            {
                Chapter chapter = repositoryChapter.FindChapterById((int)item.ChapterId);
                if (chapter != null) 
                    item.ChapterName = chapter.ChapterName;
                Course course = repositoryCourse.FindCourseById((int)item.CourseId);
                if(course != null) 
                    item.CourseName = course.CourseName;

            }
            return Ok(testDTO);
        }

        // GET api/<TestController>/5
        [HttpPost("get/by-id")]
        public ActionResult Get(GetTestDTO getTestDTO)
        {
            var test = repository.FindTestById(getTestDTO.TestId);
            if (test == null) return NotFound();
            TestDTO testDTO = _mapper.Map<TestDTO>(test);
                Chapter chapter = repositoryChapter.FindChapterById((int)testDTO.ChapterId);
                if (chapter != null)
                    testDTO.ChapterName = chapter.ChapterName;
                Course course = repositoryCourse.FindCourseById((int)testDTO.CourseId);
                if (course != null)
                    testDTO.CourseName = course.CourseName;
            return Ok(testDTO);
        }

        // POST api/<TestController>
        [HttpPost("insert")]
        public ActionResult InsertTest(InsertTestDTO testDTO)
        {
                Test test = _mapper.Map<Test>(testDTO);
                repository.CreateTest(test);
                return Ok();
        }

        // PUT api/<TestController>/5
        [HttpPost("update")]
        public ActionResult UpdateTest(UpdateTestDTO testDTO)
        {
            var test = repository.FindTestById((int)testDTO.TestId);
            if (test == null) return NotFound();
            Test t = _mapper.Map<Test>(testDTO);
            repository.UpdateTest(t);
            return Ok();
        }

        // DELETE api/<TestController>/5
        [HttpPost("delete")]
        public ActionResult Delete(DeleteTestDTO testDTO)
        {
            var test = repository.FindTestById(testDTO.TestId);
            if (test == null) return NotFound();
            else
            {
                repository.DeleteTest (test);
                return Ok();
            }
        }
        [HttpPost("insert/test-done")]
        public ActionResult InsertTestDone([FromBody] TestDoneDTO testDoneDTO)
        {
            var checkTestDone = repositoryTestDone.GetTestDone((int)testDoneDTO.CourseId, testDoneDTO.Email, (int)testDoneDTO.TestId);
            if (checkTestDone == null)
            {
                TestDone testDone = _mapper.Map<TestDone>(testDoneDTO);
                repositoryTestDone.CreateTestDone(testDone);
                
            }
            return Ok();
        }
        [HttpPost("get/test-done")]
        public ActionResult<ArrayList> GetTestDones([FromBody]TestDoneDTO testDoneDTO)
        {
                ArrayList testID = repositoryTestDone.GetTestDones((int)testDoneDTO.CourseId,testDoneDTO.Email);
                return Ok(testID);
        }
    }
}
