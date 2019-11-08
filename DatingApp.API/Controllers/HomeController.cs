using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    public class HomeController : ApiControllerBase
    {
        private readonly DatingAppContext _context;
        public HomeController(DatingAppContext context)
        {
            this._context = context;

        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var xValueList = await _context.ValueTable.ToListAsync();
            return Ok(xValueList);
        }

        [HttpGet("{xID}")]
        public async Task<IActionResult> Get(int xID)
        {
            var xValue = await _context.ValueTable.FirstOrDefaultAsync(i => i.xID == xID);
            return Ok(xValue);
        }
    }
}