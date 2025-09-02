import { configureStore } from '@reduxjs/toolkit';
import authToken from './reducers/auth.js';
import user from './reducers/user.js';
import topic from './reducers/topic.js';
import comment from './reducers/comment.js';

// Typage du store
export const store = configureStore({
  reducer: {authToken, user, topic, comment},
});

// Définition du type RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
