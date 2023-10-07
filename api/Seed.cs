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
        public void SeedDataContext()
        {
            if (!dataContext.Transfers.Any())
            {
                var transfers = new List<Transfer>()
                {
                    new Transfer()
                    {
                        Subject = "Watermelon",
                        CreatedAt = new DateTime(1903,1,1),
                        SentFrom = 3,
                        SentTo = 2,
                        Files = new List<HFile>()
                        {
                            new HFile { Name = "Test File 1", Content = "This is some test content" }
                        }

                    },
                    new Transfer()
                    {
                        Subject = "Pikachu",
                        CreatedAt = new DateTime(1903,1,1),
                        SentFrom = 2,
                        SentTo = 3,
                        Files = new List<HFile>()
                        {
                            new HFile { Name = "Test File 1", Content = "This is some test content" }
                        }

                    },
                    new Transfer()
                    {
                        Subject = "Pikachu2",
                        CreatedAt = new DateTime(1903,1,1),
                        SentFrom = 2,
                        SentTo = 3,
                        Files = new List<HFile>()
                        {
                            new HFile { Name = "Test File 2", Content = "This is some test content" },
                            new HFile { Name = "Test File 3", Content = "This is some test content" }
                        }

                    }
                };
                dataContext.Transfers.AddRange(transfers);
                dataContext.SaveChanges();
            }
            if (!dataContext.Lots.Any())
            {
                var lots = new List<Lot>()
                {
                    new Lot()
                    {
                        Name = "Charlotte",
                        Address = "1123 Test Rd",
                        City = "Charlotte",
                        Contact = "test@hdc1922.com",
                    },
                    new Lot()
                    {
                        Name = "Colfax",
                        Address = "1124 Test Rd",
                        City = "Greensboro",
                        Contact = "test@hdc1922.com",
                    },
                };
                dataContext.Lots.AddRange(lots);
                dataContext.SaveChanges();
            }
        }
    }
}