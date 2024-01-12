import React, {useEffect} from 'react';
import styles from './TryonResult.module.css';
import { useNavigate } from "react-router-dom";



function TryonResult() {

    const navigate = useNavigate();

    const DressListHandle = () => {
        navigate("/dresslist");
    }

    const DressLikeListHandle = () => {
        navigate("/mypage")
    }

    return (
        <div>
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
