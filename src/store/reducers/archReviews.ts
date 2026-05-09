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

const archReviewsSlice = createSlice({
    name: "archReviews",
    initialState,
    reducers: {
        getArchReview: (state, action) => {
            state.value = action.payload;
        },

        addArchReview: (state, action) => {
            state.value = [...state.value, action.payload];
        },

        deleteArchReview: (state, action) => {
            const index = state.value.findIndex(t => t._id === action.payload);
            if (index !== -1) {
                state.value.splice(index, 1);
            }
        },

        unArchive: (state) => {
            state.value = initialState.value
        }
    },
});

export const { getArchReview, addArchReview, deleteArchReview, unArchive } = archReviewsSlice.actions;
export default archReviewsSlice.reducer;
