// import { call, put, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
// import {
//     fetchDashboardRequest,
//     fetchDashboardSuccess,
//     fetchDashboardFailure,
// } from '../../Redux/admin/adminSlice';

// function* fetchAdminDashboardSaga() {
//     try {
//         const token = localStorage.getItem('token');
//         const response = yield call(axios.get, 'http://localhost:8000/api/dashboard/metrics', {
//             headers: { Authorization: `Bearer ${token}` },
//         });

//         const { stats, recentBooks, recentUsers } = response.data;
//         yield put(fetchDashboardSuccess({ stats, recentBooks, recentUsers }));
//     } catch (error) {
//         yield put(fetchDashboardFailure(error.message || 'Failed to fetch dashboard data'));
//     }
// }

// export default function* adminSaga() {
//     yield takeLatest(fetchDashboardRequest.type, fetchAdminDashboardSaga);
// }



import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import {
    fetchDashboardRequest,
    fetchDashboardSuccess,
    fetchDashboardFailure,
    registerAdminRequest,
    registerAdminSuccess,
    registerAdminFailure,
} from '../../Redux/admin/adminSlice';

// DASHBOARD METRICS SAGA
function* fetchAdminDashboardSaga() {
    try {
        const token = localStorage.getItem('token');
        const response = yield call(axios.get, 'http://localhost:8000/api/dashboard/metrics', {
            headers: { Authorization: `Bearer ${token}` },
        });

        const { stats, recentBooks, recentUsers } = response.data;
        yield put(fetchDashboardSuccess({ stats, recentBooks, recentUsers }));
    } catch (error) {
        yield put(fetchDashboardFailure(error.message || 'Failed to fetch dashboard data'));
    }
}

// ADMIN REGISTRATION SAGA
function* registerAdminSaga(action) {
    try {
        const response = yield call(axios.post, 'http://localhost:8000/api/admin/admin-register', action.payload);
        yield put(registerAdminSuccess());
        localStorage.setItem('token', response.data.token);
        toast.success('Admin added successfully!');
    } catch (error) {
        if (error.response && error.response.status === 400) {
            yield put(registerAdminFailure('Email already exists!'));
            toast.error('Email already exists!');
        } else {
            yield put(registerAdminFailure('Something went wrong!'));
            toast.error('Something went wrong!');
        }
    }
}

// ROOT ADMIN SAGA
export default function* adminSaga() {
    yield all([
        takeLatest(fetchDashboardRequest.type, fetchAdminDashboardSaga),
        takeLatest(registerAdminRequest.type, registerAdminSaga),
    ]);
}
