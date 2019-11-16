using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.model;
using DatingApp.API.model.Entities.Users;
using DatingApp.API.model.VM.UserVM;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Repository
{
    public class DatingRepository : IDatingRepository
    {
        #region Ctor
        private readonly DatingAppContext _context;
        public DatingRepository(DatingAppContext context)
        {
            this._context = context;
        }
        #endregion

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

        public async Task<PagedList<User>> GetUsers(UserSearchParameter userParam)
        {
            var userList = _context.User.Include(i => i.UserPhoto).AsQueryable();
            userList = userList.Where(i => i.Id != userParam.UserId && i.Gender == userParam.Gender);
            if (userParam.Like.HasValue)
            {
                var userLikeId = await GetUserLikes(userParam.UserId, userParam.Like.Value);
                userList = userList.Where(i => userLikeId.Contains(i.Id));
            }

            var minDateBirth = DateTime.Now.AddYears(-userParam.MaxAge - 1);
            var maxDateBirth = DateTime.Now.AddYears(-userParam.MinAge);
            userList = userList.Where(p => p.DateOfBirth.Year >= minDateBirth.Year && p.DateOfBirth.Year <= maxDateBirth.Year);

            if (userParam.OrderBy == "created")
                userList = userList.OrderByDescending(i => i.RegisterDate);
            else
                userList = userList.OrderByDescending(i => i.ModifyDate);

            return await PagedList<User>.CreateAsync(userList, userParam.PageNumber, userParam.PageSize);
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

        public async Task<Like> GetLike(int likerId, int likeeId)
        {
            return await _context.Likes.FirstOrDefaultAsync(i => i.LikerId == likerId && i.LikeeId == likeeId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="likers">True:Other Like Me,False:Me Like Other</param>
        /// <returns></returns>
        private async Task<IEnumerable<int>> GetUserLikes(int userId, bool likers)
        {
            var user = await _context.User.Include(i => i.Likers).Include(i => i.Likees).FirstOrDefaultAsync(p => p.Id == userId);

            if (likers)
                return user.Likees.Select(p => p.LikerId);
            else
                return user.Likers.Select(p => p.LikeeId);
        }
    }
}