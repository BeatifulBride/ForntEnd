import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.leftContent}>
                <h3>Beautiful Bride</h3>
            </div>
            <div className={styles.rightContent}>
                <h3>ABOUT US</h3>
            </div>
        </div>
    );
};

export default Footer;
