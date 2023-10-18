using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Lot> Lots { get; set; }
        public DbSet<FilePack> FilePacks { get; set; }
        public DbSet<HFile> Files { get; set; }

        protected override void OnModelCreating(ModelBuilder m)
        {
            m.Entity<FilePack>().HasOne(p => p.SentFrom).WithMany(l => l.SentPacks).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
