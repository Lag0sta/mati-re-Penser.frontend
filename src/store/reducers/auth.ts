import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: ""
};

const authTokenSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    save: (state,  action) => {
      state.value = action.payload
    },
    

    
    //Supprime le token d'authentification stock  dans le store.
    clearToken: (state) => {
        state.value = ""
    },
  },
});

export const {save, clearToken } = authTokenSlice.actions;
export default authTokenSlice.reducer;
