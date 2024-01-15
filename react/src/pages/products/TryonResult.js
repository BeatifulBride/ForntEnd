import React, {useEffect} from 'react';
import styles from './TryonResult.module.css';
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";



function TryonResult() {

    const navigate = useNavigate();

    const tryOnResult = useSelector(state => state.productReducer.tryOnResult)

    const { state } = useLocation();
    const { dressData } = state || {};
    // console.log("dressData값은 잘 넘어오고 있나????", dressData)
    const DressListHandle = () => {
        navigate("/dresslist");
    }

    const DressLikeListHandle = () => {
        navigate("/mypage")
    }

    return (
        <div className={styles.main}>
                <div className={styles.card}>
                    {tryOnResult && <img src={tryOnResult} alt="Try On Image" />}
                </div>
                {/*<div>*/}
                {/*    {<p>{dressData.dressName}</p>}*/}
                {/*    {<p>{dressData.companyName}</p>}*/}
                {/*</div>*/}
                <div>
                    <div className={styles.buttonsContainer}>
                        <button className={styles.button} onClick={DressLikeListHandle}>나의 관심 상품</button>
                        <button className={styles.button} onClick={DressListHandle}>다른 드레스 탐색</button>
                    </div>
                </div>

        </div>
    )
}


export default TryonResult;
