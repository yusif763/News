import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit';
import { RootState } from "./store.ts";

export interface Article {
    id: string;
    type: string;
    sectionId: string;
    sectionName: string;
    webPublicationDate: string;
    webTitle: string;
    webUrl: string
}

interface ArticlesState {
    articles: Article[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    searchQuery: string;

}

const initialState: ArticlesState = {
    articles: [],
    loading: false,
    error: null,
    currentPage: 1,
    searchQuery: "",

};

export const fetchArticles = createAsyncThunk(
    'articles/fetchArticles',
    async (_, { getState, rejectWithValue, dispatch }) => {
        try {
            const state = getState() as RootState;
            const data = await fetchArticlesFromNewsApi(state.articles.currentPage, state.articles.searchQuery);
            const nextPage = state.articles.currentPage + 1;
            dispatch(setCurrentPage(nextPage));
            return data;
        } catch (error) {
            return rejectWithValue('Failed to fetch articles');
        }
    }
);
export const fetchArticlesWithSearch = createAsyncThunk(
    'articles/fetchArticles',
    async (searchQuery: string, { getState, rejectWithValue, dispatch }) => {
        try {
            if(searchQuery && searchQuery.length > 0){
                dispatch(setSearchQuery(searchQuery))
                dispatch(clearArticles());
                dispatch(setCurrentPage(1));
            }else{
                dispatch(setSearchQuery(""))
                dispatch(clearArticles());
                dispatch(setCurrentPage(1));
            }
            const state = getState() as RootState;
            const data = await fetchArticlesFromNewsApi(state.articles.currentPage, searchQuery);
            const nextPage = state.articles.currentPage + 1;
            dispatch(setCurrentPage(nextPage));
            return data;
        } catch (error) {
            return rejectWithValue('Failed to fetch news articles');
        }
    }
);

const clearArticles = createAction('articles/clearArticles');
const setCurrentPage = createAction<number>('articles/setCurrentPage');
const setSearchQuery = createAction<string>('articles/setSearchQuery');

const ArticlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        clearArticles(state) {
            state.articles = [];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchArticles.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.loading = false;
                state.articles = [...state.articles , ...action.payload.response.results];
            })
            .addCase(fetchArticles.rejected, (state, action) => {
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

export const { reducer: articlesReducer } = ArticlesSlice;

async function fetchArticlesFromNewsApi(page: number, searchQuery?: string) {
    let response
    if(searchQuery && searchQuery.length > 0) {
        response = await fetch(
            `https://content.guardianapis.com/search?q=${searchQuery}&page=${page}&api-key=42d5c7dc-992d-40f9-af0f-cb393840459b`
        );
    }else{
        response = await fetch(
            `https://content.guardianapis.com/search?&page=${page}&api-key=42d5c7dc-992d-40f9-af0f-cb393840459b`
        );
    }
    const data = await response.json();
    return data;
}
