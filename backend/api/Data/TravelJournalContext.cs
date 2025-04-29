using Microsoft.EntityFrameworkCore;
using api.Models;

namespace api.Data
{
    public class TravelJournalContext : DbContext
    {
        public TravelJournalContext(DbContextOptions<TravelJournalContext> options) : base(options) { }

        public DbSet<TravelEntry> TravelEntries { get; set; }
    }
}
