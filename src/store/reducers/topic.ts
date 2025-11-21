import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        id: "",
        title: "",
        description: "",
        isLocked: false,
        createdBy: { pseudo: "", avatar: "" },
        topicThread: [{
            id: "",
            text: "",
            quote: [""],
            createdBy: { pseudo: "", avatar: "" },
            creationDate: "",
            modificationDate: "",
            isNew: false,
        }],
    },
};

const topicSlice = createSlice({
    name: "topic",
    initialState,
    reducers: {
        get: (state, action) => {
            const discussion = action.payload.discussion;
            const sortedThreads = [...discussion.topicThread].sort((a, b) => 
        new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime()
        );
         state.value = {...discussion, topicThread: sortedThreads};
        },
        addThread: (state, action) => {
            // state.value.topicThread.push(action.payload);
            const updatedThreads = [...state.value.topicThread, action.payload];
            state.value.topicThread = updatedThreads.sort((a, b) => new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime())
        },

        editTopicInfo: (state, action) => {
            state.value.title = action.payload.title;
            state.value.description = action.payload.description;
        },

        editCommentInfo: (state, action) => {
            const { id, text} = action.payload; 
            const threadToUpdate = state.value.topicThread.find((t) => t.id === id)

            if(threadToUpdate){
                threadToUpdate.text = text
            }
        },

        lock: (state, action) => {
            state.value.isLocked = action.payload;
        },

        deleteC: (state, action) => {
            const { id } = action.payload;
            state.value.topicThread = state.value.topicThread.filter((t) => t.id !== id);
        }

        
    },
});

export const {
    get,
    addThread,
    editTopicInfo,
    editCommentInfo,
    lock,
    deleteC
} = topicSlice.actions;
export default topicSlice.reducer;
