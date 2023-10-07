using api.Models;

namespace api.Interfaces
{
    public interface ILotRepository
    {
        ICollection<Lot> GetLots();
        Lot GetLot(int id);
        bool LotExists(int id);
    }
}
