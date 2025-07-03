import { createSlice } from "@reduxjs/toolkit";
import { changeAvatar } from "../../utils/profilActions.js";


const initialState = {
    value: {
        title: "",
        description: "",
        createdBy: {pseudo: "", avatar: ""},
        topicThread: [{text: "",
        createdBy: {pseudo: "", avatar: ""},
        creationDate: "",
        }]
    },
};

const topicSlice = createSlice({
    name: "topic",
    initialState,
    reducers: {
        
        get : (state, action) => {
            state.value = action.payload.discussion;
        },
    },
});

export const {
    get
} = topicSlice.actions;
export default topicSlice.reducer;
