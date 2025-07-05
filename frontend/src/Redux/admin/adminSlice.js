// 

// src/Redux/admin/adminSlice.js
import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        loading: false,
        error: null,
        stats: {},
        recentBooks: [],
        recentUsers: [],
    },
    reducers: {
        fetchDashboardRequest: (state) => {
            state.loading = true;
        },
        fetchDashboardSuccess: (state, action) => {
            state.loading = false;
            state.stats = action.payload.stats;
            state.recentBooks = action.payload.recentBooks;
            state.recentUsers = action.payload.recentUsers;
        },
        fetchDashboardFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Add Book
        addBookRequest: (state) => {
            state.loading = true;
        },
        addBookSuccess: (state) => {
            state.loading = false;
        },
        addBookFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchDashboardRequest, fetchDashboardSuccess, fetchDashboardFailure,
    addBookRequest, addBookSuccess, addBookFailure
} = adminSlice.actions;

export default adminSlice.reducer;
