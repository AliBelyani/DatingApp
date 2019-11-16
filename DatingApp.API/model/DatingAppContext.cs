using System.Reflection.Emit;
using DatingApp.API.model.Entities.Users;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.model
{
    public class DatingAppContext : DbContext
    {
        public DatingAppContext(DbContextOptions<DatingAppContext> opt) : base(opt) { }

        public DbSet<User> User { get; set; }
        public DbSet<UserPhoto> UserPhoto { get; set; }
        public DbSet<Like> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Like>().HasKey(i => new { i.LikerId, i.LikeeId });

            builder.Entity<Like>().HasOne(i => i.Liker).WithMany(p => p.Likers)
                   .HasForeignKey(i => i.LikerId).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<Like>().HasOne(i => i.Likee).WithMany(p => p.Likees)
                   .HasForeignKey(i => i.LikeeId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}