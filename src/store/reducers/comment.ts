import { createSlice } from "@reduxjs/toolkit";
import { text } from "stream/consumers";

const initialState = {
    value: {     
            text: "",
            id: "",
            quote: [""],
    },
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        getComment: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const {
    getComment
} = commentSlice.actions;
export default commentSlice.reducer;
