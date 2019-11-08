using DatingApp.API.model.Config;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.model
{
    public class DatingAppContext : DbContext
    {
        public DatingAppContext(DbContextOptions<DatingAppContext> opt) : base(opt) { }
        public DbSet<ValueTable> ValueTable { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ValueTableConfig());

            base.OnModelCreating(modelBuilder);
        }
    }
}