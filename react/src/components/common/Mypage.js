import React, { useState } from 'react';
import ResultList from '../../pages/products/ResultList';
import DressLikeList from '../../pages/products/DressLikeList';
import ResultSaveList from '../../pages/products/ResultSaveList';
import styles from '../common/Mypage.module.css';

const Mypage = () => {
    const [page, setPage] = useState('mypage');

    return (
        <div className={styles.container}>
            <nav className={styles.navigation}>
                <button
                    className={page === 'mypage' ? styles.active : styles.button}
                    onClick={() => setPage('mypage')}
                >
                    저장목록
                </button>
                <button
                    className={page === 'mypage/dresslikelist' ? styles.active : styles.button}
                    onClick={() => setPage('mypage/dresslikelist')}
                >
                    좋아요 목록
                </button>

                <button
                    className={page === '/mypage/resultsavelist' ? styles.active : styles.button}
                    onClick={() => setPage('/mypage/resultsavelist')}
                >
                    결과물 저장 목록
                </button>
            </nav>
            <main className={styles.content}>
                {page === 'mypage' && <ResultList/>}
                {page === 'mypage/dresslikelist' && <DressLikeList/>}
                {page === 'mypage/resultsavelist' && <ResultSaveList/>}
            </main>
        </div>
    );
};

export default Mypage;
