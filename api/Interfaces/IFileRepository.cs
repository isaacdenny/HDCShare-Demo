using api.Models;

namespace api.Interfaces
{
  public interface IFileRepository
  {
    ICollection<HFile> GetFilesInTransfer(int id);
    HFile GetFile(int id);
    bool FileExists(int id);
    bool TransferExists(int id);
  }
}