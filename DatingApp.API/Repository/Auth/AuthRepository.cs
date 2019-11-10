using System.Threading.Tasks;
using DatingApp.API.model;
using DatingApp.API.model.Entities.Users;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Repository.Auth
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DatingAppContext _context;
        public AuthRepository(DatingAppContext context)
        {
            this._context = context;
        }

        public async Task<User> Login(string username, string password)
        {
            var user = await _context.User.FirstOrDefaultAsync(i => i.Username == username);
            if (user == null)
                return null;

            if (!VerifyPasswordHash(user, password))
                return null;

            return user;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passworSalt;
            CreatePasswordHash(password, out passwordHash, out passworSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passworSalt;

            await _context.User.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<bool> UserExists(string username)
        {
            bool isExistUser = await _context.User.AnyAsync(i => i.Username == username);
            if (isExistUser)
                return true;

            return false;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passworSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passworSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(User user, string password)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(user.PasswordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != user.PasswordHash[i])
                        return false;
                }
            }
            return true;
        }
    }
}