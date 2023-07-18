using AutoMapper;
using BusinessObjects.DTO;
using BusinessObjects.Models;
using Microsoft.AspNetCore.Mvc;
using Reporitories;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/mail")]
    public class MailController : ControllerBase
    {

        private readonly AccountRepository repository = new AccountRepository();
        private readonly IMapper _mapper;
        public MailController(IMapper mapper)
        {
            _mapper = mapper;
        }

        [HttpPost]
        [Route("forgot-password")]
        public IActionResult ForgotPassoword([FromBody] ForgotPasswordDTO dto)
        {
            Console.WriteLine("Forgot password for  account: " + dto.Email);


            Account account = repository.FindAccountByEmail(dto.Email);

            if (account == null)
            {
                return NotFound();
            }

            string recipientEmail = dto.Email;

            EmailServices.SendHtmlLinkEmail(recipientEmail, dto.Subject, dto.Link);

            return Ok(new { email = recipientEmail, message = "Yêu cầu thay đổi mật khẩu thành công!" });
        }

    }
}
