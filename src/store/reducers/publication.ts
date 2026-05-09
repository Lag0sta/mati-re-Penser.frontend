import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    _id: "",
    titre: "",
    text: "",
    img: "",
    lien: "",
    creationDate: "",
    isArchived: false
  }
};

const publicationSlice = createSlice({
  name: "publication",
  initialState,
  reducers: {
    loadPublication: (state, action) => {
      state.value = action.payload
    }
    ,
    updatePublicationTxt: (state, action) => {
      const { text, titre } = action.payload;
      
        state.value.text = text
        state.value.titre = titre
    
  }
    ,
    updatePublicationImg: (state, action) => {
      const {  img } = action.payload;

      state.value.img = img
      
    },

    updatePublicationURL: (state, action) => {
      const { lien } = action.payload;

      state.value.lien = lien
      
    }
    ,
    deletePIV: (state) => {
      state.value = initialState.value
    }
  },

    
});

export const { loadPublication, updatePublicationTxt, updatePublicationImg, updatePublicationURL, deletePIV } = publicationSlice.actions;
export default publicationSlice.reducer;
