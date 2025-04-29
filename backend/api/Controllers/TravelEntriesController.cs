using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelEntriesController : ControllerBase
    {
        private readonly TravelJournalContext _context;

        public TravelEntriesController(TravelJournalContext context)
        {
            _context = context;
        }

        // GET: api/TravelEntries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TravelEntry>>> GetTravelEntries()
        {
            return await _context.TravelEntries.ToListAsync();
        }

        // GET: api/TravelEntries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TravelEntry>> GetTravelEntry(int id)
        {
            var travelEntry = await _context.TravelEntries.FindAsync(id);

            if (travelEntry == null)
            {
                return NotFound();
            }

            return travelEntry;
        }

        // POST: api/TravelEntries
        [HttpPost]
        public async Task<ActionResult<TravelEntry>> PostTravelEntry(TravelEntry travelEntry)
        {
            _context.TravelEntries.Add(travelEntry);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTravelEntry", new { id = travelEntry.ID }, travelEntry);
        }

        // PUT: api/TravelEntries/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTravelEntry(int id, TravelEntry travelEntry)
        {
            if (id != travelEntry.ID)
            {
                return BadRequest();
            }

            _context.Entry(travelEntry).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TravelEntryExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/TravelEntries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTravelEntry(int id)
        {
            var travelEntry = await _context.TravelEntries.FindAsync(id);
            if (travelEntry == null)
            {
                return NotFound();
            }

            _context.TravelEntries.Remove(travelEntry);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TravelEntryExists(int id)
        {
            return _context.TravelEntries.Any(e => e.ID == id);
        }
    }
}
