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

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        getReview: (state, action) => {
            state.value = action.payload;
        },

        addReview: (state, action) => {
            state.value = [...state.value, action.payload];
        },

        deleteReview: (state, action) => {
            const index = state.value.findIndex(t => t._id === action.payload);
            if (index !== -1) {
                state.value.splice(index, 1);
            }
        },

    },
});

export const { getReview, addReview, deleteReview } = reviewSlice.actions;
export default reviewSlice.reducer;
