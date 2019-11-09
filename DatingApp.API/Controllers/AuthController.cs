using System;
using System.Text;
using System.Security.Claims;
using System.Threading.Tasks;
using DatingApp.API.model.Entities.Users;
using DatingApp.API.model.VM.UserVM;
using DatingApp.API.Repository.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace DatingApp.API.Controllers
{
    public class AuthController : ApiControllerBase
    {
        private readonly IAuthRepository _AuthRepository;
        private readonly IConfiguration _configuration;

        public AuthController(IAuthRepository AuthRepository, IConfiguration configuration)
        {
            this._AuthRepository = AuthRepository;
            this._configuration = configuration;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody]UserForRegisterVM userForRegisterVM)
        {
            userForRegisterVM.Username = userForRegisterVM.Username.ToLower();
            if (await _AuthRepository.UserExists(userForRegisterVM.Username))
                return BadRequest("نام کاربری تکراری می باشد!");

            var userCreated = new User() { Username = userForRegisterVM.Username };
            var createdUser = await _AuthRepository.Register(userCreated, userForRegisterVM.Password);
            return StatusCode(201, createdUser);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForLoginVM userForLogin)
        {
            var user = await _AuthRepository.Login(userForLogin.Username.ToLower(), userForLogin.Password);
            if (user == null)
                return BadRequest("نام کاربری با پسورد اشتباه است!");

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.Name,user.Username),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));
            var credential = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credential
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                token = tokenHandler.WriteToken(token)
            });
        }

    }
}