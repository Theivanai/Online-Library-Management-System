import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        purchasedBook: null,
        isBookPurchased: false,
        startDate: '',
        endDate: '',
        loading: false,
        error: null,
    },
    reducers: {
        checkBookStatusRequest: () => { },
        checkBookStatusSuccess: (state, action) => {
            const { purchased, startDate, endDate } = action.payload;
            state.isBookPurchased = purchased;
            state.startDate = startDate;
            state.endDate = endDate;
        },
        checkBookStatusFailure: (state, action) => {
            state.error = action.payload;
        },

        fakePaymentRequest: () => { },
        fakePaymentSuccess: () => { },
        fakePaymentFailure: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    checkBookStatusRequest,
    checkBookStatusSuccess,
    checkBookStatusFailure,
    fakePaymentRequest,
    fakePaymentSuccess,
    fakePaymentFailure,
} = paymentSlice.actions;

export default paymentSlice.reducer;