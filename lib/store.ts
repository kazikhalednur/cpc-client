import { configureStore } from '@reduxjs/toolkit';
import { googleAuthApi } from './api/googleAuthApi';
import { contestApi } from './api/contestApi';

export const store = configureStore({
    reducer: {
        [googleAuthApi.reducerPath]: googleAuthApi.reducer,
        [contestApi.reducerPath]: contestApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(googleAuthApi.middleware, contestApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
