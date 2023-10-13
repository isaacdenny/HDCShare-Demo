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
                                   SentFrom = t.SentFrom
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
                                   SentFrom = t.SentFrom
                               };
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(transferDtos);
        }
    }
}
