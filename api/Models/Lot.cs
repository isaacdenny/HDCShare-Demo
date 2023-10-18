namespace api.Models
{
    public class Lot
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Contact { get; set; }
        public ICollection<FilePack> ReceivedPacks { get; set; }
    }
}
