import { configureStore } from '@reduxjs/toolkit';
import authToken from './reducers/auth.js';
import user from './reducers/user.js';
import topic from './reducers/topic.js';
import comment from './reducers/comment.js';
import publications from './reducers/publications.js'
import publication from './reducers/publication.js'
import latestReviews from './reducers/latestReviews.js'
import archReviews from './reducers/archReviews.js'
import reviewID from './reducers/reviews_id.js'

// Typage du store
export const store = configureStore({
  reducer: {authToken, user, topic, comment,publication, publications, latestReviews,archReviews, reviewID},
});

// Définition du type RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
