// Search.tsx

import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { fetchNewsArticlesWithSearch} from "../../store/newsSlice.ts";
import {AppDispatch} from "../../store/store.ts";
import styles from "./Searc.module.scss";
import {fetchArticlesWithSearch} from "../../store/articleSlice.ts";

interface SearchProps {
    type: string;
}

const Search: React.FC<SearchProps> = ({type}) => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleSearch = () => {
        if(type === "NEWS"){
            dispatch(fetchNewsArticlesWithSearch(query));

        }else{
            dispatch(fetchArticlesWithSearch(query));
        }
    };
    useEffect(() => {
        handleSearch()
    }, [query])

    return (
        <div className={styles['search_container']}>
            <input
                type="text"
                placeholder="Search for news..."
                value={query}
                className={styles['search_input']}
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
    );
};

export default Search;
