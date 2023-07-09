using AutoMapper;
using BusinessObjects.DTO;
using BusinessObjects.Models;
using DataAccess;
using Microsoft.AspNetCore.Mvc;
using Reporitories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/support")]
    [ApiController]
    public class SupportController : ControllerBase
    {
        // Repository
        private ISupportRepository repository = new SupportRepository();

        // Mapper
        private readonly IMapper _mapper;

        // Get mapper singleton
        public SupportController(IMapper mapper)
        {
            _mapper = mapper;
        }

        // GET: api/<SupportController>
        [HttpGet("get")]
        public ActionResult<IEnumerable<SupportDTO>> Get()
        {
            IEnumerable<Support> support = repository.GetSupports();
            IEnumerable<SupportDTO> suppportDTO = _mapper.Map<IEnumerable<SupportDTO>>(support);
            return Ok(suppportDTO);
        }

        // POST api/<SupportController>
        [HttpPost("insert")]
        public ActionResult Post([FromBody] SupportDTO supportDTO)
        {
                Support support = _mapper.Map<Support>(supportDTO);
                repository.CreateSupport(support);
                return Ok();
        }

        // PUT api/<SupportController>/5
        [HttpPost("update")]
        public ActionResult Put([FromBody] SupportDTO supportDTO)
        {
            var support = repository.FindSupportById((int)supportDTO.SupportId);
            if (support == null) return NotFound();
            Support sup = _mapper.Map<Support>(supportDTO);
            repository.UpdateSupport(sup);
            return Ok();
        }

        // DELETE api/<SupportController>/5
        [HttpPost("delete")]
        public ActionResult Delete([FromBody] SupportDTO supportD)
        {
            var support = repository.FindSupportById(supportD.SupportId);
            if (support == null) return NotFound();
            else
            {
                repository.DeleteSupport(support);
                return Ok();
            }
        }
    }
}
