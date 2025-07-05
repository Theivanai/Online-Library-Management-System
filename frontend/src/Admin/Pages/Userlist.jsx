import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Modal } from "bootstrap";
// import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/user/all`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setUsers(res.data);
        } catch (error) {
            toast.error("Failed to load users");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h4 className="text-center">USER LISTS</h4>
                </div>
                <div className="card-body table-responsive">
                    <table className="table table-bordered text-center align-middle">
                        <thead className="table-secondary">
                            <tr>
                                <th>USER ID</th>
                                <th>PROFILE</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>PHONE</th>
                                <th>GENDER</th>
                                <th>ROLE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="7">No users found</td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.userId || "N/A"}</td>
                                        <td>
                                            {user.profileImage ? (
                                                <img
                                                    src={`http://localhost:8000/uploads/${user.profileImage}`}
                                                    alt="Profile"
                                                    style={{
                                                        width: '60px', height: '80px',
                                                        objectFit: 'contain', border: 'none', borderRadius: '0%'
                                                    }}

                                                />
                                            ) : (
                                                <span className="text-muted">No Image</span>
                                            )}
                                        </td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.gender}</td>
                                        <td>
                                            <span className={`badge ${user.role === "admin" ? "bg-success" : "bg-info"}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={2000} closeButton={false} />
        </div>
    );
}

export default UserList;
