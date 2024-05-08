import { useState } from 'react';
import styles from './Header.module.scss'; // Import SCSS module

const Header = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    return (
        <header className={styles['header']}>
            <div className={styles['inner-header']}>
                <div className={styles['container-header']}>
                    <div className={styles['main-header']}>
                        <div className={styles['bars']} id="open" onClick={toggleMenu}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                            </svg>
                        </div>
                        <div className={styles['logo']}>
                            <a href="#">Latest News</a>
                        </div>
                        <nav className={`${styles['list-items']} ${isActive ? styles['active'] : ''}`}>
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/articles">Articles</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
