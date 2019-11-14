using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.model.VM.PhotoVM
{
    public class PhotoForAdd
    {
        public PhotoForAdd()
        {
            RegisterDate = DateTime.Now;
        }

        public string Url { get; set; }
        public IFormFile File { get; set; }
        public string Description { get; set; }
        public DateTime RegisterDate { get; set; }
        public string PublicId { get; set; }
    }
}