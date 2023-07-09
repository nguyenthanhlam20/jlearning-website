using AutoMapper;
using BusinessObjects.DTO;
using BusinessObjects.Models;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Reporitories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/blog-details")]
    [ApiController]
    public class BlogDetailController : ControllerBase
    {
        // Repository
        private IBlogDetailRepository repository = new BlogDetailRepository();

        // Mapper
        private readonly IMapper _mapper;

        // Get mapper singleton
        public BlogDetailController(IMapper mapper)
        {
            _mapper = mapper;
        }
        // POST api/<BlogDetailController>
        [HttpPost("insert")]
        public ActionResult Post([FromBody] BlogDetailDTO blogDetailDTO)
        {
                BlogDetail blogDetail = _mapper.Map<BlogDetail>(blogDetailDTO);
                repository.CreateBlogDetail(blogDetail);
                return Ok();
        }

        // PUT api/<BlogDetailController>/5
        [HttpPost("update")]
        public ActionResult Put([FromBody] BlogDetailDTO blogDetailDTO)
        {
            var blogDetail = repository.FindBlogDetailById(blogDetailDTO.BlogDetailsId);
            if (blogDetail == null) return NotFound();
            BlogDetail b = _mapper.Map<BlogDetail>(blogDetailDTO);
            repository.UpdateBlogDetail(b);
            return Ok();
        }

        // DELETE api/<BlogDetailController>/5
        [HttpPost("delete")]
        public ActionResult Delete([FromBody] BlogDetailDTO blogDetailDTO)
        {
            var blogDetail = repository.FindBlogDetailById(blogDetailDTO.BlogDetailsId);
            if (blogDetail == null) return NotFound();
            else
            {
                repository.DeleteBlogDetail(blogDetail);
                return Ok();
            }
        }
    }
}
