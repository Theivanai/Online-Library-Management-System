// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     userinfo: null,
//     issuedBooks: [],
//     loading: false,
//     error: null
// };

// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         fetchUserInfo: () => { },
//         fetchIssuedBooks: () => { },
//         setUserInfo: (state, action) => { state.userinfo = action.payload },
//         setIssuedBooks: (state, action) => { state.issuedBooks = action.payload },
//         setLoading: (state, action) => { state.loading = action.payload },
//         setError: (state, action) => { state.error = action.payload },
//     }
// });

// export const {
//     fetchUserInfo,
//     fetchIssuedBooks,
//     setUserInfo,
//     setIssuedBooks,
//     setLoading,
//     setError
// } = userSlice.actions;

// export default userSlice.reducers;




import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profile: null,
    history: [],
    dashboard: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUserProfileRequest: (state) => {
            state.loading = true;
            // state.error = null;
        },
        fetchUserProfileSuccess: (state, action) => {
            state.profile = action.payload;
            state.loading = false;
        },
        fetchUserProfileFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        fetchUserHistorySuccess: (state, action) => {
            state.history = action.payload;
        },

        //dashboard actions
        fetchUserDashboardRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchUserDashboardSuccess: (state, action) => {
            state.dashboard = action.payload;
            state.loading = false;
        },
        fetchUserDashboardFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    fetchUserProfileRequest,
    fetchUserProfileSuccess,
    fetchUserProfileFailure,
    fetchUserHistorySuccess,
    fetchUserDashboardRequest,
    fetchUserDashboardSuccess,
    fetchUserDashboardFailure,
} = userSlice.actions;

export default userSlice.reducer;