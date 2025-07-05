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



import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import {
    fetchUserProfileRequest,
    fetchUserProfileSuccess,
    fetchUserProfileFailure,
    fetchUserHistorySuccess,
    fetchUserDashboardRequest,
    fetchUserDashboardSuccess,
    fetchUserDashboardFailure,
} from '../Slices/userSlice';


//worker saga
function* fetchUserProfileAndHistory() {
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        //API call for profile
        const profileResponse = yield call(axios.get, `http://localhost:8000/api/users/profile`, config);
        yield put(fetchUserProfileSuccess(profileResponse.data));

        //API call for history
        const historyResponse = yield call(axios.get, `http://localhost:8000/api/users/history`, config);
        yield put(fetchUserHistorySuccess(historyResponse.data));

    } catch (error) {
        yield put(fetchUserProfileFailure(error.message));
    }
}

//worker saga for dashboard
function* fetchUserDashboard() {
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [booksRes, purchasedRes, paymentsRes] = yield all([
            call(axios.get, 'http://localhost:8000/api/book/available'),
            call(axios.get, 'http://localhost:8000/api/mybooks/count', config),
            call(axios.get, 'http://localhost:8000/api/payment/user-summary', config),
        ]);

        const dashboardData = {
            availableBooks: booksRes.data.availableBooks,
            purchasedBooks: purchasedRes.data.purchasedBooks,
            totalPayments: paymentsRes.data.totalPayments,
            totalAmountPaid: paymentsRes.data.totalAmountPaid,
        };

        yield put(fetchUserDashboardSuccess(dashboardData));
    } catch (error) {
        yield put(fetchUserDashboardFailure(error.message));
    }
}



//watcher saga
function* watchFetchUserProfile() {
    yield takeLatest(fetchUserProfileRequest.type, fetchUserProfileAndHistory);
}

function* watchFetchUserDashboard() {
    yield takeLatest(fetchUserDashboardRequest.type, fetchUserDashboard);
}

// Root Saga 
export default function* userSaga() {
    yield all([
        call(watchFetchUserProfile),
        call(watchFetchUserDashboard),
    ]);
}