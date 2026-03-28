using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mission11.Data;

namespace Mission11.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private BookstoreDbContext _context;
        public BookstoreController(BookstoreDbContext dbContext)
        {
            _context = dbContext;
        }
        [HttpGet("GetBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortBy = "default", [FromQuery] List<string>? categories = null)
        {
            var query = _context.Books.AsQueryable();

            if (categories != null && categories.Any())
            {
                query = query.Where(b => categories.Contains(b.Category));
            }

            if (sortBy == "titleAsc")
            {
                query = query.OrderBy(b => b.Title);
            }
            else if (sortBy == "titleDesc")
            {
                query = query.OrderByDescending(b => b.Title);
            }

            var bookCount = query.Count();

            var bookList = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var bookObj = new
            {
                BookList = bookList,
                BookCount = bookCount
            };

            return Ok(bookObj);
        }
        [HttpGet("GetCategories")]
        public IActionResult GetCategories ()
        {
            var categories = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(categories);
        }
    }
}
