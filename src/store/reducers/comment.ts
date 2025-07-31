import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {     
            id: "",
            text: "",
            createdBy: { pseudo: "", avatar: "" },
            creationDate: "",
    },
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        
        addComment: (state, action) => {
            action.payload = state.value
        },

    },
});

export const {
    addComment
} = commentSlice.actions;
export default commentSlice.reducer;
