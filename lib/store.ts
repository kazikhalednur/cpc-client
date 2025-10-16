import { configureStore } from '@reduxjs/toolkit';
import { googleAuthApi } from './api/googleAuthApi';
import { contestApi } from './api/contestApi';
import { achievementApi } from './api/achievementApi';
import { blogApi } from './api/blogApi';

export const store = configureStore({
    reducer: {
        [googleAuthApi.reducerPath]: googleAuthApi.reducer,
        [contestApi.reducerPath]: contestApi.reducer,
        [achievementApi.reducerPath]: achievementApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(googleAuthApi.middleware, contestApi.middleware, achievementApi.middleware, blogApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
