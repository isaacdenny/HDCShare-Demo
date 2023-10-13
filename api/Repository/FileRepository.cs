using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
	public class FileRepository : IFileRepository
	{
		private DataContext _context;

		public FileRepository(DataContext context)
		{
			_context = context;
		}
		public bool FileExists(int id)
		{
			return _context.Files.Any(f => f.ID == id);
		}

		public HFile GetFile(int id)
		{
			return _context.Files.Where(f => f.ID == id).First();
		}

		public ICollection<HFile> GetFilesInTransfer(int id)
		{
			return _context.Files.FromSql($"SELECT * FROM Files WHERE transferID = {id}").ToList();
		}

		public bool TransferExists(int id)
		{
			return _context.Transfers.Any(t => t.ID == id);
		}
	}
}