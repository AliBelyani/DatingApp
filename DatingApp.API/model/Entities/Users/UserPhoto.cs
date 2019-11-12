using System.ComponentModel.DataAnnotations.Schema;
using System;
namespace DatingApp.API.model.Entities.Users
{
    public class UserPhoto
    {
        public int Id { get; set; }
        
        [ForeignKey("User")]
        public int UserId { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime RegisterDate { get; set; }
        public bool IsMain { get; set; }

        public User User { get; set; }
    }
}