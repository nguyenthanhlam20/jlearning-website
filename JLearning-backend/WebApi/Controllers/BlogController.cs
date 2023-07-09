using AutoMapper;
using BusinessObjects.DTO;
using BusinessObjects.Models;
using DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Reporitories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/blog")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        // Repository
        private IBlogRepository repository = new BlogRepository();

        // Mapper
        private readonly IMapper _mapper;

        // Get mapper singleton
        public BlogController(IMapper mapper)
        {
            _mapper = mapper;
        }

        // GET: api/<BlogController>
        [HttpGet("get")]
        public ActionResult<IEnumerable<BlogDTO>> Get()
        {
            IEnumerable<Blog> b = repository.GetBlogs();
            IEnumerable<BlogDTO> bDTO = _mapper.Map<IEnumerable<BlogDTO>>(b);
            return Ok(bDTO);
        }


        // GET api/<BlogController>/5
        [HttpPost("get/by-id")]
        public ActionResult Get([FromBody] BlogDTO blogD)
        {
            var blog = repository.FindBlogById(blogD.BlogId);
            if (blog == null) return NotFound();
            BlogDTO blogDTO = _mapper.Map<BlogDTO>(blog);
            return Ok(blogDTO);
        }

        // POST api/<BlogController>
        [HttpPost("insert")]
        public ActionResult Post([FromBody] BlogDTO blogDTO)
        {
                Blog blog = _mapper.Map<Blog>(blogDTO);
                repository.CreateBlog(blog);
                return Ok();
        }

        // PUT api/<BlogController>/5
        [HttpPost("update")]
        public ActionResult Put([FromBody] BlogDTO blogDTO)
        {
            var blog = repository.FindBlogById(blogDTO.BlogId);
            if (blog == null) return NotFound();
            Blog b = _mapper.Map<Blog>(blogDTO);
            repository.UpdateBlog(b);
            return Ok();
        }

        // DELETE api/<BlogController>/5
        [HttpPost("delete")]
        public ActionResult Delete([FromBody] BlogDTO blogDTO)
        {
            var blog = repository.FindBlogById(blogDTO.BlogId);
            if (blog == null) return NotFound();
            else
            {
                repository.DeleteBlog(blog);
                return Ok();
            }
        }
    }
}
