using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.model.Entities.Users;
using DatingApp.API.model.VM.UserVM;
using DatingApp.API.Repository;
using DatingApp.API.Utilities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
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
        public async Task<IActionResult> GetAll([FromQuery]UserSearchParameter userSearchParameter)
        {
            userSearchParameter.UserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var currentUser = await _DatingRepository.GetUser(userSearchParameter.UserId);
            if (string.IsNullOrWhiteSpace(userSearchParameter.Gender))
                userSearchParameter.Gender = currentUser.Gender == "male" ? "female" : "male";

            var users = await _DatingRepository.GetUsers(userSearchParameter);
            var userDtos = _mapper.Map<IEnumerable<UserForListDto>>(users);
            Response.AddPagination(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(userDtos);
        }

        [HttpGet("{id}", Name = nameof(Get))]
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