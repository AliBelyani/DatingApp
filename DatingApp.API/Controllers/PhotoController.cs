using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using DatingApp.API.model;
using DatingApp.API.model.Entities.Users;
using DatingApp.API.model.VM.PhotoVM;
using DatingApp.API.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DatingApp.API.Controllers
{
    [Authorize]
    public class PhotoController : ApiControllerBase
    {
        #region Ctor
        private readonly IDatingRepository _datingRepository;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySetting> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotoController(IDatingRepository datingRepository, IMapper mapper, IOptions<CloudinarySetting> cloudinaryConfig)
        {
            this._cloudinaryConfig = cloudinaryConfig;
            this._mapper = mapper;
            this._datingRepository = datingRepository;

            Account account = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(account);
        }
        #endregion

        [HttpGet("{Id}", Name = nameof(GetPhoto))]
        public async Task<IActionResult> GetPhoto(int Id)
        {
            var PhotoDb = await _datingRepository.GetPhoto(Id);
            var Photo = _mapper.Map<PhotoForReturnDto>(PhotoDb);
            return Ok(Photo);
        }

        [HttpPost("{userId}")]
        public async Task<IActionResult> AddPhoto(int userId, [FromForm] PhotoForAdd photoForAdd)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userDb = await _datingRepository.GetUser(userId);
            var file = photoForAdd.File;
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParms = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParms);
                }
            }

            photoForAdd.Url = uploadResult.Uri.ToString();
            photoForAdd.PublicId = uploadResult.PublicId;
            var photoDb = _mapper.Map<UserPhoto>(photoForAdd);
            if (!userDb.UserPhoto.Any(i => i.IsMain))
                photoDb.IsMain = true;

            userDb.UserPhoto.Add(photoDb);
            await _datingRepository.SaveAll();

            var photoForReturn = _mapper.Map<PhotoForReturnDto>(photoDb);
            return CreatedAtRoute("GetPhoto", new { Id = photoDb.Id }, photoForReturn);
        }

        [HttpPost("{userId}/{id}/SetMain")]
        public async Task<IActionResult> SetMainPhoto(int userId, int id)
        {
            var photo = await _datingRepository.GetPhoto(id);
            if (photo != null && photo.IsMain)
                return Ok();

            var mainPhoto = await _datingRepository.GetMainPhoto(userId);
            mainPhoto.IsMain = false;
            photo.IsMain = true;

            await _datingRepository.SaveAll();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int id)
        {
            var photo = await _datingRepository.GetPhoto(id);
            if (photo != null && photo.IsMain)
                return BadRequest("Cant Delete Main Photo!");

            if (!string.IsNullOrWhiteSpace(photo.PublicId))
            {
                var deleteParams = new DeletionParams(photo.PublicId);
                var result = _cloudinary.Destroy(deleteParams);
                if (result.Result == "ok")
                    _datingRepository.Delete(photo);
            }
            else
            {
                _datingRepository.Delete(photo);
            }

            await _datingRepository.SaveAll();
            return Ok();
        }
    }
}