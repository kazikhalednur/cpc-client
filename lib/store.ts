import { configureStore } from '@reduxjs/toolkit';
import { googleAuthApi } from './api/googleAuthApi';

export const store = configureStore({
    reducer: {
        [googleAuthApi.reducerPath]: googleAuthApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(googleAuthApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
