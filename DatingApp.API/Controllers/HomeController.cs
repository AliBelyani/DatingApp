using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [Authorize]
    public class HomeController : ApiControllerBase
    {
        private readonly DatingAppContext _context;
        public HomeController(DatingAppContext context)
        {
            this._context = context;

        }
    }
}