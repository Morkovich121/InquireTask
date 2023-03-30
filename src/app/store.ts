import { configureStore } from '@reduxjs/toolkit';

import postSlice from './slices/postSlice';
import commentSlice from './slices/commentSlice';

export const store = configureStore({
    reducer: {
        posts: postSlice,
        comments: commentSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch