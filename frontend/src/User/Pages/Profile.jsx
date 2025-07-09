import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  fetchUserProfileRequest,
  changePasswordRequest,
} from './Redux/Slices/userSlice';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.UserData);
  const { profile: user, message, error } = userState;


  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfileRequest());
    // ✅ Dispatch Redux Toolkit action
  }, [dispatch]);

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    dispatch(changePasswordRequest({ currentPassword, newPassword })); // ✅ Dispatch Redux Toolkit action
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  if (!user || Object.keys(user).length === 0) return <p>Loading profile...</p>; // ✅ Handle empty profile safely

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
                    style={{
                      width: '70px', height: '80px',
                      objectFit: 'contain', border: 'none', borderRadius: '0%'
                    }}
                  />
                )}
                <p><b>Name:</b> {user.name}</p>
                <p><b>Email:</b> {user.email}</p>
              </div>

              <div className="col-md-7">
                {message && <p className="text-success">{message}</p>}
                {error && <p className="text-danger">{error}</p>}

                <div className="form-group position-relative">
                  <label><b>Current Password</b></label>
                  <input
                    type={showCurrent ? "text" : "password"}
                    className="form-control"
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
