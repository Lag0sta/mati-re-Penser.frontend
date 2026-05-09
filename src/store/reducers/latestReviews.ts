import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value: [{
        book: {},
        _id: "",
        name: "",
        title: "",
        text: "",
        rating: 0,
        creationDate: "",
    }],
};

const latestReviewsSlice = createSlice({
    name: "latestReviews",
    initialState,
    reducers: {
        getLatestReview: (state, action) => {
            state.value = action.payload;
        },

        addLatestReview: (state, action) => {
            state.value = [...state.value, action.payload];
        },

        deleteLatestReview: (state, action) => {
            const index = state.value.findIndex(t => t._id === action.payload);
            if (index !== -1) {
                state.value.splice(index, 1);
            }
        },

        archiveLatestReviews: (state) => {
            state.value = initialState.value
        }
    },
});

export const { getLatestReview, addLatestReview, deleteLatestReview, archiveLatestReviews } = latestReviewsSlice.actions;
export default latestReviewsSlice.reducer;
