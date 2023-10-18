using api.Models;

namespace api.Dto
{
    public class FilePackIn
    {
        public required string Subject { get; set; }
        public string Message { get; set; }
        public ICollection<LotDto> SentTo { get; set; }
        public LotDto SentFrom { get; set; }
        public ICollection<HFile> Files { get; set; }

    }
}
