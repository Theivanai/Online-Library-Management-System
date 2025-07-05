import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userReducer from "../Redux/Slices/userSlice.js";
import userSaga from "../Redux/Saga/userSaga.js";



const SagaMiddleware = createSagaMiddleware();

const Store = configureStore({
    reducer: {
        user: userReducer, //combining user slice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(SagaMiddleware),
});

SagaMiddleware.run(userSaga);

export default Store;