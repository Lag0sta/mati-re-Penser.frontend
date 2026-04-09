import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [{
    _id: "",
    titre: "",
    text: "",
    img: "",
    avis: [{ author: "", text: "" }],
    lien: "",
    creationDate: "",
    isArchived: false
  }]
};

const publicationSlice = createSlice({
  name: "publication",
  initialState,
  reducers: {
    loadPublication: (state, action) => {
      state.value = action.payload
    },

    addPublication: (state, action) => {
      // state.value.topicThread.push(action.payload);
      const updatedPublication = [...state.value, action.payload];
      state.value = updatedPublication.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
    }
    ,
    updatePublicationTxt: (state, action) => {
      const { _id, text, titre } = action.payload;
      const publicationToUpdate = state.value.find((t) => t._id === _id)

      if (publicationToUpdate) {
        publicationToUpdate.text = text
        publicationToUpdate.titre = titre
    }
  }
    ,
    updatePublicationImg: (state, action) => {
      const { _id, img } = action.payload;
      const publicationToUpdate = state.value.find((t) => t._id === _id)

      if (publicationToUpdate) publicationToUpdate.img = img
      
    }
    ,
    updateArchiveStatus: (state, action) => {
      const { _id, isArchived } = action.payload;
      const publicationToUpdate = state.value.find((t) => t._id === _id)

      if (publicationToUpdate) publicationToUpdate.isArchived = isArchived
    }
  },
});

export const { loadPublication, addPublication, updatePublicationTxt, updatePublicationImg, updateArchiveStatus } = publicationSlice.actions;
export default publicationSlice.reducer;
