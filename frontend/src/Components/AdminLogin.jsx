// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import './Login.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Login = () => {
//     const [showpassword, setshowpassword] = useState(false);
//     const navigate = useNavigate();

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: '',
//             role: 'admin',
//         },
//         validationSchema: Yup.object({
//             email: Yup.string().email('Invalid email address').required('Email is required'),
//             password: Yup.string()
//                 .required('Required')
//                 .matches(/^[a-zA-Z0-9]+$/, 'Password must be alphanumeric')
//                 .min(6, 'Password must be at least 6 characters')
//                 .max(8, 'Password cannot be more than 8 characters')
//         }),
//         onSubmit: async (values) => {
//             try {
//                 // Determine endpoint based on role
//                 const endpoint = values.role === 'admin'
//                     ? `http://localhost:8000/api/admin/admin/login`
//                     : `http://localhost:8000/api/admin/user/login`;

//                 const res = await axios.post(endpoint, {
//                     email: values.email,
//                     password: values.password,
//                     role: values.role
//                 });

//                 localStorage.setItem('token', res.data.token);
//                 localStorage.setItem('role', values.role);
//                 localStorage.setItem('userData', JSON.stringify(res.data.user));

//                 toast.success('Login successful');

//                 setTimeout(() => {
//                     if (res.data.mustResetPassword) {
//                         navigate('/reset-password');
//                     } else {
//                         navigate(values.role === 'admin'
//                             ? '/admin/dashboard'
//                             : '/user/dashboard');
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
//                 <h2 className="home_loginh2">Login</h2>

//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className={formik.touched.email && formik.errors.email ? 'form-control is-invalid' : 'form-control'}
//                     style={{ width: '100%', padding: '10px', marginBottom: '12px', outline: 'none', boxShadow: "none" }}
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                     <div className="invalid-feedback" style={{ color: 'red', marginBottom: '10px' }}>{formik.errors.email}</div>
//                 )}


//                 <div style={{ position: "relative", width: "100%" }}>
//                     <input
//                         type={showpassword ? "text" : "password"}
//                         name="password"
//                         placeholder="Password"
//                         maxLength={8}
//                         value={formik.values.password}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control'}
//                         style={{ width: '100%', padding: '10px', marginBottom: '12px', outline: 'none', boxShadow: "none" }}
//                     />
//                     <span
//                         onClick={() => setshowpassword((prev) => !prev)}
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


//                 <select
//                     name="role"
//                     value={formik.values.role}
//                     onChange={formik.handleChange}
//                     className="form-control home_loginrole"
//                     style={{ width: '100%', padding: '10px', marginBottom: '16px', borderColor: '#ccc', outline: 'none', boxShadow: "none" }}
//                 >
//                     <option value="admin">Admin</option>
//                     <option value="user">User</option>
//                 </select>


//                 <button type="submit" className='home_loginbutton'>
//                     Login
//                 </button>
//             </form>

//             <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
//         </div>
//     );
// };

// export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import './Login.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Login = () => {
//     const [showpassword, setshowpassword] = useState(false);
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
//                 .matches(/^[a-zA-Z0-9]+$/, 'Password must be alphanumeric')
//                 .min(6, 'Password must be at least 6 characters')
//                 .max(8, 'Password cannot be more than 8 characters')
//         }),
//         onSubmit: async (values) => {
//             try {
//                 // Always use admin login endpoint
//                 const endpoint = `http://localhost:8000/api/admin/admin/login`;

//                 const res = await axios.post(endpoint, {
//                     email: values.email,
//                     password: values.password,
//                     role: 'admin'
//                 });

//                 localStorage.setItem('token', res.data.token);
//                 localStorage.setItem('role', 'admin');
//                 localStorage.setItem('userData', JSON.stringify(res.data.user));

//                 toast.success('Login successful');

//                 setTimeout(() => {
//                     navigate(res.data.mustResetPassword ? '/reset-password' : '/admin/dashboard');
//                 }, 1500);
//             } catch (err) {
//                 toast.error(err.response?.data?.message || 'Login failed');
//             }
//         },
//     });

//     return (
//         <div className='home_login'>
//             <form className='home_loginform' onSubmit={formik.handleSubmit}>
//                 <h2 className="home_loginh2">Admin Login</h2>

//                 <input
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     className={formik.touched.email && formik.errors.email ? 'form-control is-invalid' : 'form-control'}
//                     style={{ width: '100%', padding: '10px', marginBottom: '12px', outline: 'none', boxShadow: "none" }}
//                 />
//                 {formik.touched.email && formik.errors.email && (
//                     <div className="invalid-feedback" style={{ color: 'red', marginBottom: '10px' }}>{formik.errors.email}</div>
//                 )}

//                 <div style={{ position: "relative", width: "100%" }}>
//                     <input
//                         type={showpassword ? "text" : "password"}
//                         name="password"
//                         placeholder="Password"
//                         maxLength={8}
//                         value={formik.values.password}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control'}
//                         style={{ width: '100%', padding: '10px', marginBottom: '12px', outline: 'none', boxShadow: "none" }}
//                     />
//                     <span
//                         onClick={() => setshowpassword((prev) => !prev)}
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

//                 {/* <p className="text-center" style={{ marginBottom: '16px' }}>
//                     Don't have an account?{" "}
//                     <span
//                         style={{ color: 'blue', cursor: 'pointer' }}
//                         onClick={() => navigate('/register-user')}
//                     >
//                         Register
//                     </span>
//                 </p> */}

//                 <button type="submit" className='home_loginbutton'>
//                     Login
//                 </button>
//                 <p onClick={() => navigate('/user-login')}>User Login</p>
//             </form>



//             <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
//         </div>
//     );
// };

// export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import './AdminLogin.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";

// const Login = () => {
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
//                 .required('Password is required')
//                 .matches(/^[a-zA-Z0-9]+$/, 'Alphanumeric only')
//                 .min(6, 'Min 6 characters')
//                 .max(8, 'Max 8 characters'),
//         }),
//         onSubmit: async (values) => {
//             try {
//                 const res = await axios.post(`http://localhost:8000/api/admin/admin/login`, {
//                     ...values,
//                     role: 'admin'
//                 });

//                 localStorage.setItem('token', res.data.token);
//                 localStorage.setItem('role', 'admin');
//                 localStorage.setItem('userData', JSON.stringify(res.data.user));

//                 toast.success('Login successful');

//                 setTimeout(() => {
//                     navigate(res.data.mustResetPassword ? '/reset-password' : '/admin/dashboard');
//                 }, 1500);
//             } catch (err) {
//                 toast.error(err.response?.data?.message || 'Login failed');
//             }
//         },
//     });



//     return (
//         <div className='admin-login-page'>
//             <div className='top-right-user-icon' onClick={() => navigate('/user-login')}>
//                 <FaUser title='user login' />

//             </div>
//             <div className='admin-login-card'>
//                 <h2 className="admin-login-title">ADMIN</h2>

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

//                     <button type="submit" className="admin-login-btn">LOGIN</button>


//                 </form>
//             </div>

//             <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
//         </div>
//     );
// };

// export default Login;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { adminLoginRequest } from '../Redux/admin/adminSlice';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import './AdminLogin.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .matches(/^[a-zA-Z0-9]+$/, 'Alphanumeric only')
                .min(6, 'Min 6 characters')
                .max(8, 'Max 8 characters'),
        }),
        onSubmit: (values) => {
            dispatch(adminLoginRequest({ ...values, toast, navigate }));
        },
    });

    return (
        <div className='admin-login-page'>
            <div className='top-right-user-icon' onClick={() => navigate('/user-login')}>
                <FaUser title='user login' />
            </div>
            <div className='admin-login-card'>
                <h2 className="admin-login-title">ADMIN</h2>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} style={{ outline: 'none', boxShadow: 'none' }}
                        className={formik.touched.email && formik.errors.email ? 'form-control is-invalid' : 'form-control'} 
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                    )}

                    <div className="password-container">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            maxLength={8}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur} style={{ outline: 'none', boxShadow: 'none' }}
                            className={formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control'}
                        />
                        <span className="toggle-eye" onClick={() => setShowPassword(prev => !prev)}>
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                    )}

                    <button type="submit" className="admin-login-btn">LOGIN</button>
                </form>
            </div>

            <ToastContainer position="top-center" autoClose={1200} closeButton={false} />
        </div>
    );
};

export default Login;
