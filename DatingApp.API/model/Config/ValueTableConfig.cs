using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DatingApp.API.model.Config
{
    public class ValueTableConfig : IEntityTypeConfiguration<ValueTable>
    {
        public void Configure(EntityTypeBuilder<ValueTable> builder)
        {
            builder.HasKey(i => i.xID);
            builder.Property(i => i.xTitle).HasMaxLength(50).IsRequired();

            builder.ToTable("ValuesTB", "Test");
        }
    }
}