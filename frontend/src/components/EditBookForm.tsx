import { useState } from 'react';
import type { book } from '../types/books';
import { updateBook } from '../api/BooksAPI';

interface EditBookFormProps {
    book: book;
    onSuccess: () => void;
    onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
    const [formData, setFormData] = useState<book>({ ...book });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateBook(formData.bookID, formData);
        onSuccess();
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-header bg-dark text-white">
                <h5 className="mb-0 fw-bold">Edit Book</h5>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Book Title</label>
                            <input className="form-control" type="text" name="title" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Author</label>
                            <input className="form-control" type="text" name="author" value={formData.author} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Publisher</label>
                            <input className="form-control" type="text" name="publisher" value={formData.publisher} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">ISBN</label>
                            <input className="form-control" type="text" name="isbn" value={formData.isbn} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Classification</label>
                            <input className="form-control" type="text" name="classification" value={formData.classification} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Category</label>
                            <input className="form-control" type="text" name="category" value={formData.category} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Page Count</label>
                            <input className="form-control" type="number" name="pageCount" value={formData.pageCount} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-semibold">Price</label>
                            <input className="form-control" type="number" name="price" value={formData.price} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="d-flex gap-2 mt-4">
                        <button type="submit" className="btn btn-dark">Update Book</button>
                        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBookForm;