import { useEffect, useState } from 'react';
import type { book } from '../types/books';
import { deleteBook, fetchBooks } from '../api/BooksAPI';
import NewBookForm from '../components/NewBookForm';
import EditBookForm from '../components/EditBookForm';
import WelcomeBand from '../components/WelcomeBand';

const AdminBooksPage = () => {
    const [books, setBooks] = useState<book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState<book | null>(null);

    useEffect(() => {
        const loadBooks = async () => {
            const data = await fetchBooks(pageSize, pageNum, '', []);
            setBooks(data.bookList);
            setTotalItems(data.bookCount);
            setTotalPages(Math.ceil(data.bookCount / pageSize));
        }
        loadBooks();
    }, [pageSize, pageNum, totalItems]);

    const handleDelete = async (bookID: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this book?');
        if (!confirmDelete) return;
        try {
            await deleteBook(bookID);
            setBooks(books.filter((b) => b.bookID !== bookID));
        } catch (error) {
            alert('Failed to delete book. Please try again.');
        }
    };

    const reloadBooks = () => {
        fetchBooks(pageSize, pageNum, '', []).then((data) => {
            setBooks(data.bookList);
            setTotalItems(data.bookCount);
            setTotalPages(Math.ceil(data.bookCount / pageSize));
        });
    };

    return (
        <div className="bg-light min-vh-100">
            <WelcomeBand />
            <div className="container pb-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold mb-0">Admin — Books</h2>
                    {!showForm && !editingBook && (
                        <button className="btn btn-dark" onClick={() => setShowForm(true)}>
                            + Add Book
                        </button>
                    )}
                </div>

                {showForm && (
                    <div className="mb-4">
                        <NewBookForm
                            onSuccess={() => { setShowForm(false); reloadBooks(); }}
                            onCancel={() => setShowForm(false)}
                        />
                    </div>
                )}

                {editingBook && (
                    <div className="mb-4">
                        <EditBookForm
                            book={editingBook}
                            onSuccess={() => { setEditingBook(null); reloadBooks(); }}
                            onCancel={() => setEditingBook(null)}
                        />
                    </div>
                )}

                {/* Controls row */}
                <div className="d-flex flex-wrap align-items-center justify-content-between mb-3">
                    <p className="text-muted mb-0">
                        Showing <strong>{books.length}</strong> of <strong>{totalItems}</strong> books
                    </p>
                    <div className="d-flex align-items-center gap-2">
                        <label className="form-label mb-0 fw-semibold text-nowrap">Results per page:</label>
                        <select
                            className="form-select form-select-sm"
                            style={{ width: 'auto' }}
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value));
                                setPageNum(1);
                            }}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="card shadow-sm border-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Publisher</th>
                                    <th>ISBN</th>
                                    <th>Classification</th>
                                    <th>Category</th>
                                    <th>Pages</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.map((b) => (
                                    <tr key={b.bookID}>
                                        <td className="fw-semibold">{b.title}</td>
                                        <td>{b.author}</td>
                                        <td>{b.publisher}</td>
                                        <td><code>{b.isbn}</code></td>
                                        <td>{b.classification}</td>
                                        <td><span className="badge bg-secondary">{b.category}</span></td>
                                        <td>{b.pageCount}</td>
                                        <td className="text-success fw-bold">${b.price}</td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-outline-dark btn-sm"
                                                    onClick={() => setEditingBook(b)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-outline-danger btn-sm"
                                                    onClick={() => handleDelete(b.bookID)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <nav className="mt-4">
                    <ul className="pagination justify-content-center flex-wrap">
                        <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPageNum(pageNum - 1)}>
                                &laquo; Previous
                            </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index + 1} className={`page-item ${pageNum === index + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => setPageNum(index + 1)}>
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        <li className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setPageNum(pageNum + 1)}>
                                Next &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default AdminBooksPage;