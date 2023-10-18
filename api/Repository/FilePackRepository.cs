using api.Data;
using api.Dto;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class FilePackRepository : IFilePackRepository
    {
        private DataContext _context;
        public FilePackRepository(DataContext context)
        {
            _context = context;
        }

        public bool PackExists(int id)
        {
            return _context.FilePacks.Any(t => t.ID == id);
        }

        public bool LotExists(int id)
        {
            return _context.Lots.Any(l => l.ID == id);
        }

        public FilePack GetPack(int id)
        {
            return _context.FilePacks.Where(t => t.ID == id).First();
        }

        public ICollection<FilePack> GetReceivedPacksByLotID(int id)
        {
            return _context.FilePacks.Where(x => x.SentTo.Any(l => l.ID == id)).ToList();
        }

        public ICollection<FilePack> GetSentPacksByLotID(int id)
        {
            return _context.FilePacks.Where(t => t.SentFrom == id).ToList();
        }

        public bool CreatePack(int fromID, ICollection<Lot> toLots, string subject, string message, ICollection<HFile> files)
        {
            var p = new FilePack()
            {
                Subject = subject,
                Message = message,
                SentTo = toLots,
                SentFrom = fromID,
                Files = files,
                CreatedAt = DateTime.Now
            };
            _context.Add(p);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
