import React from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
    const basket = JSON.parse(localStorage.getItem('basket')) || [];
    const count = basket.reduce((a, b) => a + (b.count || 0), 0);

    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>
                logo
            </div>
            <div className={styles.links}>
                <a href="/">home</a>
                <a href="/dashboard">dashboard</a>
                <a href="/wishlist">wishlist</a>
                <a href="/basket">
                    basket
                    <div className={styles.count}>{count}</div>
                </a>
            </div>
        </div>
    );
};

export default Navbar;
