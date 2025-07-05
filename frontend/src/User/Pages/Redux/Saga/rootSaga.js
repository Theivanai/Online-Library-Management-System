import { all,call } from 'redux-saga/effects';
// import { watchFetchUserDashboard, watchFetchUserProfile } from './userSaga';

export default function* rootSaga() {
    yield all([
        watchFetchUserProfile(),
        watchFetchUserDashboard()
    ]);
}
