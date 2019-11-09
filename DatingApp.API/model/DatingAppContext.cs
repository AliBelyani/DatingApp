using DatingApp.API.model.Config;
using DatingApp.API.model.Entities.Users;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.model
{
    public class DatingAppContext : DbContext
    {
        public DatingAppContext(DbContextOptions<DatingAppContext> opt) : base(opt) { }

        public DbSet<ValueTable> ValueTable { get; set; }
        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ValueTableConfig());

            base.OnModelCreating(modelBuilder);
        }
    }
}