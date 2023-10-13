using api.Dto;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Interfaces
{
    public interface ITransferRepository
    {
        Transfer GetTransfer(int id);
        ICollection<Transfer> GetReceivedTransfersByLotID(int id);
        ICollection<Transfer> GetSentTransfersByLotID(int id);
        bool CreateTransfer(int fromID, int toID, string subject, ICollection<HFile> files);
        bool LotExists(int id);
        bool TransferExists(int id);
        bool Save();
    }
}
