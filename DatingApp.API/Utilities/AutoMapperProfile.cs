using System.Linq;
using AutoMapper;
using DatingApp.API.model.Entities.Users;
using DatingApp.API.model.VM.PhotoVM;
using DatingApp.API.model.VM.UserVM;

namespace DatingApp.API.Utilities
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserForListDto>()
                    .ForMember(des => des.PhotoUrl, opt =>
                    {
                        opt.MapFrom(src => src.UserPhoto.FirstOrDefault(i => i.IsMain).Url);
                    })
                    .ForMember(des => des.Age, opt =>
                    {
                        opt.ResolveUsing(i => i.DateOfBirth.CalculateAge());
                    });
            CreateMap<User, UserForDetailDto>()
                    .ForMember(des => des.PhotoUrl, opt =>
                    {
                        opt.MapFrom(src => src.UserPhoto.FirstOrDefault(i => i.IsMain).Url);
                    })
                    .ForMember(des => des.Age, opt =>
                    {
                        opt.ResolveUsing(i => i.DateOfBirth.CalculateAge());
                    });
            CreateMap<UserPhoto, UserPhotoDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<UserPhoto, PhotoForReturnDto>();
            CreateMap<PhotoForAdd, UserPhoto>();
        }
    }
}