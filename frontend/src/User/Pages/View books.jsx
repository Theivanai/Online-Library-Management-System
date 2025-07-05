import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BuyBookModal from '../../Components/BuyBookModal';
import './Viewbooks.css';

const ViewBooks = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [selectedBook, setSelectedBook] = useState(null);
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchBooks();
        fetchUser();
    }, []);

    const fetchBooks = () => {
        axios.get(`http://localhost:8000/api/book/all`)
            .then(res => setBooks(res.data))
            .catch(err => toast.error('Failed to fetch books:', err));
    };

    const fetchUser = () => {
        axios.get(`http://localhost:8000/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(res => setUser(res.data)).catch(() => toast.error("Failed to load user"));
    };

    const availableBooks = useMemo(() => books.filter(book => book.status === 'Available'), [books]);

    const categories = useMemo(() => {
        const allCategories = availableBooks.map(book => book.category);
        return ['all', ...new Set(allCategories)];
    }, [availableBooks]);

    const filteredBooks = useMemo(() => {
        return availableBooks.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'all' || book.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [availableBooks, searchTerm, categoryFilter]);

    return (
        <div className="container mt-4">
            <h3 className="text-center fw-bold text-primary">AVAILABLE BOOKS</h3>

            <div className="row mb-4">
                <div className="col-md-6 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by book title..."
                        value={searchTerm} style={{ outline: 'none', boxShadow: 'none' }}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-2">
                    <select
                        className="form-select"
                        style={{ outline: 'none', boxShadow: 'none' }}
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category === 'all' ? 'All Categories' : category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredBooks.length === 0 ? (
                <div className="alert alert-info text-center">No available books match your search/filter.</div>
            ) : (
                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-hover align-middle text-center">
                        <thead className="table-primary">
                            <tr>
                                <th>IMAGE</th>
                                <th>BOOK ID</th>
                                <th>TITLE</th>
                                <th>AUTHOR</th>
                                <th>CATEGORY</th>
                                <th>PRICE</th>
                                {user.role === 'admin' && <th>STOCK</th>}
                                <th>STATUS</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map(book => (
                                <tr key={book._id}>
                                    <td>
                                        {book.image ? (
                                            <img
                                                src={`http://localhost:8000/uploads/images/${book.image}`}
                                                alt={book.title}
                                                className="rounded"
                                                style={{ width: '60px', height: '80px' }}
                                            />
                                        ) : 'No Image'}
                                    </td>
                                    <td>{book.bookId}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td>₹{book.price}</td>
                                    {user.role === 'admin' && <td>{book.stock}</td>}
                                    <td>
                                        {book.stock === 0 ? (
                                            <span className="badge bg-danger">Out of Stock</span>
                                        ) : (
                                            <span className="badge bg-success">Available</span>
                                        )}
                                    </td>
                                    <td>
                                        {book.stock === 0 && user.role !== 'admin' ? (
                                            <button className="btn btn-secondary btn-sm" disabled>Out of Stock</button>
                                        ) : (
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => setSelectedBook(book)}
                                            >
                                                Buy
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedBook && (
                <BuyBookModal
                    book={selectedBook}
                    onClose={() => setSelectedBook(null)}
                    refreshBooks={fetchBooks}
                />
            )}

            <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
        </div>
    );
};

export default ViewBooks;