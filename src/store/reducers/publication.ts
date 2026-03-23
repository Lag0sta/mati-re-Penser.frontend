import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value:[{_id: "",
          titre: "",
          text: "",
          img: "",
          avis: [{author: "", text: ""}],
          lien: "",
          creationDate: "",
          isArchived: false}]
};

const publicationSlice = createSlice({
  name: "publication",
  initialState,
  reducers: {
    loadPublication: (state,  action) => {
      state.value = action.payload
    },
    
    addPublication:(state, action) => {
      // state.value.topicThread.push(action.payload);
            const updatedPublication = [...state.value, action.payload];
            state.value = updatedPublication.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
    }
,
    updatePublication:(state, action) => {
       const { _id, text} = action.payload; 
            const publicationToUpdate = state.value.find((t) => t._id === _id)

            if(publicationToUpdate){
                publicationToUpdate.text = text
            }
    }

    
  },
});

export const { loadPublication, addPublication, updatePublication } = publicationSlice.actions;
export default publicationSlice.reducer;
