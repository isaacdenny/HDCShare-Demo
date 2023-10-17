using api.Dto;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class FileController : Controller
	{
		private readonly IFileRepository _fileRepository;
		public FileController(IFileRepository fileRepository)
		{
			_fileRepository = fileRepository;
		}

		[HttpGet("fromtransfer/{id}")]
		[ProducesResponseType(200, Type = typeof(IEnumerable<HFileDto>))]
		public IActionResult GetFiles(int id)
		{
			if (!_fileRepository.PackExists(id))
				return NotFound();

			var files = _fileRepository.GetFilesInPack(id);
			var fileDtos = from f in files
						   select new HFileDto()
						   {
							   ID = f.ID,
							   Name = f.Name,
							   Size = f.Size,
							   Content = f.Content
						   };
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			return Ok(fileDtos);
		}

		[HttpGet("{id}")]
		[ProducesResponseType(200, Type = typeof(HFileDto))]
		public IActionResult GetFile(int id)
		{
			if (!_fileRepository.FileExists(id))
				return NotFound();

			var file = _fileRepository.GetFile(id);
			var fileDto = new HFileDto()
			{
				ID = file.ID,
				Name = file.Name,
				Size = file.Size,
				Content = file.Content
			};

			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			return Ok(fileDto);
		}
	}
}