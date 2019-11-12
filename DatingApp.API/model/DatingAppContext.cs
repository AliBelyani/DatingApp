using DatingApp.API.model.Config;
using DatingApp.API.model.Entities.Users;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.model
{
    public class DatingAppContext : DbContext
    {
        public DatingAppContext(DbContextOptions<DatingAppContext> opt) : base(opt) { }

        
        public DbSet<User> User { get; set; }
        public DbSet<UserPhoto> UserPhoto { get; set; }
    }
}  