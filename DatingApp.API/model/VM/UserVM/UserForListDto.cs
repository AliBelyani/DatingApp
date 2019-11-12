using System;

namespace DatingApp.API.model.VM.UserVM
{
    public class UserForListDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime RegisterDate { get; set; }
        public DateTime ModifyDate { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; }
    }
}