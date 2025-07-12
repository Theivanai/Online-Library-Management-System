// import React from "react";
// import { Link, Routes, Route, useNavigate, Navigate } from "react-router-dom";
// import Dashboard from './Dashboard';
// import Bookhistory from './Bookhistory';
// import Addbook from './Addbook';
// import Booklist from './Booklist';
// import Userlist from './Userlist';
// import AddNewAdmin from './Add New Admin';
// // import Issuebook from './Issuebook';
// // import Returnbook from './Returnbook';
// import { FiLogOut } from 'react-icons/fi';
// import { MdDashboard } from 'react-icons/md'
// import { FaUser, FaUsers, FaBookOpen, FaBookMedical,FaHistory } from 'react-icons/fa';
// // import UserRegistration from './UserRegistration';
// import ForgotPassword from "../../Components/ForgetPassword";


// const AdminRoute = () => {
//     const isAuthenticated = !!localStorage.getItem('token'); // Simple auth check

//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
//         navigate('/');
//     };

//     return (
//         <div>
//             {/* Sidebar + Main Content Layout */}
//             <div style={{ display: "flex" }}>
//                 {/* Sidebar */}
//                 <div
//                     className="bg-dark text-white p-3"
//                     style={{
//                         width: "250px",
//                         height: "100vh",
//                         // marginTop: "10px",
//                         position: "fixed",
//                     }}
//                 >
//                     <h5 className="mb-4 fw-bold">Admin Panel</h5>
//                     <ul className="nav flex-column">
//                         <li className="nav-item mb-3 fw-bold">
//                             <Link
//                                 to="/admin/dashboard"
//                                 className="text-white text-decoration-none"
//                             >
//                                 <MdDashboard className="me-2" />DASHBOARD
//                             </Link>
//                         </li>
//                         <li className="nav-item mb-3 fw-bold">
//                             <Link
//                                 to="/admin/Bookhistory"
//                                 className="text-white text-decoration-none"
//                             >
//                                 <FaHistory className="me-2"/>BOOK HISTORY
//                             </Link>
//                         </li>
//                         <li className="nav-item mb-3 fw-bold">
//                             <Link
//                                 to="/admin/Addbook"
//                                 className="text-white text-decoration-none"
//                             >
//                                 <FaBookMedical className="me-2" />ADD BOOKS
//                             </Link>
//                         </li>
//                         <li className="nav-item mb-3 fw-bold">
//                             <Link
//                                 to="/admin/Booklist"
//                                 className="text-white text-decoration-none"
//                             >
//                                 <FaBookOpen className="me-2" />BOOK LISTS
//                             </Link>
//                         </li>
//                         <li className="nav-item mb-3 fw-bold">
//                             <Link
//                                 to="/admin/Userlist"
//                                 className="text-white text-decoration-none"
//                             >
//                                 <FaUsers className="me-2" />USER LISTS
//                             </Link>
//                         </li>

//                         {/* <li className="nav-item mb-3 fw-bold">
//                             <Link
//                                 to="/admin/Issuebook"
//                                 className="text-white text-decoration-none"
//                             >
//                                 ISSUE BOOKS
//                             </Link>
//                         </li>
//                         <li className="nav-item mb-3 fw-bold">
//                             <Link
//                                 to="/admin/return-book"
//                                 className="text-white text-decoration-none"
//                             >
//                                 RETURN BOOKS
//                             </Link>
//                         </li> */}

//                         {/* <li className="nav-item mb-3 fw-bold d-flex align-items-center">
//                             <Link to="/admin/add-new-admin" className="text-white text-decoration-none d-flex align-items-center">
//                                 <FaUser className="me-2" />
//                                 ADMIN
//                             </Link>
//                         </li> */}

//                         {/* <li className="nav-item mb-3 fw-bold d-flex align-items-center">
//                             <Link to="/admin/register-user" className="text-white text-decoration-none d-flex align-items-center">
//                                 <FaUser className="me-2" />
//                                 USER REGISTRATION
//                             </Link>
//                         </li> */}

//                         <li
//                             onClick={handleLogout}

//                         >
//                             <FiLogOut className="me-2" />
//                             <span style={{ cursor: "pointer", fontWeight: "bold" }}>LOGOUT</span>
//                         </li>
//                     </ul>
//                 </div>
//             </div>


//             {/* Main Content */}
//             <div style={{ marginLeft: "250px", padding: "80px 20px 20px" }}>
//                 <Routes>
//                     <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
//                     <Route path="/dashboard" element={<Dashboard />} />
//                     <Route path="/bookhistory" element={<Bookhistory />} />
//                     <Route path="/addbook" element={<Addbook />} />
//                     <Route path="/Booklist" element={<Booklist />} />
//                     <Route path="/Userlist" element={<Userlist />} />
//                     <Route path="/add-new-admin" element={<AddNewAdmin />} />
//                     <Route path="/forgotpassword" element={<ForgotPassword />} />
//                     {/* <Route path="/Issuebook" element={<Issuebook />} />
//                     <Route path="/return-book" element={<Returnbook />} /> */}
//                     {/* <Route path="/register-user" element={<UserRegistration />} /> */}
//                 </Routes>
//             </div>
//         </div>
//     )
// }
// export default AdminRoute;


import React from "react";
import { Link, Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import Dashboard from './Dashboard';
import Bookhistory from './Bookhistory';
import Addbook from './Addbook';
import Booklist from './Booklist';
import Userlist from './Userlist';
import AddNewAdmin from './Add New Admin';
import ForgotPassword from "../../Components/ForgetPassword";
import { FiLogOut } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import { FaUser, FaUsers, FaBookOpen, FaBookMedical, FaHistory } from 'react-icons/fa';

const AdminRoute = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    const navItems = [
        { path: "/admin/dashboard", label: "Dashboard", icon: <MdDashboard /> },
        { path: "/admin/bookhistory", label: "Book History", icon: <FaHistory /> },
        { path: "/admin/addbook", label: "Add Books", icon: <FaBookMedical /> },
        { path: "/admin/booklist", label: "Book Lists", icon: <FaBookOpen /> },
        { path: "/admin/add-new-admin", label: "Add New Admin", icon: <FaUser /> },
        { path: "/admin/userlist", label: "User Lists", icon: <FaUsers /> },
    ];

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            {/* Sidebar */}
            <div
                className="bg-dark text-white p-3"
                style={{
                    width: "250px",
                    position: "fixed",
                    height: "100vh",
                    overflowY: "auto",
                    boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
                }}
            >
                <div className="text-center mb-4">
                    <h4 className="fw-bold ">ADMIN PANEL</h4>
                </div>
                <ul className="nav flex-column">
                    {navItems.map((item, idx) => (
                        <li key={idx} className={`nav-item mb-2 ${location.pathname === item.path ? 'bg-primary rounded' : ''}`}>
                            <Link
                                to={item.path}
                                className="nav-link text-white d-flex align-items-center px-3 py-2"
                            >
                                <span className="me-2">{item.icon}</span> {item.label.toUpperCase()}
                            </Link>
                        </li>
                    ))}

                    <li className="nav-item mt-4 px-3">
                        <span
                            onClick={handleLogout}
                            style={{ cursor: "pointer" }}
                            className="d-flex align-items-center text-danger fw-bold"
                        >
                            <FiLogOut className="me-2" /> LOGOUT
                        </span>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div style={{ marginLeft: "250px", padding: "30px", width: "100%" }}>
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/bookhistory" element={<Bookhistory />} />
                    <Route path="/addbook" element={<Addbook />} />
                    <Route path="/booklist" element={<Booklist />} />
                    <Route path="/userlist" element={<Userlist />} />
                    <Route path="/add-new-admin" element={<AddNewAdmin />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminRoute;
