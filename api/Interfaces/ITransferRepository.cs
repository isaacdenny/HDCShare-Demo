using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Interfaces
{
    public interface ITransferRepository
    {
        Transfer GetTransfer(int id);
        ICollection<Transfer> GetRecievedTransfersByLotID(int id);
        ICollection<Transfer> GetSentTransfersByLotID(int id);
        bool LotExists(int id);
        bool TransferExists(int id);
    }
}
