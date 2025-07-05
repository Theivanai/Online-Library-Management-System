// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Bookhistory.css';

// const BookHistory = () => {
//   const [history, setHistory] = useState([]);

//   useEffect(() => {
//     const fetchHistory = async () => {
//       try {
//         const res = await axios.get('http://localhost:8000/api/book-history/all', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         });
//         setHistory(res.data);
//       } catch (err) {
//         console.error("Failed to fetch history", err);
//       }
//     };
//     fetchHistory();
//   }, []);

//   return (
//     <div className="book-history">
//       <h4>Book Payment History</h4>
//       <table className="history-table">
//         <thead>
//           <tr>
//             {/* <th>SNO</th> */}
//             <th>IMAGE</th>
//             <th>BOOK ID</th>
//             <th>USER ID</th>
//             <th>USER NAME</th>
//             <th>USER EMAIL</th>
//             <th>BOOK TITLE</th>
//             <th>START DATE</th>
//             <th>END DATE</th>
//             <th>AMOUNT PAID</th>
//           </tr>
//         </thead>
//         <tbody>
//           {console.log(history)}
//           {history.map((record, index) => (
//             <tr key={record._id}>
//               {/* <td>{index + 1}</td> */}
//               <td><img src={`http://localhost:8000/uploads/images/${record.bookimg}`} alt="bookimg"
//                 style={{ width: "50px", height: "60px" }} />
//               </td>
//               <td>{record.bookId}</td>
//               <td>{record.userId}</td>
//               <td>{record.userName}</td>
//               <td>{record.userEmail}</td>
//               <td>{record.bookTitle}</td>
//               <td>{record.startDate ? new Date(record.startDate).toLocaleString('en-IN', {
//                 hour: 'numeric',
//                 minute: 'numeric',
//                 second: 'numeric',
//                 hour12: true,
//                 day: '2-digit',
//                 month: '2-digit',
//                 year: 'numeric'
//               }) : 'Not available'}

//               </td>
//               <td>{record.endDate ? new Date(record.endDate).toLocaleString('en-IN', {
//                 hour: 'numeric',
//                 minute: 'numeric',
//                 second: 'numeric',
//                 hour12: true,
//                 day: '2-digit',
//                 month: '2-digit',
//                 year: 'numeric'
//               }) : 'Not available'}
//               </td>
//               <td>₹{record.amountPaid ? record.amountPaid.toFixed(2) : '0.00'}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BookHistory;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Image, Form, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Bookhistory.css';

const BookHistory = () => {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/book-history/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch history", err);
      }
    };
    fetchHistory();
  }, []);

  //filter by username or email
  const filterhistory = history.filter((record) =>
    record.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Container className="mt-4">
      <div className="text-center mb-4">
        <h3 className="fw-bold text-primary">BOOK PAYMENT HISTORY</h3>
      </div>

      <InputGroup className="mb-3">
        {/* <InputGroup.Text>🔍</InputGroup.Text> */}
        <Form.Control
          type="text"
          placeholder="Search by user name or email"
          value={searchTerm} style={{ outline: 'none', boxShadow: 'none' }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <div className="table-responsive shadow-sm border-0">
        <Table bordered hover striped className="align-middle text-center">
          <thead className="table-primary">
            <tr>
              <th>IMAGE</th>
              <th>BOOK ID</th>
              <th>USER ID</th>
              <th>USER NAME</th>
              <th>USER EMAIL</th>
              <th>BOOK TITLE</th>
              <th>START DATE</th>
              <th>END DATE</th>
              <th>AMOUNT PAID</th>
            </tr>
          </thead>
          <tbody>
            {filterhistory.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-muted">No payment records available.</td>
              </tr>
            ) : (
              filterhistory.map((record) => (
                <tr key={record._id}>
                  <td>
                    <Image
                      src={`http://localhost:8000/uploads/images/${record.bookimg}`}
                      alt="book"
                      thumbnail
                      style={{ width: '60px', height: '80px' }}
                    />
                  </td>
                  <td>{record.bookId}</td>
                  <td>{record.userId}</td>
                  <td>{record.userName || "N/A"}</td>
                  <td>{record.userEmail || "N/A"}</td>
                  <td>{record.bookTitle}</td>
                  <td>
                    {record.startDate
                      ? new Date(record.startDate).toLocaleString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour12: true,
                      })
                      : 'Not available'}
                  </td>
                  <td>
                    {record.endDate
                      ? new Date(record.endDate).toLocaleString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour12: true,
                      })
                      : 'Not available'}
                  </td>
                  <td className="fw-semibold text-success">
                    ₹{record.amountPaid ? record.amountPaid.toFixed(2) : '0.00'}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default BookHistory;

