import { combineReducers } from '@reduxjs/toolkit';
import adminReducer from './admin/adminSlice';  

const rootReducer = combineReducers({
  admin: adminReducer,  
});

export default rootReducer;
