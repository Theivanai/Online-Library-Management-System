// import { configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
// import userReducer from "../Redux/Slices/userSlice.js";
// import userSaga from "../Redux/Saga/userSaga.js";



// const SagaMiddleware = createSagaMiddleware();

// const Store = configureStore({
//     reducer: {
//         user: userReducer, 
//     },
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({ thunk: false }).concat(SagaMiddleware),
// });

// SagaMiddleware.run(userSaga);

// export default Store;

// Store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../Redux/rootReducer'; 
import rootSaga from './Saga/rootSaga'; 

const sagaMiddleware = createSagaMiddleware();

const Store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default Store;
