import { configureStore } from '@reduxjs/toolkit'
import { newsReducer} from "./newsSlice.ts";
import {articlesReducer} from "./articleSlice.ts";

export const store = configureStore({
    reducer: {
        news: newsReducer,
        articles: articlesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch