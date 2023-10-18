namespace api.Dto
{
    public class FilePackDto
    {
        public int ID { get; set; }
        public required string Subject { get; set; }
        public string Message { get; set; }
        public LotDto SentFrom { get; set; }
        public int FileCount { get; set; }
        public DateTime CreatedAt { get; set; }

    }
}
