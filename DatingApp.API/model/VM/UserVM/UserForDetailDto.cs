using System;
using System.Collections.Generic;
using DatingApp.API.model.VM.UserVM;

namespace DatingApp.API.model.Entities.Users
{
    public class UserForDetailDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime RegisterDate { get; set; }
        public DateTime ModifyDate { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interest { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; }

        public ICollection<UserPhotoDto> UserPhoto { get; set; }
    }
}