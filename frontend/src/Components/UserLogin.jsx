// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import './Login.css'; // Reuse existing styles
// import { ToastContainer, toast } from 'react-toastify';
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const UserLogin = () => {
//     const [showpassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: '',
//         },
//         validationSchema: Yup.object({
//             email: Yup.string().email('Invalid email address').required('Email is required'),
//             password: Yup.string()
//                 .required('Required')
//                 .min(6, 'Minimum 6 characters')
//                 .max(8, 'Maximum 8 characters'),
//         }),
//         onSubmit: async (values) => {
//             try {
//                 const res = await axios.post('http://localhost:8000/api/admin/user/login', {
//                     ...values,
//                     role: 'user'
//                 });

//                 localStorage.setItem('token', res.data.token);
//                 localStorage.setItem('role', 'user');
//                 localStorage.setItem('userData', JSON.stringify(res.data.user));

//                 toast.success('Login successful');

//                 setTimeout(() => {
//                     if (res.data.mustResetPassword) {
//                         navigate('/reset-password');
//                     } else {
//                         navigate('/user/dashboard');
//                     }
//                 }, 1500);
//             } catch (err) {
//                 toast.error(err.response?.data?.message || 'Login failed. Check credentials.');
//             }
//         },
//     });

//     return (
//         <div className='home_login'>
//             <form className='home_loginform' onSubmit={formik.handleSubmit}>
//                 <h2 className="home_loginh2">User Login</h2>

//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur} style={{ marginTop: '15px' }}
//                     className={formik.touched.email && formik.errors.email ? 'form-control is-invalid' : 'form-control'}
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                     <div className="invalid-feedback" style={{ color: 'red' }}>{formik.errors.email}</div>
//                 )}

//                 <div style={{ position: "relative", width: "100%" }}>
//                     <input
//                         type={showpassword ? "text" : "password"}
//                         name="password"
//                         placeholder="Password"
//                         maxLength={8}
//                         value={formik.values.password}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur} style={{ marginTop: '15px' }}
//                         className={formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control'}
//                     />
//                     <span
//                         onClick={() => setShowPassword(prev => !prev)}
//                         style={{
//                             position: "absolute",
//                             top: "50%",
//                             transform: "translateY(-50%)",
//                             right: "12px",
//                             cursor: "pointer"
//                         }}
//                     >
//                         {showpassword ? <FaEye /> : <FaEyeSlash />}
//                     </span>
//                 </div>

//                 {/* Register Link */}
//                 <p className="text-center mt-3" style={{ marginBottom: '16px' }}>
//                     Don't have an account?{" "}
//                     <span
//                         style={{ color: 'blue', cursor: 'pointer' }}
//                         onClick={() => navigate('/register-user')}
//                     >
//                         Register
//                     </span>
//                 </p>

//                 <button type="submit" className='home_loginbutton'>
//                     Login
//                 </button>

//                 <p onClick={() => navigate('/')}>Admin Login</p>
//             </form>
//             <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
//         </div>
//     );
// };

// export default UserLogin;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { ToastContainer, toast } from 'react-toastify';
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import 'react-toastify/dist/ReactToastify.css';
// import './UserLogin.css';

// const UserLogin = () => {
//     const [showpassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const role = localStorage.getItem('role');

//         if (token && role === 'user') {
//             navigate('/user/dashboard');
//         }
//     }, [navigate]);

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: '',
//         },
//         validationSchema: Yup.object({
//             email: Yup.string().email('Invalid email address').required('Email is required'),
//             password: Yup.string()
//                 .required('Password is required')
//                 .min(6, 'Min 6 characters')
//                 .max(8, 'Max 8 characters'),
//         }),
//         onSubmit: async (values) => {
//             try {
//                 const res = await axios.post('http://localhost:8000/api/admin/user/login', {
//                     ...values,
//                     role: 'user'
//                 });

//                 localStorage.setItem('token', res.data.token);
//                 localStorage.setItem('role', 'user');
//                 localStorage.setItem('userData', JSON.stringify(res.data.user));

//                 toast.success('Login successful');
//                 setTimeout(() => {
//                     navigate(res.data.mustResetPassword ? '/reset-password' : '/user/dashboard');
//                 }, 1500);
//             } catch (err) {
//                 toast.error(err.response?.data?.message || 'Login failed');
//             }
//         }
//     });

//     return (
//         <div className="user-login-page">
//             <div className="login-card">
//                 <h2 className="user-login-title">USER LOGIN</h2>

//                 <form onSubmit={formik.handleSubmit}>
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         value={formik.values.email}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur} style={{ outline: 'none', boxShadow: 'none' }}
//                         className={formik.touched.email && formik.errors.email ? 'form-control is-invalid' : 'form-control'}
//                     />
//                     {formik.touched.email && formik.errors.email && (
//                         <div className="invalid-feedback">{formik.errors.email}</div>
//                     )}

//                     <div className="password-container">
//                         <input
//                             type={showpassword ? "text" : "password"}
//                             name="password"
//                             placeholder="Password"
//                             maxLength={8}
//                             value={formik.values.password}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur} style={{ outline: 'none', boxShadow: 'none' }}
//                             className={formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control'}
//                         />
//                         <span className="toggle-eye" onClick={() => setShowPassword(prev => !prev)}>
//                             {showpassword ? <FaEye /> : <FaEyeSlash />}
//                         </span>
//                     </div>
//                     {formik.touched.password && formik.errors.password && (
//                         <div className="invalid-feedback">{formik.errors.password}</div>
//                     )}

//                     <div className="d-flex justify-content-between mt-3 mb-2">
//                         <p className='text-center'>Don't have an account?{" "}</p>
//                         <span onClick={() => navigate('/register-user')} className="link-text">Register</span>
//                     </div>

//                     <button type="submit" className="login-btn">LOGIN</button>
//                 </form>
//             </div>

//             <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
//         </div>
//     );
// };

// export default UserLogin;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import './UserLogin.css';
import { loginRequest } from '../../src/User/Pages/Redux/Slices/userSlice';

const UserLogin = () => {
    const [showpassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, mustResetPassword, error } = useSelector(state => state.userlogin);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (token && role === 'user') {
            navigate('/user/dashboard');
        }
    }, [navigate]);

    // ✅ Handle toast on login success or error
    useEffect(() => {
        if (user) {
            toast.success("Login successful");
            setTimeout(() => {
                navigate(mustResetPassword ? '/reset-password' : '/user/dashboard');
            }, 1500);
        }
        if (error) {
            toast.error(error);
        }
    }, [user, error, mustResetPassword, navigate]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Min 6 characters')
                .max(8, 'Max 8 characters'),
        }),
        onSubmit: (values) => {
            dispatch(loginRequest(values)); // ✅ dispatch Redux-Saga action
        }
    });

    return (
        <div className="user-login-page">
            <div className="login-card">
                <h2 className="user-login-title">USER LOGIN</h2>

                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ outline: 'none', boxShadow: 'none' }}
                        className={formik.touched.email && formik.errors.email ? 'form-control is-invalid' : 'form-control'}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                    )}

                    <div className="password-container">
                        <input
                            type={showpassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            maxLength={8}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            style={{ outline: 'none', boxShadow: 'none' }}
                            className={formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control'}
                        />
                        <span className="toggle-eye" onClick={() => setShowPassword(prev => !prev)}>
                            {showpassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                    )}

                    <div className="d-flex justify-content-between mt-3 mb-2">
                        <p className='text-center'>Don't have an account?{" "}</p>
                        <span onClick={() => navigate('/register-user')} className="link-text">Register</span>
                    </div>

                    <button type="submit" className="login-btn">LOGIN</button>
                </form>
            </div>

            <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
        </div>
    );
};

export default UserLogin;

