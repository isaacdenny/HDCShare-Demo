using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repository
{
    public class LotRepository : ILotRepository
    {
        private readonly DataContext _context;
        public LotRepository(DataContext context) 
        {
            _context = context;
        }

        public Lot GetLot(int id)
        {
            return _context.Lots.Where(l => l.ID == id).FirstOrDefault();
        }

        public ICollection<Lot> GetLots() 
        {
            return _context.Lots.OrderBy(l => l.ID).ToList();
        }

        public bool LotExists(int id)
        {
            return _context.Lots.Any(l => l.ID == id);
        }
    }
}
