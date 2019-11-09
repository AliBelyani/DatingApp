using DatingApp.API.Repository.Auth;

namespace DatingApp.API.Controllers
{
    public class AuthController : ApiControllerBase
    {
        private readonly IAuthRepository _AuthRepository;
        public AuthController(IAuthRepository AuthRepository)
        {
            this._AuthRepository = AuthRepository;
        }

        
    }
}