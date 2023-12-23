import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dress from '../member/DressSelectTop.module.css';
import { useEffect } from "react";
import {callDressSelectTopAPI} from "../../apis/ProductAPICalls";


function DressSelectTop() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dressSelectTop = useSelector(state => state.productReducer);
    const dreesSelectList = dressSelectTop.data
    console.log(dressSelectTop.data)

    const [currentItems, setCurrentItems] = useState([])

    // Tryon하는 핸들러 (로그인 x 시 로그인 페이지로 이동)
    const onClickTryOnHandler = (dressData) => {
        const accessToken = window.sessionStorage.getItem('accessToken');
        console.log(dressData)
        if (accessToken) {
            navigate("/tryon", { state: { selectedDress: dressData } });
        } else {
            navigate("/login");
        }
    };


    useEffect(() => {
        dispatch(callDressSelectTopAPI());
    }, []);

    useEffect(() => {
        if(dreesSelectList && dreesSelectList.length > 0) {

            setCurrentItems(dreesSelectList);
        }
    }, [dreesSelectList]);

    return(
        <div>

            <div className={dress.container}>
                {currentItems.map((dressData, index) => (
                    <div key={index} className={dress.brideContainer}>
                        <img src={dressData.dressPath} alt={`Dress ${index}`}/>
                        <div className={dress.textContainer}>
                            <div><b>Dress Name: {dressData.dressName}</b></div>
                            {/*<div><b>Type: {dressData.dressType}</b></div>*/}
                            {/*<div><b>Company: {dressData.dressCompany}</b></div>*/}
                        </div>
                        <button onClick={() => onClickTryOnHandler(dressData)}>
                            Try-on
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DressSelectTop


