// NewsList.tsx

import React from 'react';
import styles from './NewsList.module.scss';
import { News } from "../../store/newsSlice.ts";
import Search from "../Search/Search.tsx";

interface Props {
    articles: News[];
}

const NewsList: React.FC<Props> = ({ articles }) => {
    const handleReadMore = (url: string) => {
        window.open(url, '_blank');
    };
    return (
        <div className={styles['latest-news']}>
            <Search type={"NEWS"} />
            <h2 className={styles['latest-news__title']}>Latest News</h2>
            <div className={styles['latest-news__list']}>
                {articles.map((article: News, index: number) => (
                    article.urlToImage && (
                            <article key={article.id || index} className={styles.card}>
                                <img
                                    className={styles['card__background']}
                                    src={article?.urlToImage}
                                    alt="Photo of Cartagena's cathedral at the background and some colonial style houses"
                                    width="1920"
                                    height="2193"
                                />
                                <div className={styles['card__content']}>
                                    <div className={styles['card__content--container']}>
                                        <h2 className={styles['card__title']}>{article.title}</h2>
                                        <p className={styles['card__description']}>
                                            {article.description}
                                        </p>
                                    </div>
                                    <button className={styles['card__button']}
                                            onClick={() => handleReadMore(article.url)}>Read more</button>
                                </div>
                            </article>
                        )

                ))}
            </div>
        </div>
    );
};

export default React.memo(NewsList);
