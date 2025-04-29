using Microsoft.EntityFrameworkCore;
using api.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure SQLite database
builder.Services.AddDbContext<TravelJournalContext>(options =>
    options.UseSqlite("Data Source=traveljournal.db"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
