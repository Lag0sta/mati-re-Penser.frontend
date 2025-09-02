import { createSlice } from "@reduxjs/toolkit";
import { changeAvatar } from "../../utils/profilActions.js";


const initialState = {
    value: {
        id: "",
        email: "",
        avatar: "",
        pseudo: "",
        submits: []
    },
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.id = action.payload.id;
            state.value.email = action.payload.email;
            state.value.pseudo = action.payload.pseudo;
            state.value.avatar = action.payload.avatar;
        },

        update: (state, action) => {
            state.value.id = action.payload.id;
            state.value.email = action.payload.email;
            state.value.pseudo = action.payload.pseudo;
            state.value.avatar = action.payload.avatar;
        },

        logout: (state) => {
            state.value.id = "";
            state.value.email = "";
            state.value.pseudo = "";
            state.value.avatar = "";
        },
    },
});

export const {
    login,
    update,
    logout,
} = userSlice.actions;
export default userSlice.reducer;
