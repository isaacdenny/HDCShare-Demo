using api.Models;

namespace api.Interfaces
{
  public interface IFileRepository
  {
    ICollection<HFile> GetFilesInPack(int id);
    HFile GetFile(int id);
    bool FileExists(int id);
    bool PackExists(int id);
  }
}