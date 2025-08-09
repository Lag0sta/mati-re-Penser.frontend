import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {     
            id: "",
    },
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        
        find: (state, action) => {
            action.payload = state.value
        },
    },
});

export const {
    find
} = commentSlice.actions;
export default commentSlice.reducer;
