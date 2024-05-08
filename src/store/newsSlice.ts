import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { RootState } from "./store.ts";


export interface News {
    id: string;
    title: string;
    description: string;
    urlToImage: string;
    url: string;
}

interface NewsState {
    articles: News[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    searchQuery: string;
}

const initialState: NewsState = {
    articles: [],
    loading: false,
    error: null,
    currentPage: 0,
    searchQuery: ''
};

export const fetchNewsArticles = createAsyncThunk(
    'news/fetchNewsArticles',
    async (_, { getState, rejectWithValue, dispatch }) => {
        try {
            const state = getState() as RootState;
            const data = await fetchNewsFromNewsApi(state.news.currentPage, state.news.searchQuery);
            const nextPage = state.news.currentPage + 1;
            dispatch(setCurrentPage(nextPage));
            return data;
        } catch (error) {
            return rejectWithValue('Failed to fetch news articles');
        }
    }
);
export const fetchNewsArticlesWithSearch = createAsyncThunk(
    'news/fetchNewsArticles',
    async (searchQuery: string, { getState, rejectWithValue, dispatch }) => {
        try {
            if(searchQuery && searchQuery.length > 0){
                dispatch(setSearchQuery(searchQuery))
                dispatch(clearArticles());
                dispatch(setCurrentPage(1));
            }else{
                dispatch(setSearchQuery(""))
                dispatch(clearArticles());
                dispatch(setCurrentPage(0));
            }
            const state = getState() as RootState;
            const data = await fetchNewsFromNewsApi(state.news.currentPage, searchQuery);
            const nextPage = state.news.currentPage + 1;
            dispatch(setCurrentPage(nextPage));
            return data;
        } catch (error) {
            return rejectWithValue('Failed to fetch news articles');
        }
    }
);

const clearArticles = createAction('news/clearArticles');
const setCurrentPage = createAction<number>('news/setCurrentPage');
const setSearchQuery = createAction<string>('news/setSearchQuery');

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        clearArticles(state) {
            state.articles = [];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchNewsArticles.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNewsArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = [...state.articles , ...action.payload];
            })
            .addCase(fetchNewsArticles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update the state when the setCurrentPage action is dispatched
            .addCase(setCurrentPage, (state, action) => {
                state.currentPage = action.payload;
            })
            .addCase(setSearchQuery, (state, action) => {
                state.searchQuery = action.payload;
        });
    },
});

export const { reducer: newsReducer } = newsSlice;

async function fetchNewsFromNewsApi(page: number, searchQuery?: string) {
    let response
    if(searchQuery && searchQuery.length > 0) {
         response = await fetch(
            `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=c0d86f93faa84724a9328cd4c32b08d4&page=${page}&pageSize=10`
        );
    }else{
         response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=us&apiKey=c0d86f93faa84724a9328cd4c32b08d4&page=${page}&pageSize=10`
        );
    }
    const data = await response.json();
    return data.articles;
}
