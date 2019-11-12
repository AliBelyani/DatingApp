using System.Collections.Generic;
using System.IO;
using DatingApp.API.model.Entities.Users;
using Newtonsoft.Json;
using DatingApp.API.Repository.Auth;

namespace DatingApp.API.model
{
    public class SeedData
    {
        private readonly DatingAppContext _context;
        public SeedData(DatingAppContext context)
        {
            this._context = context;
        }

        public void SeedUser()
        {
            var userData = File.ReadAllText("model/SeedFile.json");
            var userList = JsonConvert.DeserializeObject<List<User>>(userData);
            foreach (var user in userList)
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash("password", out passwordHash, out passwordSalt);
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                user.Username = user.Username.ToLower();
            }
            _context.User.AddRange(userList);
            _context.SaveChanges();
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passworSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passworSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}