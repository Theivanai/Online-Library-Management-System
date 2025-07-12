// import { call, put, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
// import { fetchUserInfo, setUserInfo, fetchIssuedBooks, setIssuedBooks, setLoading, setError } from '../Slices/userSlice';

// function* handleFetchUserInfo() {
//     try {
//         yield put(setLoading(true));
//         const { data } = yield call(() => axios.get(`http://localhost:8000/api/users/profile`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//         }));
//         yield put(setUserInfo(data));
//     } catch (err) {
//         yield put(setError('User info fetch failed'));
//     } finally {
//         yield put(setLoading(false));
//     }
// }

// function* handleFetchIssuedBooks() {
//     try {
//         yield put(setLoading(true));
//         const { data } = yield call(() => axios.get(`http://localhost:8000/api/book/user-issued`, {
//             headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }

//         }));
//         yield put(setIssuedBooks(data));

//     } catch (err) {
//         yield put(setError('Issued books fetch failed'));
//     } finally {
//         yield put(setLoading(false));
//     }
// }


// export default function* userSaga() {
//     yield takeLatest(fetchUserInfo.type, handleFetchUserInfo);
//     yield takeLatest(fetchIssuedBooks.type, handleFetchIssuedBooks);
// }



// import { call, put, takeLatest, all } from 'redux-saga/effects';
// import axios from 'axios';
// import {
//     fetchUserProfileRequest,
//     fetchUserProfileSuccess,
//     fetchUserProfileFailure,
//     fetchUserHistorySuccess,
//     fetchUserDashboardRequest,
//     fetchUserDashboardSuccess,
//     fetchUserDashboardFailure,
// } from '../Slices/userSlice';


// //worker saga
// function* fetchUserProfileAndHistory() {
//     try {
//         const token = localStorage.getItem('token');
//         const config = { headers: { Authorization: `Bearer ${token}` } };

//         //API call for profile
//         const profileResponse = yield call(axios.get, `http://localhost:8000/api/users/profile`, config);
//         yield put(fetchUserProfileSuccess(profileResponse.data));

//         //API call for history
//         const historyResponse = yield call(axios.get, `http://localhost:8000/api/users/history`, config);
//         yield put(fetchUserHistorySuccess(historyResponse.data));

//     } catch (error) {
//         yield put(fetchUserProfileFailure(error.message));
//     }
// }

// //worker saga for dashboard
// function* fetchUserDashboard() {
//     try {
//         const token = localStorage.getItem('token');
//         const config = { headers: { Authorization: `Bearer ${token}` } };

//         const [booksRes, purchasedRes, paymentsRes] = yield all([
//             call(axios.get, `http://localhost:8000/api/book/available`),
//             call(axios.get, `http://localhost:8000/api/mybooks/count`, config),
//             call(axios.get, `http://localhost:8000/api/payment/user-summary`, config),
//         ]);

//         const dashboardData = {
//             availableBooks: booksRes.data.availableBooks,
//             purchasedBooks: purchasedRes.data.purchasedBooks,
//             totalPayments: paymentsRes.data.totalPayments,
//             totalAmountPaid: paymentsRes.data.totalAmountPaid,
//         };

//         yield put(fetchUserDashboardSuccess(dashboardData));
//     } catch (error) {
//         yield put(fetchUserDashboardFailure(error.message));
//     }
// }



// //watcher saga
// function* watchFetchUserProfile() {
//     yield takeLatest(fetchUserProfileRequest.type, fetchUserProfileAndHistory);
// }

// function* watchFetchUserDashboard() {
//     yield takeLatest(fetchUserDashboardRequest.type, fetchUserDashboard);
// }

// // Root Saga 
// export default function* userSaga() {
//     yield all([
//         call(watchFetchUserProfile),
//         call(watchFetchUserDashboard),
//     ]);
// }



// import { call, put, takeLatest, all } from 'redux-saga/effects';
// import axios from 'axios';
// import {
//     // Profile & dashboard
//     fetchUserProfileRequest,
//     fetchUserProfileSuccess,
//     fetchUserProfileFailure,
//     fetchUserHistorySuccess,
//     fetchUserDashboardRequest,
//     fetchUserDashboardSuccess,
//     fetchUserDashboardFailure,

//     // Password Change
//     changePasswordRequest,
//     changePasswordSuccess,
//     changePasswordFailure,

//     //user login
//     loginRequest,
//     loginSuccess,
//     loginFailure
// } from '../Slices/userSlice';

// // Worker: Fetch profile + history
// function* fetchUserProfileAndHistory() {
//     try {
//         const token = localStorage.getItem('token');
//         const config = { headers: { Authorization: `Bearer ${token}` } };

//         const profileResponse = yield call(axios.get, `http://localhost:8000/api/users/profile`, config);
//         yield put(fetchUserProfileSuccess(profileResponse.data));

//         const historyResponse = yield call(axios.get, `http://localhost:8000/api/users/history`, config);
//         yield put(fetchUserHistorySuccess(historyResponse.data));

//     } catch (error) {
//         yield put(fetchUserProfileFailure(error.response?.data?.message || error.message));
//     }
// }

// // Worker: Fetch dashboard data
// function* fetchUserDashboard() {
//     try {
//         const token = localStorage.getItem('token');
//         const config = { headers: { Authorization: `Bearer ${token}` } };

//         const [booksRes, purchasedRes, paymentsRes] = yield all([
//             call(axios.get, `http://localhost:8000/api/book/available`),
//             call(axios.get, `http://localhost:8000/api/mybooks/count`, config),
//             call(axios.get, `http://localhost:8000/api/payment/user-summary`, config),
//         ]);

//         const dashboardData = {
//             availableBooks: booksRes.data.availableBooks,
//             purchasedBooks: purchasedRes.data.purchasedBooks,
//             totalPayments: paymentsRes.data.totalPayments,
//             totalAmountPaid: paymentsRes.data.totalAmountPaid,
//         };

//         yield put(fetchUserDashboardSuccess(dashboardData));
//     } catch (error) {
//         yield put(fetchUserDashboardFailure(error.response?.data?.message || error.message));
//     }
// }

// // Worker: Change password
// function* handleChangePassword(action) {
//     try {
//         const { currentPassword, newPassword } = action.payload;
//         const response = yield call(() =>
//             axios.put(
//                 'http://localhost:8000/api/users/change-password',
//                 { currentPassword, newPassword },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 }
//             )
//         );
//         yield put(changePasswordSuccess(response.data.message));
//     } catch (error) {
//         yield put(changePasswordFailure(error.response?.data?.message || 'Password update failed'));
//     }
// }


// //worker:user-login
// function* loginUserSaga(action) {
//     try {
//         const response = yield call(axios.post, 'http://localhost:8000/api/admin/user/login', {
//             ...action.payload,
//             role: 'user',
//         });

//         const { token, user, mustResetPassword } = response.data;

//         // Save to localStorage
//         localStorage.setItem('token', token);
//         localStorage.setItem('role', 'user');
//         localStorage.setItem('userData', JSON.stringify(user));

//         yield put(loginSuccess({ token, user, mustResetPassword }));
//     } catch (error) {
//         yield put(loginFailure(error.response?.data?.message || 'Login failed'));
//     }
// }


// // Watchers
// function* watchFetchUserProfile() {
//     yield takeLatest(fetchUserProfileRequest.type, fetchUserProfileAndHistory);
// }

// function* watchFetchUserDashboard() {
//     yield takeLatest(fetchUserDashboardRequest.type, fetchUserDashboard);
// }

// function* watchChangePassword() {
//     yield takeLatest(changePasswordRequest.type, handleChangePassword);
// }

// export function* watchUserLogin() {
//     yield takeLatest(loginRequest.type, loginUserSaga);
// }

// // Root Saga
// export default function* userSaga() {
//     yield all([
//         call(watchFetchUserProfile),
//         call(watchFetchUserDashboard),
//         call(watchChangePassword),
//     ]);
// }



import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import {
    // Profile & Dashboard
    fetchUserProfileRequest,
    fetchUserProfileSuccess,
    fetchUserProfileFailure,
    // fetchUserHistorySuccess,
    fetchUserDashboardRequest,
    fetchUserDashboardSuccess,
    fetchUserDashboardFailure,

    // Password Change
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFailure,

    // User Login
    loginRequest,
    loginSuccess,
    loginFailure
} from '../Slices/userSlice';


// =====================
// Worker: User Login
// =====================
function* loginUserSaga(action) {
    try {
        const response = yield call(axios.post, 'http://localhost:8000/api/admin/user/login', {
            ...action.payload,
            role: 'user',
        });

        const { token, user, mustResetPassword } = response.data;

        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', 'user');
        localStorage.setItem('userData', JSON.stringify(user));

        yield put(loginSuccess({ token, user, mustResetPassword }));
    } catch (error) {
        yield put(loginFailure(error.response?.data?.message || 'Login failed'));
    }
}


// ==============================
// Worker: Fetch Profile + History
// ==============================
function* fetchUserProfileAndHistory() {
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const profileResponse = yield call(axios.get, `http://localhost:8000/api/users/profile`, config);
        yield put(fetchUserProfileSuccess(profileResponse.data));

        // const historyResponse = yield call(axios.get, `http://localhost:8000/api/users/history`, config);
        // yield put(fetchUserHistorySuccess(historyResponse.data));

    } catch (error) {
        yield put(fetchUserProfileFailure(error.response?.data?.message || error.message));
    }
}


// =====================
// Worker: Fetch Dashboard
// =====================
function* fetchUserDashboard() {
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [booksRes, purchasedRes, paymentsRes] = yield all([
            call(axios.get, `http://localhost:8000/api/book/available`),
            call(axios.get, `http://localhost:8000/api/mybooks/count`, config),
            call(axios.get, `http://localhost:8000/api/payment/user-summary`, config),
        ]);

        const dashboardData = {
            availableBooks: booksRes.data.availableBooks,
            purchasedBooks: purchasedRes.data.purchasedBooks,
            totalPayments: paymentsRes.data.totalPayments,
            totalAmountPaid: paymentsRes.data.totalAmountPaid,
        };

        yield put(fetchUserDashboardSuccess(dashboardData));
    } catch (error) {
        yield put(fetchUserDashboardFailure(error.response?.data?.message || error.message));
    }
}


// ======================
// Worker: Change Password
// ======================
function* handleChangePassword(action) {
    try {
        const { currentPassword, newPassword } = action.payload;
        const response = yield call(() =>
            axios.put(
                'http://localhost:8000/api/users/change-password',
                { currentPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
        );
        yield put(changePasswordSuccess(response.data.message));
    } catch (error) {
        yield put(changePasswordFailure(error.response?.data?.message || 'Password update failed'));
    }
}


// ======================
// Watchers
// ======================
// function* watchUserLogin() {
//     yield takeLatest(loginRequest.type, loginUserSaga);
// }

// function* watchFetchUserProfile() {
//     yield takeLatest(fetchUserProfileRequest.type, fetchUserProfileAndHistory);
// }

// function* watchFetchUserDashboard() {
//     yield takeLatest(fetchUserDashboardRequest.type, fetchUserDashboard);
// }

// function* watchChangePassword() {
//     yield takeLatest(changePasswordRequest.type, handleChangePassword);
// }


// ======================
// Root Saga for User
// ======================
// export default function* userSaga() {
//     yield all([
//         call(watchUserLogin),
//         call(watchFetchUserProfile),
//         call(watchFetchUserDashboard),
//         call(watchChangePassword),
//     ]);
// }


export default function* userSaga() {
   yield takeLatest(loginRequest.type, loginUserSaga);
   yield takeLatest(fetchUserProfileRequest.type, fetchUserProfileAndHistory);
   yield takeLatest(fetchUserDashboardRequest.type, fetchUserDashboard);
   yield takeLatest(changePasswordRequest.type, handleChangePassword);
}
