import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dress from '../member/DressSelectTop.module.css';
import { useEffect } from "react";
import { callDressSelectAPI } from "../../apis/ProductAPICalls";

function DressSelectTop() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dressInfo = useSelector(state => state.productReducer);
    const dressList = dressInfo.data;


    const onClickTryOn = (dressData) => {
        navigate("/tryon", { state: { selectedDress: dressData } });
    };

    useEffect(() => {
        dispatch(callDressSelectAPI());
    }, [dispatch]);

    return(
        <div>
            <div className={dress.container}>
                {dressList && dressList.map((item, index) => (
                    <div key={index}>
                        <div className={dress.imageContainer}>
                            <img src={item.imageUrl} alt={`Dress ${index}`} />
                        </div>
                        <div className={dress.textContainer}>
                            <div><b>Dress Name: {item.companyName}</b></div>
                            <div><b>Company: {item.dressPNumber}</b></div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <button onClick={onClickTryOn}>Try-on</button>
            </div>
        </div>
    )
}

export default DressSelectTop;
