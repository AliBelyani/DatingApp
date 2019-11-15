using System;
using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.model.VM.UserVM
{
    public class UserForRegisterVM
    {
        public UserForRegisterVM()
        {
            RegisterDate = DateTime.Now;
            ModifyDate = DateTime.Now;
        }

        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 2, ErrorMessage = "پسورد باید بین {2} و {1} کارکتر باشد!")]
        public string Password { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string KnownAs { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Country { get; set; }
        
        [Required]
        public DateTime DateOfBirth { get; set; }
        public DateTime RegisterDate { get; set; }
        public DateTime ModifyDate { get; set; }
    }

    public class UserForLoginVM
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}