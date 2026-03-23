import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: ""
};

const authTokenSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    saveToken: (state,  action) => {
      state.value = action.payload
    },
    
    //Supprime le token d'authentification stock  dans le store.
    clearToken: (state) => {
        state.value = ""
    },
  },
});

export const {saveToken, clearToken } = authTokenSlice.actions;
export default authTokenSlice.reducer;
