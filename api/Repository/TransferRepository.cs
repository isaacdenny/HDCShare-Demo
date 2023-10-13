using api.Data;
using api.Dto;
using api.Interfaces;
using api.Models;

namespace api.Repository
{
    public class TransferRepository : ITransferRepository
    {
        private DataContext _context;
        public TransferRepository(DataContext context)
        {
            _context = context;
        }

        public bool TransferExists(int id)
        {
            return _context.Transfers.Any(t => t.ID == id);
        }

        public bool LotExists(int id)
        {
            return _context.Lots.Any(l => l.ID == id);
        }

        public Transfer GetTransfer(int id)
        {
            return _context.Transfers.Where(t => t.ID == id).First();
        }

        public ICollection<Transfer> GetReceivedTransfersByLotID(int id)
        {
            return _context.Transfers.Where(t => t.SentTo == id).ToList();
        }

        public ICollection<Transfer> GetSentTransfersByLotID(int id)
        {
            return _context.Transfers.Where(t => t.SentFrom == id).ToList();
        }

        public bool CreateTransfer(int fromID, int toID, string subject, ICollection<HFile> files)
        {
            var transfer = new Transfer()
            {
                Subject = subject,
                SentTo = toID,
                SentFrom = fromID,
                Files = files,
                CreatedAt = DateTime.Now
            };
            _context.Add(transfer);
            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
