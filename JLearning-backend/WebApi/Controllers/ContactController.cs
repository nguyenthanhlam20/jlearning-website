using AutoMapper;
using BusinessObjects.DTO;
using BusinessObjects.Models;
using Microsoft.AspNetCore.Mvc;
using Reporitories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi.Controllers
{
    [Route("api/contact")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        // Repository
        private IContactRepository repository = new ContactRepository();

        // Mapper
        private readonly IMapper _mapper;

        // Get mapper singleton
        public ContactController(IMapper mapper)
        {
            _mapper = mapper;
        }

        // GET: api/<ContactController>
        [HttpGet("get")]
        public ActionResult<IEnumerable<ContactDTO>> Get()
        {
            IEnumerable<Contact> c = repository.GetContacts();
            IEnumerable<ContactDTO> contactDTO = _mapper.Map<IEnumerable<ContactDTO>>(c);
            return Ok(contactDTO);
        }

        // POST api/<ContactController>
        [HttpPost("insert")]
        public ActionResult Post([FromBody] ContactDTO contactDTO)
        {
                Contact contact = _mapper.Map<Contact>(contactDTO);
                repository.CreateContact(contact);
                return Ok();
        }


        // PUT api/<ContactController>/5
        [HttpPost("update")]
        public ActionResult Put([FromBody] ContactDTO contactDTO)
        {
            Console.WriteLine("Response contact from email: " + contactDTO.Email);
            var contact = repository.FindContactById((int)contactDTO.ContactId);
            if (contact == null) return NotFound();
            Contact c = _mapper.Map<Contact>(contactDTO);
            repository.UpdateContact(c);

            EmailServices.SendEmail(contactDTO.Email, contactDTO.Subject, contactDTO.ResponseMessage);

            return Ok();
        }

    }
}
