namespace api.Dto
{
    public class FilePackDto
    {
        public int ID { get; set; }
        public required string Subject { get; set; }
        public string Message { get; set; }
        public ICollection<int> SentTo { get; set; }
        public int SentFrom { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
