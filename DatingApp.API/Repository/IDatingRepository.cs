using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.model.Entities.Users;

namespace DatingApp.API.Repository
{
    public interface IDatingRepository
    {
        void Add<T>(T Entity) where T : class;
        void Delete<T>(T Entity) where T : class;
        Task<bool> SaveAll();
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
    }
}