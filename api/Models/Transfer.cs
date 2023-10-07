namespace api.Models
{
    public class Transfer
    {
        public int ID { get; set; }
        public string Subject { get; set; }
        public int SentTo { get; set; }
        public int SentFrom { get; set; }
        public DateTime CreatedAt { get; set; }
        public ICollection<HFile> Files { get; set; }
    }
}
