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

const publicationsSlice = createSlice({
  name: "publications",
  initialState,
  reducers: {
    loadPublications: (state, action) => {
      state.value = action.payload
    },

    addPublications: (state, action) => {
      // state.value.topicThread.push(action.payload);
      const updatedPublication = [...state.value, action.payload];
      state.value = updatedPublication.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
    }
    ,
    updatePublicationsTxt: (state, action) => {
      const { _id, text, titre } = action.payload;
      const publicationToUpdate = state.value.find((t) => t._id === _id)

      if (publicationToUpdate) {
        publicationToUpdate.text = text
        publicationToUpdate.titre = titre
    }
  }
    ,
    updatePublicationsImg: (state, action) => {
      const { _id, img } = action.payload;
      const publicationToUpdate = state.value.find((t) => t._id === _id)

      if (publicationToUpdate) publicationToUpdate.img = img
      
    },

    updatePublicationsURL: (state, action) => {
      const { _id, lien } = action.payload;
      const publicationToUpdate = state.value.find((t) => t._id === _id)

      if (publicationToUpdate) publicationToUpdate.lien = lien
      
    }
    ,
    updateArchiveStatus: (state, action) => {
      const { _id, isArchived } = action.payload;
      console.log("action.payload", action.payload)
      const publicationToUpdate = state.value.find((t) => t._id === _id)
      console.log("publicationToUpdate", publicationToUpdate)
      if (publicationToUpdate) publicationToUpdate.isArchived = isArchived
    }
  },
});

export const { loadPublications, addPublications, updatePublicationsTxt, updatePublicationsImg, updatePublicationsURL, updateArchiveStatus } = publicationsSlice.actions;
export default publicationsSlice.reducer;
