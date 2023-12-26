import React, { useState } from 'react';
import ResultList from '../../pages/products/ResultList';
import DressLikeList from '../../pages/products/DressLikeList';
import ResultSaveList from '../../pages/products/ResultSaveList';
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
                {page === 'test1' && <ResultList/>}
                {page === 'test2' && <DressLikeList/>}
                {page === 'test3' && <ResultSaveList/>}
            </main>
        </div>
    );
};

export default Mypage;
