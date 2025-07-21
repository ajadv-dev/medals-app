import {configureStore} from "@reduxjs/toolkit";
import {medalsService} from "@/services/medals/medalsService";

export const store = configureStore({
    reducer: {
        [medalsService.reducerPath]: medalsService.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(medalsService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
