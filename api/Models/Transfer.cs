namespace api.Models
{
    public class Transfer
    {
        public int ID { get; set; }
        public required string Subject { get; set; }
        public int SentTo { get; set; }
        public int SentFrom { get; set; }
        public DateTime CreatedAt { get; set; }
        public required ICollection<HFile> Files { get; set; }
    }
}
