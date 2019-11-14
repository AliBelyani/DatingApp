using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.model;
using DatingApp.API.model.Entities.Users;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Repository
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DatingAppContext _context;
        public DatingRepository(DatingAppContext context)
        {
            this._context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<User> GetUser(int id)
        {
            return await _context.User.Include(i => i.UserPhoto).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _context.User.Include(i => i.UserPhoto).ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0 ? true : false;
        }

        public async Task<UserPhoto> GetPhoto(int Id)
        {
            return await _context.UserPhoto.FirstOrDefaultAsync(i => i.Id == Id);
        }

        public async Task<UserPhoto> GetMainPhoto(int userId)
        {
            return await _context.UserPhoto.FirstOrDefaultAsync(i => i.UserId == userId && i.IsMain);
        }
    }
}