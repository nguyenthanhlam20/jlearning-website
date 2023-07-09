using AutoMapper;
using BusinessObjects.DTO;
using BusinessObjects.Models;
using DataAccess;
using Microsoft.AspNetCore.Mvc;
using Reporitories;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/blog-category")]
    [ApiController]
    public class BlogCategoryController : ControllerBase
    {
        // Repository
        private IBlogCategoryRepository repository = new BlogCategoryRepository();

        // Mapper
        private readonly IMapper _mapper;

        // Get mapper singleton
        public BlogCategoryController(IMapper mapper)
        {
            _mapper = mapper;
        }
        // GET: api/<BlogCategoryController>
        [HttpGet("get")]
        public ActionResult<IEnumerable<BlogCategoryDTO>> Get()
        {
            IEnumerable <BlogCategory> bc = repository.GetBlogCategorys();
            IEnumerable<BlogCategoryDTO> bcDTO = _mapper.Map<IEnumerable<BlogCategoryDTO>>(bc);
            return Ok(bcDTO);
        }
    }
}
