using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class FilePack
    {
        public int ID { get; set; }
        public required string Subject { get; set; }
        public string Message { get; set; }
        public ICollection<Lot> SentTo { get; set; }
        public Lot SentFrom { get; set; }
        // public int FileCount { get; set; }
        public DateTime CreatedAt { get; set; }
        public required ICollection<HFile> Files { get; set; }
    }
}
