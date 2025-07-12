import { combineReducers } from '@reduxjs/toolkit';
import UserbookReducer from '../src/User/Pages/Redux/Slices/myBooksSlice';
import UserHistoryPayment from '../src/User/Pages/Redux/Slices/historySlice';
import UserDataProfileDB from '../src/User/Pages/Redux/Slices/userSlice';
import AdminBookHistory from '../src/Redux/bookhistory/bookhistorySlice'
import Newadmin from '../src/Redux/admin/adminSlice'
import Userlists from '../src/Redux/user/userSlice'
import Booklists from '../src/Redux/book/bookSlice';
import AddBooks from '../src/Redux/book/bookSlice';
import AdminDashboard from '../src/Redux/admin/adminSlice'
import UserDashboard from '../src/User/Pages/Redux/Slices/userSlice'
import UserPayment from '../src/User/Pages/Redux/Slices/paymentSlice'
import userbooks from '../src/User/Pages/Redux/book/bookSlice'

const rootReducer = combineReducers({

    Userbooks: UserbookReducer,
    UserHistory: UserHistoryPayment,
    UserData: UserDataProfileDB,
    AdminHistory: AdminBookHistory,
    Newadmin: Newadmin,
    Userlists: Userlists,
    Booklists: Booklists,
    AddBooks:AddBooks,
    AdminDashboard:AdminDashboard,
    UserDashboard:UserDashboard,
    UserPayment:UserPayment,
    userbooks:userbooks,
    


});

export default rootReducer;


