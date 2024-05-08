import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import NewsList from '../components/News/NewsList.tsx';
import { fetchNewsArticles } from '../store/newsSlice.ts';

const Main: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const articles = useSelector((state: RootState) => state.news.articles);
    const loading = useSelector((state: RootState) => state.news.loading);

    const memoizedArticles = useMemo(() => articles, [articles]);

    useEffect(() => {
        dispatch(fetchNewsArticles());
    }, [dispatch]);

    const handleScroll = useCallback(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
            dispatch(fetchNewsArticles());
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
            <NewsList articles={memoizedArticles} />
        </div>
    );
};

export default Main;
