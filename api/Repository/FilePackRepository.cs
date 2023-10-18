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
            return _context.FilePacks.Include(fp => fp.SentFrom).Where(t => t.ID == id).First();
        }

        public ICollection<FilePack> GetReceivedPacksByLotID(int id)
        {
            return _context.FilePacks.Include(fp => fp.SentFrom).Where(x => x.SentTo.Any(l => l.ID == id)).ToList();
            // return _context.Lots.Include(l => l.ReceivedPacks).Where(l => l.ID == id).First().ReceivedPacks;
        }

        public ICollection<FilePack> GetSentPacksByLotID(int id)
        {
            return _context.FilePacks.Include(fp => fp.SentFrom).Where(t => t.SentFrom.ID == id).ToList();
            // return _context.Lots.Include(l => l.SentPacks).Where(l => l.ID == id).First().SentPacks; 
        }

        public bool CreatePack(int fromID, ICollection<LotDto> toLots, string subject, string message, ICollection<HFile> files)
        {
            var lots = new List<Lot>();
            foreach (var lot in toLots)
            {
                lots.Add(_context.Lots.Where(l => l.ID == lot.ID).First());
            }

            var fromLot = _context.Lots.Where(l => l.ID == fromID).First();

            var p = new FilePack()
            {
                Subject = subject,
                Message = message,
                SentTo = lots,
                SentFrom = fromLot,
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
