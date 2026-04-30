import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        value: [],
};

const reviewIDSlice = createSlice({
    name: "reviewID",
    initialState,
    reducers: {
        getID: (state, action) => {
            state.value = action.payload;
        },

    },
});

export const { getID } = reviewIDSlice.actions;
export default reviewIDSlice.reducer;
