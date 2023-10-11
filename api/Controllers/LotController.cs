using api.Dto;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LotController : Controller
    {
        private readonly ILotRepository _lotRepository;

        public LotController(ILotRepository lotRepository)
        {
            _lotRepository = lotRepository;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<LotDto>))]
        public IActionResult GetLots()
        {
            var lots = _lotRepository.GetLots();

            var lotDtos = from l in lots
                          select new LotDto()
                          {
                              ID = l.ID,
                              Name = l.Name,
                              Address = l.Address,
                              City = l.City,
                              Contact = l.Contact
                          };

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(lotDtos);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(LotDto))]
        [ProducesResponseType(400)]
        public IActionResult GetLot(int id)
        {
            if (!_lotRepository.LotExists(id))
                return NotFound();

            var lot = _lotRepository.GetLot(id);

            var lotDto = new LotDto()
            {
                ID = lot.ID,
                Name = lot.Name,
                Address = lot.Address,
                City = lot.City,
                Contact = lot.Contact
            };

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(lotDto);
        }
    }
}
