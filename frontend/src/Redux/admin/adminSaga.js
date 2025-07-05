import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    fetchDashboardRequest,
    fetchDashboardSuccess,
    fetchDashboardFailure,
} from '../../Redux/admin/adminSlice';

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

export default function* adminSaga() {
    yield takeLatest(fetchDashboardRequest.type, fetchAdminDashboardSaga);
}
