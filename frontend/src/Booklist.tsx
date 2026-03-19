import { useEffect, useState } from 'react'
import type { book } from './types/books'

function Booklist() {
    const [books, setBooks] = useState<book[]>([])
    const [pageSize, setPageSize] = useState<number>(5)
    const [pageNum, setPageNum] = useState<number>(1)
    const [totalItems, setTotalItems] = useState<number>(0)
    const [toalPages, setTotalPages] = useState<number>(0)
    const [sortBy, setSortBy] = useState<string>("default")

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(`https://localhost:5000/Bookstore?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}`)
            const data = await response.json()
            setBooks(data.bookList)
            setTotalItems(data.bookCount)
            setTotalPages(Math.ceil(totalItems / pageSize))
        }
        fetchBooks()
    }, [pageSize, pageNum, totalItems, sortBy])

    return (
        <>
            {/* Controls row */}
            <div className="d-flex flex-wrap gap-3 align-items-center justify-content-between mb-4">
                <p className="text-muted mb-0">
                    Showing <strong>{books.length}</strong> of <strong>{totalItems}</strong> books
                </p>
                <div className="d-flex flex-wrap gap-3">
                    <div className="d-flex align-items-center gap-2">
                        <label className="form-label mb-0 text-nowrap fw-semibold">Results per page:</label>
                        <select
                            className="form-select form-select-sm"
                            style={{ width: 'auto' }}
                            value={pageSize}
                            onChange={(p) => {
                                setPageSize(Number(p.target.value))
                                setPageNum(1)
                            }}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <label className="form-label mb-0 text-nowrap fw-semibold">Sort by:</label>
                        <select
                            className="form-select form-select-sm"
                            style={{ width: 'auto' }}
                            value={sortBy}
                            onChange={(s) => {
                                setSortBy(s.target.value)
                                setPageNum(1)
                            }}
                        >
                            <option value="default">Default</option>
                            <option value="titleAsc">Title A–Z</option>
                            <option value="titleDesc">Title Z–A</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Book cards */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 mb-4">
                {books.map((b) => (
                    <div className="col" key={b.bookID}>
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-header bg-dark text-white">
                                <h5 className="card-title mb-0 fw-bold">{b.title}</h5>
                                <small className="text-white-50">{b.author}</small>
                            </div>
                            <div className="card-body">
                                <span className="badge bg-secondary mb-3">{b.classification} — {b.category}</span>
                                <ul className="list-unstyled mb-0 small">
                                    <li className="mb-1"><strong>Publisher:</strong> {b.publisher}</li>
                                    <li className="mb-1"><strong>ISBN:</strong> {b.isbn}</li>
                                    <li className="mb-1"><strong>Pages:</strong> {b.pageCount}</li>
                                </ul>
                            </div>
                            <div className="card-footer d-flex justify-content-between align-items-center bg-white border-top">
                                <span className="fs-5 fw-bold text-success">${b.price}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <nav>
                <ul className="pagination justify-content-center flex-wrap">
                    <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setPageNum(pageNum - 1)}>
                            &laquo; Previous
                        </button>
                    </li>
                    {[...Array(toalPages)].map((_, index) => (
                        <li key={index + 1} className={`page-item ${pageNum === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => setPageNum(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${pageNum === toalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => setPageNum(pageNum + 1)}>
                            Next &raquo;
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Booklist