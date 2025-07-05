import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUserDashboardRequest,
    fetchUserProfileRequest,
} from '../Pages/Redux/Slices/userSlice';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { dashboard, loading, profile } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchUserDashboardRequest());
        dispatch(fetchUserProfileRequest());
    }, [dispatch]);

    if (loading || !dashboard) return <p className="text-center mt-5">Loading...</p>;

    const COLORS = [
        "rgba(54, 162, 235, 0.8)",  // Darker Blue - Available Books
        "rgba(40, 167, 69, 0.8)",   // Dark Green - Books Purchased
        "rgba(255, 193, 7, 0.8)",   // Dark Yellow - Payments Made
        "rgba(220, 53, 69, 0.8)"    // Dark Red (optional if added more)
    ];



    const pieData = [
        { name: 'Available Books', value: dashboard.availableBooks },
        { name: 'Books Purchased', value: dashboard.purchasedBooks },
        { name: 'Payments Made', value: dashboard.totalPayments },
    ];

    return (
        <div className="container mt-4">
            {/* Header */}
            <div className="text-center mb-5">
                <h2 className="fw-bold text-gradient">USER DASHBOARD</h2>
                <p className="text-muted">Welcome back, here's your reading summary!</p>
            </div>

            {/* Profile Summary */}
            {profile && (
                <div className="d-flex justify-content-center mb-4">
                    <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#28e5', borderRadius: '15px' }}>
                        <h5 className="mb-3 text-center fw-bold text-white">PROFILE SUMMARY</h5>
                        <p className='text-white'><strong>Name:</strong> {profile.name}</p>
                        <p className='text-white'><strong>Email:</strong> {profile.email}</p>
                    </div>
                </div>
            )}

            {/* Metric Cards */}
            <div className="row g-4">
                <div className="col-md-3 col-sm-6">
                    <div className="card text-white border-0 shadow text-center" style={{ backgroundColor: '#3366FF', borderRadius: '15px' }}>
                        <div className="card-body">
                            <h6 className="mb-2 fw-semibold">Available Books</h6>
                            <h3>{dashboard.availableBooks}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 col-sm-6">
                    <div className="card text-dark border-0 shadow text-center" style={{ backgroundColor: '#FFCC33', borderRadius: '15px' }}>
                        <div className="card-body">
                            <h6 className="mb-2 fw-semibold text-white">Books Purchased</h6>
                            <h3 className='text-white'>{dashboard.purchasedBooks}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 col-sm-6">
                    <div className="card text-dark border-0 shadow text-center" style={{ backgroundColor: '#FFE066', borderRadius: '15px' }}>
                        <div className="card-body">
                            <h6 className="mb-2 fw-semibold text-white">Payments Made</h6>
                            <h3 className='text-white'>{dashboard.totalPayments}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 col-sm-6">
                    <div className="card text-white border-0 shadow text-center" style={{ backgroundColor: '#28A745', borderRadius: '15px' }}>
                        <div className="card-body">
                            <h6 className="mb-2 fw-semibold">Total Paid</h6>
                            <h3>₹ {dashboard.totalAmountPaid}</h3>
                        </div>
                    </div>
                </div>
            </div>



            {/* Pie Chart */}
            <div className="mt-5">
                <h5 className="text-center mb-4">READING SUMMARY</h5>
                <div className="d-flex justify-content-center">
                    <PieChart width={400} height={300}>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
