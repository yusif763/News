import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ArtclesList from "../../components/Articles/Articles.tsx";
import {AppDispatch, RootState} from "../../store/store.ts";
import {fetchArticles} from "../../store/articleSlice.ts";

const ArticleMain: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const articles = useSelector((state: RootState) => state.articles.articles);
    const loading = useSelector((state: RootState) => state.articles.loading);

    const memoizedArticles = useMemo(() => articles, [articles]);

    useEffect(() => {
        dispatch(fetchArticles());
    }, [dispatch]);

    const handleScroll = useCallback(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
            dispatch(fetchArticles());
        }
    }, [dispatch, loading]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div>
            <ArtclesList articles={memoizedArticles} />
        </div>
    );
};

export default ArticleMain;
