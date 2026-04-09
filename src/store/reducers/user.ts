import { createSlice } from "@reduxjs/toolkit";
import { changeAvatarRequest } from "../../utils/profilActions.js";

const initialState = {
    value: {
        id: "",
        email: "",
        avatar: "",
        pseudo: "",
        submits: [],
        isAdmin: false
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.value.id = action.payload.id;
            state.value.email = action.payload.email;
            state.value.pseudo = action.payload.pseudo;
            state.value.avatar = action.payload.avatar;
            state.value.submits = action.payload.submits;
            state.value.isAdmin = action.payload.isAdmin;
        },

        updateUser: (state, action) => {
            state.value.id = action.payload.id;
            state.value.email = action.payload.email;
            state.value.pseudo = action.payload.pseudo;
            state.value.avatar = action.payload.avatar;
        },

        logoutUser: (state) => {
            state.value.id = "";
            state.value.email = "";
            state.value.pseudo = "";
            state.value.avatar = "";
            state.value.submits = [];
            state.value.isAdmin = false;
        },
    },
});

export const {loginUser, updateUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;
