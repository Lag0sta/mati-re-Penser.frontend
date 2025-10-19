import { createSlice } from "@reduxjs/toolkit";
import { text } from "stream/consumers";

const initialState = {
    value: {     
            text: "",
    },
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        toEdit: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const {
    toEdit
} = commentSlice.actions;
export default commentSlice.reducer;
