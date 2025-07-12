// import React from 'react';
// import { Routes, Route, Link, useNavigate } from 'react-router-dom';
// import Dashboard from './Dashboard';
// import ViewBooks from './View books';
// // import IssuedBooks from './Issued books';
// import History from './History';
// // import Reminders from './Reminders';
// import Profile from './Profile';
// import { FiLogOut } from 'react-icons/fi';
// import { FaUser, FaHistory, FaBookReader, FaCheck } from 'react-icons/fa'
// import { MdDashboard } from 'react-icons/md';
// import Mybooks from './Mybooks';

// const UserRoutes = () => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
//         navigate('/');
//     };

//     return (
//         <div style={{ display: 'flex' }}>
//             <div className="bg-dark text-white p-3" style={{ width: '250px', height: '100vh', position: 'fixed' }}>
//                 <h5 className="mb-4 fw-bold">User Panel</h5>
//                 <ul className="nav flex-column">

//                     <li className="nav-item mb-3">
//                         <Link to="/user/dashboard" className="text-white fw-bold text-decoration-none"> <MdDashboard className='me-2' />DASHBOARD</Link>
//                     </li>

//                     <li className="nav-item mb-3">
//                         <Link to="/user/books" className="text-white fw-bold text-decoration-none"><FaCheck className='me-2' />AVAILABLE BOOKS</Link>
//                     </li>
//                     {/* <li className="nav-item mb-3">
//                         <Link to="/user/issued" className="text-white fw-bold text-decoration-none">My Issued Books</Link>
//                     </li> */}
//                     {/* <li className="nav-item mb-3">
//                         <Link to="/user/history" className="text-white fw-bold text-decoration-none">Borrowing History</Link>
//                     </li> */}
//                     {/* <li className="nav-item mb-3">
//                         <Link to="/user/reminders" className="text-white fw-bold text-decoration-none">Return Reminders</Link>
//                     </li> */}
//                     <li className="nav-item mb-3">
//                         <Link to="/user/mybooks" className="text-white fw-bold text-decoration-none"><FaBookReader className="me-2" />MY BOOKS</Link>
//                     </li>
//                     <li className="nav-item mb-3">
//                         <Link to="/user/history" className="text-white fw-bold text-decoration-none"><FaHistory className="me-2" />PAYMENT HISTORY</Link>
//                     </li>
//                     <li className="nav-item mb-3">
//                         <Link to="/user/profile" className="text-white fw-bold text-decoration-none"><FaUser className="me-2" />MY PROFILE</Link>
//                     </li>


//                     <li className="nav-item mt-auto" onClick={handleLogout}>
//                         <span style={{ cursor: 'pointer', fontWeight: 'bold' }}><FiLogOut className="me-2" /> LOGOUT</span>
//                     </li>
//                 </ul>
//             </div>

//             <div style={{ marginLeft: '250px', padding: '20px' }}>
//                 <Routes>
//                     <Route path="dashboard" element={<Dashboard />} />
//                     <Route path="books" element={<ViewBooks />} />
//                     {/* <Route path="issued" element={<IssuedBooks />} /> */}
//                     <Route path="history" element={<History />} />
//                     {/* <Route path="reminders" element={<Reminders />} /> */}
//                     <Route path="profile" element={<Profile />} />
//                     <Route path="mybooks" element={<Mybooks />} />
//                 </Routes>
//             </div>
//         </div>
//     );
// };

// export default UserRoutes;


import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import ViewBooks from './View books';
import Mybooks from './Mybooks';
import History from './History';
import Profile from './Profile';
import { FiLogOut } from 'react-icons/fi';
import { FaUser, FaHistory, FaBookReader, FaCheck } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const UserRoutes = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    const navItems = [
        { label: "Dashboard", path: "/user/dashboard", icon: <MdDashboard /> },
        { label: "Available Books", path: "/user/books", icon: <FaCheck /> },
        { label: "My Books", path: "/user/mybooks", icon: <FaBookReader /> },
        { label: "Payment History", path: "/user/history", icon: <FaHistory /> },
        { label: "My Profile", path: "/user/profile", icon: <FaUser /> }
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <div
                className="bg-dark text-white p-3"
                style={{
                    width: '250px',
                    height: '100vh',
                    position: 'fixed',
                    overflowY: 'auto',
                    boxShadow: '2px 0 6px rgba(0,0,0,0.1)'
                }}
            >
                <div className="text-center mb-4">
                    <h4 className="fw-bold ">USER PANEL</h4>
                </div>
                <ul className="nav flex-column">
                    {navItems.map((item, idx) => (
                        <li key={idx} className={`nav-item mb-2 ${location.pathname === item.path ? 'bg-primary rounded' : ''}`}>
                            <Link to={item.path} className="nav-link text-white d-flex align-items-center px-3 py-2">
                                <span className="me-2">{item.icon}</span> {item.label.toUpperCase()}
                            </Link>
                        </li>
                    ))}

                    <li className="nav-item mt-4 px-3">
                        <span
                            onClick={handleLogout}
                            className="d-flex align-items-center text-danger fw-bold"
                            style={{ cursor: 'pointer' }}
                        >
                            <FiLogOut className="me-2" /> LOGOUT
                        </span>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div style={{ marginLeft: '250px', padding: '30px', width: '100%' }}>
                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="books" element={<ViewBooks />} />
                    <Route path="mybooks" element={<Mybooks />} />
                    <Route path="history" element={<History />} />
                    <Route path="profile" element={<Profile />} />
                </Routes>
            </div>
        </div>
    );
};

export default UserRoutes;
