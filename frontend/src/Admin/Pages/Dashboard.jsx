import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardRequest } from '../../Redux/admin/adminSlice';
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';
import './Dashboard.css';

const Dashboard = () => {
    const dispatch = useDispatch();

    const adminState = useSelector((state) => state.AdminDashboard);
    const {
        stats = {},
        loading,
        error,
        recentBooks = [],
        recentUsers = [],
    } = adminState;

    useEffect(() => {
        dispatch(fetchDashboardRequest()); // Fetch dashboard stats on load
    }, [dispatch]);

    const bookPieData = {
        labels: ["Total Books", "Purchased Books"],
        datasets: [
            {
                data: [stats.totalBooks || 0, stats.purchasedBooks || 0],
                backgroundColor: ["#007bff", "#ffc107"],
                borderColor: "#fff",
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="container mt-4">
            <h4 className="fw-bold mb-4">Hello, <span className="text-primary">Admin!</span></h4>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <>
                    {/* Summary Cards */}
                    <div className="row g-4">
                        <div className="col-md-3">
                            <div className="card text-white bg-primary shadow-sm border-0 text-center p-3">
                                <h6>Total Books</h6>
                                <h3>{stats.totalBooks || 0}</h3>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-dark bg-warning shadow-sm border-0 text-center p-3">
                                <h6 className="text-white">Active Rentals</h6>
                                <h3 className="text-white">{stats.purchasedBooks || 0}</h3>
                            </div>
                        </div>
                        {/* You can add more summary cards here */}
                    </div>

                    {/* Tables Section */}
                    <div className="row mt-5 g-4">
                        {/* Users Table */}
                        <div className="col-md-6">
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-white fw-bold">Users List</div>
                                <div className="card-body">
                                    <table className="table table-sm table-borderless">
                                        <thead>
                                            <tr>
                                                <th>User ID</th>
                                                <th>Name</th>
                                                <th>Books</th>
                                                <th>Dept</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentUsers?.slice(0, 4).map((u) => (
                                                <tr key={u._id}>
                                                    <td>{u.userId}</td>
                                                    <td>{u.name}</td>
                                                    <td>{u.totalBooks}</td>
                                                    <td>{u.department}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="text-end">
                                        <a href="/admin/userlist" className="text-decoration-none text-primary">See All</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Books Table */}
                        <div className="col-md-6">
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-white fw-bold">Books List</div>
                                <div className="card-body">
                                    <table className="table table-sm table-borderless">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Title</th>
                                                <th>Author</th>
                                                <th>Available</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentBooks?.slice(0, 4).map((b) => (
                                                <tr key={b._id}>
                                                    <td>{b.bookId}</td>
                                                    <td>{b.title}</td>
                                                    <td>{b.author}</td>
                                                    <td>{b.stock}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="text-end">
                                        <a href="/admin/booklist" className="text-decoration-none text-primary">See All</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pie Chart */}
                    <div className="row mt-5">
                        <div className="col-md-6 mx-auto text-center">
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-white fw-bold">Book Summary</div>
                                <div className="card-body" style={{ height: '360px' }}>
                                    <Pie data={bookPieData} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
