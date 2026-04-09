import { createSlice } from "@reduxjs/toolkit";
import { text } from "stream/consumers";
import { Review } from "../../types/reviewActions.js";

interface ReviewState {
  value: Review[];
}

const initialState: ReviewState = {
        value: [],
};

const reviewSlice = createSlice({
    name: "review",
    initialState,
    reducers: {
        getReview: (state, action) => {
            state.value = action.payload;
        },

    },
});

export const { getReview } = reviewSlice.actions;
export default reviewSlice.reducer;
