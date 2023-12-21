
import React from 'react';
import loading from './LoadingDots.module.css';

const LoadingDots = () => {
    return (

        <div className={loading.loadingdots}>
            <div className={loading.dot}></div>
            <div className={loading.dot}></div>
            <div className={loading.dot}></div>
        </div>
    );
};

export default LoadingDots;
