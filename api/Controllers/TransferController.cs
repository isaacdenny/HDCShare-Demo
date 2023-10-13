using api.Dto;
using api.Interfaces;
using api.Models;
using api.Repository;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TransferController : Controller
    {
        private ITransferRepository _transferRepository;

        public TransferController(ITransferRepository transferRepository)
        {
            _transferRepository = transferRepository;
        }

        [HttpGet("received/{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Transfer>))]
        public IActionResult GetReceivedTransfers(int id)
        {
            if (!_transferRepository.LotExists(id))
                return NotFound();

            var transfers = _transferRepository.GetReceivedTransfersByLotID(id);
            var transferDtos = from t in transfers
                               select new TransferDto
                               {
                                   ID = t.ID,
                                   Subject = t.Subject,
                                   SentFrom = t.SentFrom,
                                   CreatedAt = t.CreatedAt
                               };
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(transferDtos);
        }

        [HttpGet("sent/{id}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<TransferDto>))]
        public IActionResult GetSentTransfers(int id)
        {
            if (!_transferRepository.LotExists(id))
                return NotFound();

            var transfers = _transferRepository.GetSentTransfersByLotID(id);
            var transferDtos = from t in transfers
                               select new TransferDto
                               {
                                   ID = t.ID,
                                   Subject = t.Subject,
                                   SentFrom = t.SentFrom,
                                   CreatedAt = t.CreatedAt
                               };
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(transferDtos);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult SendTransfer(int sentFromID, int sendToID, string subject, ICollection<HFile> files)
        {
            if (files == null)
                return BadRequest(ModelState);

            if (files.Count <= 0)
            {
                return StatusCode(400, "Invalid Transfer: No files added");
            }

            if (!_transferRepository.CreateTransfer(sentFromID, sendToID, subject, files))
            {
                ModelState.AddModelError("", "Something went wrong while saving");
                return StatusCode(500, ModelState);
            }
            return Ok("Successfully created");
        }
    }
}
