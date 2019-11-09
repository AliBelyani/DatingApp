using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.model.VM.UserVM
{
    public class UserForRegisterVM
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(10, MinimumLength = 2, ErrorMessage = "پسورد باید بین {2} و {1} کارکتر باشد!")]
        public string Password { get; set; }
    }

    public class UserForLoginVM
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }
    }
}