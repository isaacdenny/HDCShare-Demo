using api.Dto;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Interfaces
{
    public interface IFilePackRepository
    {
        FilePack GetPack(int id);
        ICollection<FilePack> GetReceivedPacksByLotID(int id);
        ICollection<FilePack> GetSentPacksByLotID(int id);
        bool CreatePack(int fromID, ICollection<int> toIDs, string subject, ICollection<HFile> files);
        bool LotExists(int id);
        bool PackExists(int id);
        bool Save();
    }
}
