namespace api.Models
{
    public class FilePack
    {
        public int ID { get; set; }
        public required string Subject { get; set; }
        public string Message { get; set; }
        public ICollection<Lot> SentTo { get; set; }
        public int SentFrom { get; set; }
        public DateTime CreatedAt { get; set; }
        public required ICollection<HFile> Files { get; set; }
    }
}
