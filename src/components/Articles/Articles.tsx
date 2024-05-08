import React from 'react';
import styles from './ArticlesList.module.scss';
import {Article} from "../../store/articleSlice.ts";
import Search from "../Search/Search.tsx";

interface Props {
    articles: Article[];
}

const NewsList: React.FC<Props> = ({ articles }) => {
    const handleReadMore = (url: string) => {
        window.open(url, '_blank');
    };
    const renderArticlesByType = (type: string) => {
        const filteredArticles = articles.filter((article) => article.type === type);
        return filteredArticles.map((article: Article, index: number) => (
            <article onClick={() => handleReadMore(article.webUrl)} key={article.id || index} className={styles.card} style={{ backgroundColor: 'grey' }}>
                <div className={styles['card__content']}>
                    <div className={styles['card__content--container']}>
                        <h2 className={styles['card__title']}>{article.sectionName}</h2>
                        <p className={styles['card__description']}>{article.webTitle}</p>
                    </div>
                </div>
            </article>
        ));
    };

    return (
        <div className={styles['latest-news']}>
            <Search type={"articles"} />

            <h2 className={styles['latest-news__title']}>Latest News</h2>
            <div className={styles['latest-news__list']}>
                <div>
                    <h3>Live Blogs</h3>
                    {renderArticlesByType('liveblog')}
                </div>
                <div>
                    <h3>Articles</h3>
                    {renderArticlesByType('article')}
                </div>
            </div>
        </div>
    );
};

export default React.memo(NewsList);
