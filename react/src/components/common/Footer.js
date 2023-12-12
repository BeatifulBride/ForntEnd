import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.leftContent}>
                <h3>Beautiful Bride</h3>
                <p>"Imagine your wedding moment in advance.
                    With our virtual wedding dress fitting service, Beautiful Bride, don't just stop at imagining your wedding. Conveniently try on various designs and styles of wedding dresses virtually, and find your perfect dress. Make your beautiful moment even more special with Beautiful Bride, and take the first step towards the best wedding.
                    The beginning of a happy wedding, join us at Beautiful Bride."
                </p>
            </div>
            <div className={styles.rightContent}>
                <h3>ABOUT US</h3>
                <p>Address: 서울 서초구 서초대로77길 13<br/>
                    Contact: 010-xxxx-xxxx<br/>
                    Website: <a href="http://www.beautifulbride.com">www.beautifulbride.com</a>
                </p>
            </div>
        </div>
    );
};

export default Footer;
