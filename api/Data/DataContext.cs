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
    }
}
