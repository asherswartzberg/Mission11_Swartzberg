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
        [HttpGet(Name = "GetBookstore")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string sortBy = "default")
        {
            IEnumerable<Book> bookList;

            if (sortBy == "titleAsc")
            {
                bookList = _context.Books
                    .OrderBy(b  => b.Title)
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            }
            else if (sortBy == "titleDesc")
            {
                bookList = _context.Books
                    .OrderByDescending(b => b.Title)
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            }
            else
            {
                bookList = _context.Books
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();
            }

            var bookCount = _context.Books.Count();

            var bookObj = new
            {
                BookList = bookList,
                BookCount = bookCount
            };

            return Ok(bookObj);
        }
    }
}
