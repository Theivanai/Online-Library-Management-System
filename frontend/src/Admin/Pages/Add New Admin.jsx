// import React, { useState } from "react";
// import axios from "axios";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { toast, ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// // import { Link } from "react-router-dom";

// const AddAdmin = () => {
//     const [showpassword, setshowpassword] = useState(false);
//     const formik = useFormik({
//         initialValues: {
//             name: "",
//             email: "",
//             password: ""
//         },
//         validationSchema: Yup.object({
//             name: Yup.string()
//                 .matches(/^[A-Za-z ]+$/, "Name must contain only alphabets")
//                 .required("Name is required"),
//             email: Yup.string()
//                 .email("Invalid email address")
//                 .required("Email is required"),
//             password: Yup.string()
//                 .required('Required')
//                 .matches(/^[a-zA-Z0-9]+$/, 'Password must be alphanumeric')
//                 .min(6, 'Password must be at least 6 characters')
//                 .max(8, 'Password cannot be more than 8 characters')
//         }),
//         onSubmit: async (values, { resetForm }) => {
//             try {
//                 const response = await axios.post(`http://localhost:8000/api/admin/admin-register`, values,

//                 );
//                 toast.success("Admin added");



//                 resetForm();


//                 localStorage.setItem('token', response.data.token);
//             } catch (error) {
//                 if (error.response && error.response.status === 400) {
//                     toast.error("Email already exists!");
//                 } else {
//                     toast.error("Something went wrong!");
//                 }
//             }
//         }
//     });

//     return (
//         <div className="add_admin mt-5" style={{ width: '25%',marginLeft:'490px' }}>
//             <div className="bg-white p-4 rounded shadow">
//                 <h4 className="mb-4 text-center">Add Admin</h4>
//                 <form onSubmit={formik.handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="name" className="form-label">Name</label>
//                         <input
//                             type="text"
//                             className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} style={{ outline: 'none', boxShadow: 'none' }}
//                             id="name"
//                             name="name"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.name}
//                         />
//                         {formik.touched.name && formik.errors.name && (
//                             <div className="invalid-feedback">{formik.errors.name}</div>
//                         )}
//                     </div>

//                     <div className="mb-3">
//                         <label htmlFor="email" className="form-label">Email</label>
//                         <input
//                             type="email"
//                             className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`} style={{ outline: 'none', boxShadow: 'none' }}
//                             id="email"
//                             name="email"
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.email}
//                         />
//                         {formik.touched.email && formik.errors.email && (
//                             <div className="invalid-feedback">{formik.errors.email}</div>
//                         )}
//                     </div>

//                     <div className="mb-3 position-relative">
//                         <label htmlFor="password" className="form-label">Password</label>
//                         <input
//                             type={showpassword ? "text" : "password"}
//                             className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`} style={{ outline: 'none', boxShadow: 'none' }}
//                             id="password"
//                             name="password"
//                             maxLength={8}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             value={formik.values.password}
//                         />
//                         <span
//                             onClick={() =>
//                                 setshowpassword((prev) => !prev)
//                             }
//                             style={{
//                                 position: "absolute",
//                                 top: "62%",
//                                 transform: "translateY(-50%)",
//                                 right: "10px",
//                                 cursor: "pointer"
//                             }}>
//                             {showpassword ? <FaEye /> : <FaEyeSlash />}
//                         </span>
//                         {formik.touched.password && formik.errors.password && (
//                             <div className="invalid-feedback">{formik.errors.password}</div>
//                         )}
//                     </div>

//                     <button type="submit" className="btn btn-success w-100">Add</button>
//                 </form>

//                 {/* Reset password link */}
//                 {/* <div className="text-center mt-4">
//                     <Link to="/forgotpassword">Forgot Password</Link>
//                 </div> */}


//                 <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
//             </div>
//         </div>
//     );
// };

// export default AddAdmin;



import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddAdmin = () => {
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .matches(/^[A-Za-z ]+$/, "Name must contain only alphabets")
                .required("Name is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .required('Password is required')
                .matches(/^[a-zA-Z0-9]+$/, 'Password must be alphanumeric')
                .min(6, 'Minimum 6 characters')
                .max(8, 'Maximum 8 characters')
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await axios.post(`http://localhost:8000/api/admin/admin-register`, values);
                toast.success("Admin added successfully!");
                resetForm();
                localStorage.setItem('token', response.data.token);
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    toast.error("Email already exists!");
                } else {
                    toast.error("Something went wrong!");
                }
            }
        }
    });

    return (
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h4 className="mb-4 text-center text-primary">Add New Admin</h4>
                <form onSubmit={formik.handleSubmit} noValidate>
                    {/* Name */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} style={{ outline: 'none', boxShadow: 'none' }}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className="invalid-feedback">{formik.errors.name}</div>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`} style={{ outline: 'none', boxShadow: 'none' }}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="invalid-feedback">{formik.errors.email}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            maxLength={8}
                            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`} style={{ outline: 'none', boxShadow: 'none' }}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span
                            className="position-absolute top-50 end-0 translate-middle-y me-3"
                            style={{ cursor: 'pointer', outline: 'none', boxShadow: 'none' }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                        {formik.touched.password && formik.errors.password && (
                            <div className="invalid-feedback">{formik.errors.password}</div>
                        )}
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-primary w-100 fw-bold">ADD ADMIN</button>
                </form>

                <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
            </div>
        </div>
    );
};

export default AddAdmin;
