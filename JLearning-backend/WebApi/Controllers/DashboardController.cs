using Microsoft.AspNetCore.Mvc;
using Reporitories;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/dashboard")]
    public class DashboardController : ControllerBase
    {


        private readonly IDashboardRepository repository = new DashboardRepository();

        [HttpGet]
        [Route("get")]
        public IActionResult Get()
        {
            return Ok(repository.GetData());    
        }

    }
}
