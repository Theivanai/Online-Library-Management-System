import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    checkBookStatusRequest,
    checkBookStatusSuccess,
    checkBookStatusFailure,
    fakePaymentRequest,
    fakePaymentSuccess,
    fakePaymentFailure,
} from '../Slices/paymentSlice';

function* checkBookStatusSaga(action) {
    try {
        const { bookId, duration } = action.payload;
        const token = localStorage.getItem('token');
        const res = yield call(() =>
            axios.get(`http://localhost:8000/api/payment/book-status/${bookId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
        );

        if (res.data.purchased) {
            yield put(checkBookStatusSuccess({
                purchased: true,
                startDate: res.data.startDate,
                endDate: res.data.endDate
            }));
        } else {
            const now = new Date();
            const end = new Date(now.getTime() + parseInt(duration) * 86400000);
            yield put(checkBookStatusSuccess({
                purchased: false,
                startDate: now.toISOString(),
                endDate: end.toISOString()
            }));
        }

    } catch (err) {
        yield put(checkBookStatusFailure(err.message));
    }
}

function* fakePaymentSaga(action) {
    try {
        const {
            bookId, _id, duration, place, amountPaid, startDate, endDate
        } = action.payload;
        const token = localStorage.getItem("token");

        yield call(() =>
            axios.post("http://localhost:8000/api/payment/verify", {
                bookId,
                duration,
                place,
                amountPaid,
                startDate,
                endDate
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
        );

        yield call(() =>
            axios.put(`http://localhost:8000/api/payment/reduce-stock/${_id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            })
        );

        yield put(fakePaymentSuccess());
    } catch (err) {
        yield put(fakePaymentFailure(err.message));
    }
}

export function* watchPaymentSaga() {
    yield takeLatest(checkBookStatusRequest.type, checkBookStatusSaga);
    yield takeLatest(fakePaymentRequest.type, fakePaymentSaga);
}
