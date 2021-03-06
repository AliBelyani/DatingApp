using System;

namespace DatingApp.API.model.VM.PhotoVM
{
    public class PhotoForReturnDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime RegisterDate { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }
    }
}