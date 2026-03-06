import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value:[{titre: "",
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
    load: (state,  action) => {
      state.value = action.payload
    },
    
    update:(state, action) => {
      // state.value.topicThread.push(action.payload);
            const updatedPublication = [...state.value, action.payload];
            state.value = updatedPublication.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
    }

    
  },
});

export const { load, update } = publicationSlice.actions;
export default publicationSlice.reducer;
