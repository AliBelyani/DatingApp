using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.model.Entities.Users;
using DatingApp.API.model.VM.UserVM;
using DatingApp.API.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    public class UserController : ApiControllerBase
    {
        private readonly IDatingRepository _DatingRepository;
        private readonly IMapper _mapper;
        public UserController(IDatingRepository DatingRepository, IMapper mapper)
        {
            this._mapper = mapper;
            this._DatingRepository = DatingRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _DatingRepository.GetUsers();
            var userDtos = _mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _DatingRepository.GetUser(id);
            if (user != null)
            {
                var userDto = _mapper.Map<UserForDetailDto>(user);
                return Ok(userDto);
            }

            return BadRequest($"User With Id {id} Not Exist!!");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _DatingRepository.GetUser(id);
            _mapper.Map(userForUpdateDto, user);

            await _DatingRepository.SaveAll();
            return NoContent();
        }

    }
}