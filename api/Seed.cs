using api.Data;
using api.Models;
using System.Diagnostics.Metrics;

namespace api
{
    public class Seed
    {
        private readonly DataContext dataContext;
        public Seed(DataContext context)
        {
            this.dataContext = context;
        }

        Lot charlotte = new Lot()
        {
            Name = "Charlotte",
            Address = "1123 Test Rd",
            City = "Charlotte",
            Contact = "test@hdc1922.com",
        };
        Lot smith = new Lot()
        {
            Name = "Smithfield",
            Address = "1123 Test Rd",
            City = "Charlotte",
            Contact = "test@hdc1922.com",
        };
        Lot colf = new Lot()
        {
            Name = "Colfax",
            Address = "1124 Test Rd",
            City = "Greensboro",
            Contact = "test@hdc1922.com",
        };

        public void SeedDataContext()
        {
            if (!dataContext.FilePacks.Any())
            {
                var transfers = new List<FilePack>()
                {
                    new FilePack()
                    {
                        Subject = "New Hiring Package",
                        Message = "Sorry for the delay...",
                        CreatedAt = new DateTime(1903,1,1),
                        SentFrom = 3,
                        SentTo = new List<Lot>() {colf, smith},
                        Files = new List<HFile>()
                        {
                            new HFile { Name = "SWE.pdf", Content = "This is some test content" }
                        }

                    },
                    new FilePack()
                    {
                        Subject = "7 Day Check ins",
                        Message = "Get these submitted quickly please!",
                        CreatedAt = new DateTime(1903,1,1),
                        SentFrom = 3,
                        SentTo = new List<Lot>() {colf},
                        Files = new List<HFile>()
                        {
                            new HFile { Name = "File.png", Content = "This is some test content" }
                        }

                    },
                    new FilePack()
                    {
                        Subject = "7 Day Check In",
                        Message = "Get these submitted quickly please!",
                        CreatedAt = new DateTime(1903,1,1),
                        SentFrom = 2,
                        SentTo = new List<Lot>() {colf, smith},
                        Files = new List<HFile>()
                        {
                            new HFile { Name = "Test file.pdf", Content = "This is some test content" },
                            new HFile { Name = "Test file.docx", Content = "This is some test content" }
                        }

                    },
                    new FilePack()
                    {
                        Subject = "Friday Event Info",
                        Message = "Let me know when you get this...",
                        CreatedAt = new DateTime(1903,1,1),
                        SentFrom = 1,
                        SentTo = new List<Lot>() {charlotte},
                        Files = new List<HFile>()
                        {
                            new HFile { Name = "Test File 2.docx", Content = "This is some test content" },
                            new HFile { Name = "Test File 3.png", Content = "This is some test content" },
                            new HFile { Name = "Test File 2.docx", Content = "This is some test content" },
                            new HFile { Name = "Test File 3.pdf", Content = "This is some test content" }
                        }

                    }
                };
                dataContext.FilePacks.AddRange(transfers);
                dataContext.SaveChanges();
            }
            if (!dataContext.Lots.Any())
            {
                var lots = new List<Lot>()
                {
                    colf, smith, charlotte
                };
                dataContext.Lots.AddRange(lots);
                dataContext.SaveChanges();
            }
        }
    }
}