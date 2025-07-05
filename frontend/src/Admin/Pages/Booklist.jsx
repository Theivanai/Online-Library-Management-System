import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import "./Booklist.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

function BookList() {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [modalInstance, setModalInstance] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        title: "",
        author: "",
        isbn: "",
        category: "",
        price: '',
        // stock: '',
        // issuedTo: "",
        image: null,
        bookFile: null,
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/book/all`);
            setBooks(res.data);
        } catch (error) {
            toast.error("Failed to load books");
        }
    };

    const openEditModal = (book) => {
        setSelectedBook(book);
        setForm({
            title: book.title || "",
            author: book.author || "",
            isbn: book.isbn || "",
            category: book.category || "",
            price: book.price || "",
            // stock: book.stock || "",
            // issuedTo: book.issuedTo
            //     ? (typeof book.issuedTo === "object" ? book.issuedTo._id : book.issuedTo)
            //     : "",
            // image: null,
            bookFile: null,
        });

        const modalEl = document.getElementById("editModal");
        const modal = new Modal(modalEl);
        setModalInstance(modal);
        modal.show();
    };

    const closeModal = () => {
        if (modalInstance) modalInstance.hide();
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image" || name === "bookFile") {
            setForm((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedBook) {
            toast.error("No book selected.");
            return;
        }

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("author", form.author);
            formData.append("isbn", form.isbn);
            formData.append("category", form.category);
            formData.append("price", form.price);
            // formData.append("stock", form.stock);
            // formData.append("issuedTo", form.issuedTo);

            if (form.image) formData.append("image", form.image);
            if (form.bookFile) formData.append("bookFile", form.bookFile);

            await axios.put(
                `http://localhost:8000/api/book/update/${selectedBook._id}`,
                formData,
                {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            toast.success("Book updated successfully!");
            fetchBooks();
            closeModal();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update book");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this book!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8000/api/book/delete/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        },
                    });
                    setBooks((prev) => prev.filter((book) => book._id !== id));
                    // Swal.fire("Deleted!", "Your book has been deleted", "success");
                } catch (err) {
                    toast.error("Error deleting book.");
                }
            }
        });
    };

    const handleView = (book) => {
        setSelectedBook(book);
        const viewModalEl = document.getElementById('viewModal');
        const modal = new Modal(viewModalEl);
        setModalInstance(modal);
        modal.show();
    };

    return (
        <div className="container">
            <h3 className="text-center mb-4 text-primary fw-bold">BOOK INVENTORY</h3>
            <div className="table-responsive shadow-sm border-0">
                <table className="table table-striped table-hover text-center align-middle">
                    <thead className="table-primary">
                        <tr>
                            <th>BOOK ID</th>
                            <th>IMAGE</th>
                            <th>TITLE</th>
                            <th>AUTHOR</th>
                            <th>CATEGORY</th>
                            <th>PRICE</th>
                            {/* <th>STOCK</th> */}
                            {/* <th>PDF</th> */}
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length === 0 ? (
                            <tr>
                                <td colSpan="8">No books found.</td>
                            </tr>
                        ) : (
                            books.map((book) => (
                                <tr key={book._id}>
                                    <td>{book.bookId}</td>
                                    <td>
                                        {book.image ? (
                                            <img
                                                src={`http://localhost:8000/uploads/images/${book.image}`}
                                                alt={book.title}
                                                style={{ width: "60px", height: "80px" }}
                                            />
                                        ) : "No Image"}
                                    </td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td>{book.price}</td>
                                    {/* <td>{book.stock}</td> */}
                                    {/* <td>
                                    {book.bookFile ? (
                                        <a
                                            href={`http://localhost:8000/uploads/pdfs/${book.bookFile}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-sm btn-outline-secondary"
                                        >
                                            View PDF
                                        </a>
                                    ) : (
                                        <span className="text-muted">No PDF</span>
                                    )}
                                </td> */}
                                    <td>
                                        <button className="btn btn-info btn-sm me-2 text-white" onClick={() => handleView(book)}>View Details</button>
                                        <button className="btn btn-primary btn-sm me-2" onClick={() => openEditModal(book)}>Update</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>


            {/* Update Modal */}
            <div className="modal fade" id="editModal" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content" style={{ marginLeft: '155px'}}>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title text-primary">UPDATE BOOK</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input type="text" name="title" value={form.title} onChange={handleChange} className="form-control"
                                        style={{ outline: 'none', boxShadow: 'none' }} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Author</label>
                                    <input type="text" name="author" value={form.author} onChange={handleChange} className="form-control"
                                        style={{ outline: 'none', boxShadow: 'none' }} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">ISBN</label>
                                    <input type="text" name="isbn" value={form.isbn} onChange={handleChange} className="form-control"
                                        style={{ outline: 'none', boxShadow: 'none' }} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <input type="text" name="category" value={form.category} onChange={handleChange} className="form-control"
                                        style={{ outline: 'none', boxShadow: 'none' }} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input type="number" name="price" value={form.price} onChange={handleChange} className="form-control"
                                        style={{ outline: 'none', boxShadow: 'none' }} required />
                                </div>
                                {/* <div className="mb-3">
                                    <label className="form-label">Issued To (User ID)</label>
                                    <input type="text" name="issuedTo" value={form.issuedTo} onChange={handleChange} className="form-control"
                                        style={{ outline: 'none', boxShadow: 'none' }} />
                                </div> */}
                                {/* <div className="mb-3">
                                    <label className="form-label">Stock</label>
                                    <input type="number" name="stock" value={form.stock} onChange={handleChange} className="form-control"
                                        style={{ outline: 'none', boxShadow: 'none' }} required />
                                </div> */}
                                <div className="mb-3">
                                    <label className="form-label">Current Image</label><br />
                                    {selectedBook?.image ? (
                                        <img src={`http://localhost:8000/uploads/images/${selectedBook.image}`} alt="Current" width="100"
                                            style={{ outline: 'none', boxShadow: 'none' }} />
                                    ) : "No image"}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Upload New Image</label>
                                    <input type="file" name="image" accept="image/*" onChange={handleChange} className="form-control"
                                        style={{ outline: 'none', boxShadow: 'none' }} />
                                </div>
                                {/* <div className="mb-3">
                                    <label className="form-label">Upload New PDF Book</label>
                                    <input type="file" name="bookFile" accept="application/pdf" onChange={handleChange} className="form-control"
                                        style={{ outline: 'none', boxShadow: 'none' }} />
                                </div> */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-warning text-white me-1 w-25" onClick={closeModal}>Close</button>
                                <button type="submit" className="btn btn-success" disabled={isLoading}>
                                    {isLoading ? "Updating..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


            {/* View Details Modal */}
            <div className="modal fade" id="viewModal" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content" style={{ marginLeft: '155px' }}>
                        <div className="modal-header">
                            <h5 className="modal-title text-primary">BOOK DETAILS</h5>
                            <button type="button" className="btn-close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            {selectedBook ? (
                                <div>
                                    <p><strong>Title:</strong> {selectedBook.title}</p>
                                    <p><strong>Author:</strong> {selectedBook.author}</p>
                                    <p><strong>ISBN:</strong> {selectedBook.isbn}</p>
                                    <p><strong>Category:</strong> {selectedBook.category}</p>
                                    <p><strong>Price:</strong> {selectedBook.price}</p>
                                    {/* <p><strong>Stock:</strong> {selectedBook.stock}</p> */}
                                    {/* {selectedBook.issuedTo && (
                                        typeof selectedBook.issuedTo === 'object' ?
                                            <p><strong>Issued To:</strong> {selectedBook.issuedTo.name}</p>
                                            : <p><strong>Issued To:</strong> {selectedBook.issuedTo}</p>
                                    )} */}
                                    {selectedBook.image && (
                                        <p><strong>Image</strong><br />
                                            <img src={`http://localhost:8000/uploads/images/${selectedBook.image}`} alt="Book" width="100" />
                                        </p>
                                    )}
                                    {/* {selectedBook.bookFile && (
                                        <p><strong>PDF:</strong> <a href={`http://localhost:8000/uploads/pdfs/${selectedBook.bookFile}`} target="_blank" rel="noopener noreferrer">View Book</a></p>
                                    )} */}
                                </div>
                            ) : <p>No book selected</p>}
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-warning text-white me-2 w-25" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={1200} closeButton={false} />
        </div>
    );
}

export default BookList;



