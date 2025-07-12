// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Mybooks.css';
// import { Container, Table, Badge } from 'react-bootstrap';

// const MyBooks = () => {
//     const [books, setBooks] = useState([]);
//     const [selectedPDF, setSelectedPDF] = useState(null);
//     const [showmodal, setshowmodal] = useState(false);

//     useEffect(() => {
//         const fetchPurchasedBooks = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const res = await axios.get('http://localhost:8000/api/mybooks/my-books', {
//                     headers: {
//                         Authorization: `Bearer ${token}`
//                     }
//                 });

//                 const today = new Date();
//                 const todayMidnight = new Date(today.setHours(0, 0, 0, 0));

//                 const bookswithremaining = res.data.map(book => {
//                     const endDateMidnight = new Date(new Date(book.endDate).setHours(0, 0, 0, 0));
//                     const remainingTime = Math.ceil((endDateMidnight - todayMidnight) / (1000 * 60 * 60 * 24));
//                     return { ...book, remainingDays: remainingTime };
//                 });

//                 setBooks(bookswithremaining);
//             } catch (err) {
//                 console.error('Error fetching books:', err);
//             }
//         };

//         fetchPurchasedBooks();
//     }, []);

//     const handleView = (pdfPath) => {
//         const token = localStorage.getItem("token");
//         setSelectedPDF(`http://localhost:8000/uploads/pdfs/${pdfPath}?token=${localStorage.getItem("token")}#toolbar=0&navpanes=0&scrollbar=0`);
//         setshowmodal(true);
//     };

//     const handleClose = () => {
//         setshowmodal(false);
//         setSelectedPDF(null);
//     };

//     return (
//         <Container className="my-4">
//             <h3 className='text-center fw-bold text-primary'>PURCHASED BOOKS</h3>


//             {books.length === 0 ? (
//                 <div className='alert alert-info text-center'>No active books available</div>
//             ) : (
//                 <div className='table-responsive shadow-sm rounded'>
//                     <Table striped bordered hover className='align-middle text-center'>
//                         <thead className='table-primary'>
//                             <tr>
//                                 <th>IMAGE</th>
//                                 <th>TITLE</th>
//                                 <th>DURATION</th>
//                                 <th>START DATE</th>
//                                 <th>END DATE</th>
//                                 <th>REMAINING DAYS</th>
//                                 <th>PDF</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {books.map((book) => (
//                                 <tr key={book._id}>
//                                     <td>
//                                         {book.bookimg ? (
//                                             <img
//                                                 src={`http://localhost:8000/uploads/images/${book.bookimg}`}
//                                                 alt={book.bookTitle}
//                                                 style={{ width: '60px', height: '80px' }}
//                                                 className='rounded'
//                                             />
//                                         ) : 'No Image'}
//                                     </td>
//                                     <td>{book.bookTitle}</td>
//                                     <td>{book.duration} days</td>
//                                     <td>{new Date(book.startDate).toLocaleString('en-IN')}</td>
//                                     <td>{new Date(book.endDate).toLocaleString('en-IN')}</td>
//                                     <td>
//                                         <Badge bg={book.remainingDays <= 3 ? 'danger' : 'success'}>
//                                             {book.remainingDays} days
//                                         </Badge>
//                                     </td>
//                                     <td>
//                                         <button className="btn btn-primary" size="sm" onClick={() => handleView(book.pdfPath)}>View</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 </div>
//             )}

//             {selectedPDF && (
//                 <div className="pdf-modal">
//                     <div className="pdf-modal-content">
//                         <button className="close-btn" onClick={handleClose}>x</button>
//                         <iframe
//                             src={selectedPDF}
//                             width="100%"
//                             height="900px"
//                             style={{ border: 'none' }}
//                             title="PDF Viewer"
//                         />
//                     </div>
//                 </div>
//             )}
//         </Container>
//     );
// };

// export default MyBooks;







import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyBooksRequest } from './Redux/Slices/myBooksSlice';
import './Mybooks.css';
import { Container, Table, Badge } from 'react-bootstrap';

const MyBooks = () => {
    const dispatch = useDispatch();
    const { books, loading, error } = useSelector((state) => state.Userbooks);

    const [selectedPDF, setSelectedPDF] = useState(null);
    const [showModal, setshowmodal] = useState(false); // ✅ Correct useState

    useEffect(() => {
        dispatch(fetchMyBooksRequest());
    }, [dispatch]);

    const handleView = (pdfPath) => {
        setSelectedPDF(`http://localhost:8000/uploads/pdfs/${pdfPath}?token=${localStorage.getItem("token")}#toolbar=0&navpanes=0&scrollbar=0`);
        setshowmodal(true);
    };

    const handleClose = () => {
        setshowmodal(false);
        setSelectedPDF(null);
    };

    return (
        <Container className="my-4">
            <h3 className='text-center fw-bold text-primary'>PURCHASED BOOKS</h3>

            {loading ? (
                <div className='alert alert-warning text-center'>Loading...</div>
            ) : error ? (
                <div className='alert alert-danger text-center'>Error: {error}</div>
            ) : books.length === 0 ? (
                <div className='alert alert-info text-center'>No active books available</div>
            ) : (
                <div className='table-responsive shadow-sm rounded'>
                    <Table striped bordered hover className='align-middle text-center'>
                        <thead className='table-primary'>
                            <tr>
                                <th>IMAGE</th>
                                <th>TITLE</th>
                                <th>DURATION</th>
                                <th>START DATE</th>
                                <th>END DATE</th>
                                <th>REMAINING DAYS</th>
                                <th>PDF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book._id}>
                                    <td>
                                        {book.bookimg ? (
                                            <img
                                                src={`http://localhost:8000/uploads/images/${book.bookimg}`}
                                                alt={book.bookTitle}
                                                style={{ width: '60px', height: '80px' }}
                                                className='rounded'
                                            />
                                        ) : 'No Image'}
                                    </td>
                                    <td>{book.bookTitle}</td>
                                    <td>{book.duration} days</td>
                                    <td>{new Date(book.startDate).toLocaleString('en-IN')}</td>
                                    <td>{new Date(book.endDate).toLocaleString('en-IN')}</td>
                                    <td>
                                        <Badge bg={book.remainingDays <= 3 ? 'danger' : 'success'}>
                                            {book.remainingDays} days
                                        </Badge>
                                    </td>
                                    <td>
                                        <button className="btn btn-primary" size="sm" onClick={() => handleView(book.pdfPath)}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}

            {showModal && selectedPDF && (
                <div className="pdf-modal">
                    <div className="pdf-modal-content">
                        <button className="close-btn" onClick={handleClose}>x</button>
                        <iframe
                            src={selectedPDF}
                            width="100%"
                            height="900px"
                            style={{ border: 'none' }}
                            title="PDF Viewer"
                        />
                    </div>
                </div>
            )}
        </Container>
    );
};

export default MyBooks;
