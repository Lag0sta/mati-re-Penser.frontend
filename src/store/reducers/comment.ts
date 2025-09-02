import { createSlice } from "@reduxjs/toolkit";
import { text } from "stream/consumers";

const initialState = {
    value: {     
            id: "",
            text: "",
    },
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        
        get: (state, action) => {
            action.payload = state.value
        },
    },
});

export const {
    get
} = commentSlice.actions;
export default commentSlice.reducer;
