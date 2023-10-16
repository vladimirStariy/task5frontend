import { configureStore } from "@reduxjs/toolkit";
import { personAPI } from "./services/person.service";

export const store = configureStore({
    reducer: {
        [personAPI.reducerPath]: personAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(personAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;