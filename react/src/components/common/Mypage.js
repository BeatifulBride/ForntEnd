import React, { useState } from 'react';
import Test1 from '../../pages/products/Test1';
import Test2 from '../../pages/products/Test2';
import Test3 from '../../pages/products/Test3';
import styles from '../common/Mypage.module.css';

const Mypage = () => {
    const [page, setPage] = useState('test1');

    return (
        <div className={styles.container}>
            <nav className={styles.navigation}>

                <button
                    className={page === 'test1' ? styles.active : styles.button}
                    onClick={() => setPage('test1')}
                >
                    저장목록
                </button>
                <button
                    className={page === 'test2' ? styles.active : styles.button}
                    onClick={() => setPage('test2')}
                >
                    좋아요 목록
                </button>

                <button
                    className={page === 'test3' ? styles.active : styles.button}
                    onClick={() => setPage('test3')}
                >
                    결과물 저장 목록
                </button>
            </nav>
            <main className={styles.content}>
                {page === 'test1' && <Test1/>}
                {page === 'test2' && <Test2/>}
                {page === 'test3' && <Test3/>}
            </main>
        </div>
    );
};

export default Mypage;
