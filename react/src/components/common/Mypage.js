import React, { useState } from 'react';
import ResultList from '../../pages/products/ResultList';
import DressLikeList from '../../pages/products/DressLikeList';
import ResultSaveList from '../../pages/products/ResultSaveList';
import styles from '../common/Mypage.module.css';

const Mypage = () => {
    const [page, setPage] = useState('mypage');

    return (
        <div >

            <main className={styles.content}>
                {page === 'mypage' && <DressLikeList/>}
            </main>
        </div>
    );
};

export default Mypage;
