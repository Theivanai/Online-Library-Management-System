import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(res => setUser(res.data))
      .catch(err => console.error('Failed to fetch profile:', err));
  }, []);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`http://localhost:8000/api/users/change-password`, {
        currentPassword,
        newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage(res.data.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setMessage(err.response?.data?.message || "Password update failed");
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-left">
        <div className="col-md-8">
          <div className="card shadow p-4">
            <div className="row">

              <div className="col-md-5 border-end">
                <h4 className='fw-bold text-primary'>PROFILE</h4>
                {user.profileImage && (
                  <img
                    src={`http://localhost:8000/uploads/${user.profileImage}`}
                    alt="Profile"
                    className="mt-1"
                    style={{ width: '80px', height: '80px', border: 'none', borderRadius: '0%' }}
                  />
                )}
                <p><b>Name:</b> {user.name}</p>
                <p><b>Email:</b> {user.email}</p>
              </div>


              <div className="col-md-7">
                {message && <p className="text-danger">{message}</p>}


                <div className="form-group position-relative">
                  <label><b>Current Password</b></label>
                  <input
                    type={showCurrent ? "text" : "password"}
                    className="form-control"
                    style={{ outline: 'none', boxShadow: "none" }}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <span
                    className="position-absolute"
                    style={{ top: '38px', right: '10px', cursor: 'pointer' }}
                    onClick={() => setShowCurrent(!showCurrent)}
                  >
                    {showCurrent ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>



                <div className="form-group mt-2 position-relative">
                  <label><b>New Password</b></label>
                  <input
                    type={showNew ? "text" : "password"}
                    className="form-control"
                    style={{ outline: 'none', boxShadow: "none" }}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span
                    className="position-absolute"
                    style={{ top: '38px', right: '10px', cursor: 'pointer' }}
                    onClick={() => setShowNew(!showNew)}
                  >
                    {showNew ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>


                <div className="form-group mt-2 position-relative">
                  <label><b>Confirm New Password</b></label>
                  <input
                    type={showConfirm ? "text" : "password"}
                    className="form-control"
                    style={{ outline: 'none', boxShadow: "none" }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    className="position-absolute"
                    style={{ top: '38px', right: '10px', cursor: 'pointer' }}
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>

                <button className="btn btn-success fw-bold mt-3" onClick={handlePasswordChange}>
                  UPDATE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
