import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { fetchBooksSuccess, fetchBooksFailure } from '../slices/bookSlice';

function* fetchBooksSaga() {
    try {
        const response = yield call(axios.get, 'http://localhost:8000/api/book/all');
        yield put(fetchBooksSuccess(response.data));
    } catch (error) {
        yield put(fetchBooksFailure(error.message));
    }
}

export default function* bookSaga() {
    yield takeLatest('books/fetchBooksRequest', fetchBooksSaga);
}
