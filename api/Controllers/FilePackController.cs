using api.Dto;
using api.Interfaces;
using api.Models;
using api.Repository;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FilePackController : Controller
    {
        private IFilePackRepository _packRepository;

        public FilePackController(IFilePackRepository packRepository)
        {
            _packRepository = packRepository;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(FilePackDto))]
        public IActionResult GetPack(int id)
        {
            if (!_packRepository.PackExists(id))
                return NotFound();

            var pack = _packRepository.GetPack(id);
            var packDto = new FilePackDto()
            {
                ID = pack.ID,
                Subject = pack.Subject,
                Message = pack.Message,
                SentFrom = pack.SentFrom,
                CreatedAt = pack.CreatedAt,
            };

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(packDto);
        }

        [HttpGet("received")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<FilePack>))]
        public IActionResult GetReceivedPacks([FromQuery] int id)
        {
            if (!_packRepository.LotExists(id))
                return NotFound();

            var packs = _packRepository.GetReceivedPacksByLotID(id);
            var packDtos = from p in packs
                           select new FilePackDto
                           {
                               ID = p.ID,
                               Subject = p.Subject,
                               Message = p.Message,
                               SentFrom = p.SentFrom,
                               CreatedAt = p.CreatedAt
                           };
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(packDtos);
        }

        [HttpGet("sent")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<FilePackDto>))]
        public IActionResult GetSentPacks([FromQuery] int id)
        {
            if (!_packRepository.LotExists(id))
                return NotFound();

            var packs = _packRepository.GetSentPacksByLotID(id);
            var packDtos = from p in packs
                           select new FilePackDto
                           {
                               ID = p.ID,
                               Subject = p.Subject,
                               Message = p.Message,
                               SentFrom = p.SentFrom,
                               CreatedAt = p.CreatedAt
                           };
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(packDtos);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult SendPack(FilePackIn filePack)
        {
            if (!_packRepository.LotExists(filePack.SentFrom))
                return BadRequest("Invalid ID");

            if (filePack.Files == null)
                return BadRequest(ModelState);

            if (filePack.Files.Count <= 0)
            {
                return StatusCode(400, "Invalid Transfer: No files added");
            }

            if (!_packRepository.CreatePack(filePack.SentFrom, filePack.SentTo, filePack.Subject, filePack.Message, filePack.Files))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok("Successfully created");
        }
    }
}
