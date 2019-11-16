using System.Threading.Tasks;
using DatingApp.API.model;
using DatingApp.API.model.Entities.Users;
using DatingApp.API.model.VM.UserVM;

namespace DatingApp.API.Repository
{
    public interface IDatingRepository
    {
        void Add<T>(T Entity) where T : class;
        void Delete<T>(T Entity) where T : class;
        Task<bool> SaveAll();
        Task<PagedList<User>> GetUsers(UserSearchParameter userSearchParameter);
        Task<User> GetUser(int id);
        Task<UserPhoto> GetPhoto(int Id);
        Task<UserPhoto> GetMainPhoto(int userId);

        Task<Like> GetLike(int likerId, int likeeId);
    }
}