// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import QRCode from 'react-qr-code';
// import { toast } from 'react-toastify';
// import './BuyBookModal.css';

// const BuyBookModal = ({ book, onClose, refreshBooks }) => {
//     const [user, setUser] = useState({});
//     const [duration, setDuration] = useState("7");
//     const [price, setPrice] = useState(0);
//     const [place, setPlace] = useState("");
//     const [isBookPurchased, setIsBookPurchased] = useState(false);
//     const [showQR, setShowQR] = useState(false);
//     const [startDateISO, setStartDateISO] = useState("");
//     const [endDateISO, setEndDateISO] = useState("");
//     const [isAvailable, setIsAvailable] = useState(true);

//     const RATE_PER_DAY = 10;

//     const formatDateTime = (date) => {
//         const d = new Date(date);
//         return d.toLocaleString('en-IN', {
//             day: '2-digit', month: '2-digit', year: 'numeric',
//             hour: '2-digit', minute: '2-digit', hour12: true
//         });
//     };

//     useEffect(() => {
//         axios.get(`http://localhost:8000/api/users/profile`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//         })
//             .then(res => setUser(res.data))
//             .catch(() => toast.error("Failed to load user info"));
//     }, []);

//     useEffect(() => {
//         if (book?.bookId) {
//             const fetchStatus = async () => {
//                 const token = localStorage.getItem("token");

//                 if (book?.status === "Out of Stock") {
//                     setIsAvailable(false);
//                     return;
//                 }

//                 const res = await axios.get(
//                     `http://localhost:8000/api/payment/book-status/${book.bookId}`,
//                     { headers: { Authorization: `Bearer ${token}` } }
//                 );

//                 if (res.data.purchased) {
//                     setIsBookPurchased(true);
//                     setStartDateISO(res.data.startDate);
//                     setEndDateISO(res.data.endDate);
//                 } else {
//                     const now = new Date();
//                     const end = new Date(now.getTime() + parseInt(duration) * 86400000);
//                     setStartDateISO(now.toISOString());
//                     setEndDateISO(end.toISOString());
//                     setIsBookPurchased(false);
//                 }
//             };

//             fetchStatus();
//         }
//     }, [book.bookId, duration]);

//     useEffect(() => {
//         const now = new Date();
//         const end = new Date(now.getTime() + parseInt(duration) * 86400000);
//         setPrice(parseInt(duration) * RATE_PER_DAY);
//         setStartDateISO(now.toISOString());
//         setEndDateISO(end.toISOString());
//     }, [duration]);

//     const handleFakePayment = async () => {
//         if (!place.trim()) {
//             toast.error("Please enter your place");
//             return;
//         }

//         if (!isAvailable) {
//             toast.error("Book is out of stock");
//             return;
//         }

//         try {
//             const token = localStorage.getItem("token");

//             const res = await axios.post(`http://localhost:8000/api/payment/verify`, {
//                 bookId: book.bookId,
//                 duration,
//                 place,
//                 amountPaid: Number(price),
//                 startDate: startDateISO,
//                 endDate: endDateISO
//             }, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             await axios.put(`http://localhost:8000/api/payment/reduce-stock/${book._id}`, {},
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             toast.success(res.data.message || "Payment recorded");
//             refreshBooks();
//             onClose();

//             setShowQR(false);
//             // Show PDF immediately after purchase
//             setIsBookPurchased(true);


//         } catch (err) {
//             toast.error(err.response?.data?.message || "Payment failed");
//         }
//     };

//     const qrValue = JSON.stringify({
//         user: user?.name || "N/A",
//         email: user?.email || "N/A",
//         userId: user?.userId || user?._id || "N/A",
//         bookTitle: book?.title || "N/A",
//         amountPaid: `${price} INR`,
//         duration: `${duration} days`,
//         place,
//         startDate: formatDateTime(startDateISO),
//         endDate: formatDateTime(endDateISO)
//     });

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <h4>BUY BOOK</h4>

//                 {!showQR && !isBookPurchased && (
//                     <>
//                         <div className="form-group"><label>Name:</label><input value={user.name || ''} disabled /></div>
//                         <div className="form-group"><label>Email:</label><input value={user.email || ''} disabled /></div>
//                         <div className="form-group"><label>User ID:</label><input value={user.userId || user._id || ''} disabled /></div>
//                         <div className="form-group"><label>Book Title:</label><input value={book.title} disabled /></div>
//                         <div className="form-group"><label>Place:</label><input value={place} onChange={(e) => setPlace(e.target.value)} /></div>
//                         <div className="form-group">
//                             <label>Duration:</label>
//                             <select value={duration} onChange={(e) => setDuration(e.target.value)}>
//                                 <option value="7">7 days</option>
//                                 <option value="15">15 days</option>
//                                 <option value="30">30 days</option>
//                             </select>
//                         </div>
//                         <div className="form-group"><label>Start Date:</label><input value={formatDateTime(startDateISO)} disabled /></div>
//                         <div className="form-group"><label>End Date:</label><input value={formatDateTime(endDateISO)} disabled /></div>
//                         <div className="form-group"><label>Price:</label><input value={`₹${price}`} disabled /></div>
//                         {isAvailable && (
//                             <div className="form-group d-flex justify-content-between mt-3">
//                                 <button className="btn btn-primary" onClick={() => setShowQR(true)}>Pay & Buy</button>
//                                 <button className="btn btn-danger" onClick={onClose}>Cancel</button>
//                             </div>
//                         )}
//                         {!isAvailable && (
//                             <div className="form-group text-center mt-3">
//                                 <p className="text-danger fw-bold">Book is <u>Unavailable</u></p>
//                                 <button className="btn btn-secondary" onClick={onClose}>Close</button>
//                             </div>
//                         )}
//                     </>
//                 )}

//                 {showQR && (
//                     <div className="form-group text-center">
//                         <h4>Scan to Pay</h4>
//                         <QRCode value={qrValue} size={180} />
//                         {/* <p>After scanning, click below</p> */}
//                         <div className="d-flex justify-content-center gap-3 mt-3">
//                             <button className="btn btn-success m-1" onClick={handleFakePayment}>Paid</button>
//                             <button className="btn btn-secondary" onClick={() => setShowQR(false)}>Cancel Payment</button>
//                         </div>
//                     </div>
//                 )}

//                 {isBookPurchased && (
//                     <>
//                         <div className="form-group mt-3 text-center">
//                             <p className="text-success fw-bold">Book Purchased</p>
//                             <button className="btn btn-danger m-2 w-25" onClick={onClose}>Close</button>
//                         </div>

//                         {/* Show PDF directly */}
//                         {/* <div className="pdf-iframe-wrapper" style={{ marginTop: "20px" }}>
//                             <iframe
//                                 title="PDF Viewer"
//                                 src={`http://localhost:8000/api/payment/pdf/${book.bookId}?token=${localStorage.getItem("token")}#toolbar=0&navpanes=0&scrollbar=0`}
//                                 width="100%"
//                                 height="600px"
//                                 style={{ border: "1px solid #ccc", borderRadius: "5px" }}
//                             />
//                         </div> */}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default BuyBookModal;


import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'react-qr-code';
import { toast, ToastContainer } from 'react-toastify';

import {
    fetchUserProfileRequest
} from '../User/Pages/Redux/Slices/userSlice';

import {
    checkBookStatusRequest,
    fakePaymentRequest
} from '../User/Pages/Redux/Slices/paymentSlice';

import './BuyBookModal.css';

const BuyBookModal = ({ book, onClose }) => {
    const dispatch = useDispatch();
    const [duration, setDuration] = useState("7");
    const [place, setPlace] = useState("");
    const [showQR, setShowQR] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);

    const RATE_PER_DAY = 10;

    const  user  = useSelector(state => state.UserData.profile);
    console.log(useSelector(state => state.UserData))
    const {
        isBookPurchased,
        startDate,
        endDate
    } = useSelector(state => state.UserPayment);

    const price = useMemo(() => parseInt(duration) * RATE_PER_DAY, [duration]);

    const formatDateTime = (date) => {
        const d = new Date(date);
        return d.toLocaleString('en-IN', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: true
        });
    };

    useEffect(() => {
        dispatch(fetchUserProfileRequest());
    }, [dispatch]);

    useEffect(() => {
        if (book?.status === "Out of Stock") {
            setIsAvailable(false);
        } else {
            setIsAvailable(true);
            dispatch(checkBookStatusRequest({ bookId: book.bookId, duration }));
        }
    }, [book, duration, dispatch]);

    const handleFakePayment = () => {
        if (!place.trim()) {
            toast.error("Please enter your place");
            return;
        }

        dispatch(fakePaymentRequest({
            bookId: book.bookId,
            _id: book._id,
            duration,
            place,
            amountPaid: price,
            startDate,
            endDate
        }));

        setShowQR(false);
        onClose();
    };

    const qrValue = JSON.stringify({
        user: user?.name || "N/A",
        email: user?.email || "N/A",
        userId: user?.userId || user?._id || "N/A",
        bookTitle: book?.title || "N/A",
        amountPaid: `${price} INR`,
        duration: `${duration} days`,
        place,
        startDate: formatDateTime(startDate),
        endDate: formatDateTime(endDate)
    });

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h4>BUY BOOK</h4>

                {!showQR && !isBookPurchased && (
                    <>
                        <div className="form-group"><label>Name:</label><input value={user.name || ''} disabled /></div>
                        <div className="form-group"><label>Email:</label><input value={user.email || ''} disabled /></div>
                        <div className="form-group"><label>User ID:</label><input value={user.userId || user._id || ''} disabled /></div>
                        <div className="form-group"><label>Book Title:</label><input value={book.title} disabled /></div>
                        <div className="form-group"><label>Place:</label><input value={place} onChange={(e) => setPlace(e.target.value)} /></div>
                        <div className="form-group">
                            <label>Duration:</label>
                            <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                                <option value="7">7 days</option>
                                <option value="15">15 days</option>
                                <option value="30">30 days</option>
                            </select>
                        </div>
                        <div className="form-group"><label>Start Date:</label><input value={formatDateTime(startDate)} disabled /></div>
                        <div className="form-group"><label>End Date:</label><input value={formatDateTime(endDate)} disabled /></div>
                        <div className="form-group"><label>Price:</label><input value={`₹${price}`} disabled /></div>
                        {isAvailable ? (
                            <div className="form-group d-flex justify-content-between mt-3">
                                <button className="btn btn-primary" onClick={() => setShowQR(true)}>Pay & Buy</button>
                                <button className="btn btn-danger" onClick={onClose}>Cancel</button>
                            </div>
                        ) : (
                            <div className="form-group text-center mt-3">
                                <p className="text-danger fw-bold">Book is <u>Unavailable</u></p>
                                <button className="btn btn-secondary" onClick={onClose}>Close</button>
                            </div>
                        )}
                    </>
                )}

                {showQR && (
                    <div className="form-group text-center">
                        <h4>Scan to Pay</h4>
                        <QRCode value={qrValue} size={180} />
                        <div className="d-flex justify-content-center gap-3 mt-3">
                            <button className="btn btn-success m-1" onClick={handleFakePayment}>Paid</button>
                            <button className="btn btn-secondary" onClick={() => setShowQR(false)}>Cancel Payment</button>
                        </div>
                    </div>
                )}

                {isBookPurchased && (
                    <>
                        <div className="form-group mt-3 text-center">
                            <p className="text-success fw-bold">Book Purchased</p>
                            <button className="btn btn-danger m-2 w-25" onClick={onClose}>Close</button>
                        </div>
                    </>
                )}

                <ToastContainer position="top-center" autoClose={1500} />
            </div>
        </div>
    );
};

export default BuyBookModal;
