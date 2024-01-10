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


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.brideContainer, .brideContainerbest');
        elements.forEach((el) => observer.observe(el));

        // 컴포넌트가 언마운트 될 때 observer를 정리합니다.
        return () => elements.forEach((el) => observer.unobserve(el));
    }, []);


    return(
        <div className={dress.back}>
            <div className={dress.best}>
                {currentItems.slice(0,1).map((dressData, index) => (
                    <div key={index} className={dress.brideContainerbest}>
                        <img src={dressData.dressPath} alt={`Dress ${index}`}/>
                        <div className={dress.textContainertu}>
                            <div><b>Dress Name: {dressData.dressName}</b></div>
                            <div><b>Type: {dressData.dressLine}</b></div>
                            <div><b>Company: {dressData.companyName}</b></div>
                        </div>
                        <button onClick={() => onClickTryOnHandler(dressData)}>
                            Try-on
                        </button>
                    </div>
                ))}
            </div>

            <div className={dress.container}>
                {currentItems.slice(1, 5).map((dressData, index) => (
                    <div key={index} className={dress.brideContainer}>
                        <img src={dressData.dressPath} alt={`Dress ${index + 1}`}/>
                        <div className={dress.textContainer}>
                            <div><b>Dress Name: {dressData.dressName}</b></div>
                            <div><b>Type: {dressData.dressLine}</b></div>
                            <div><b>Company: {dressData.companyName}</b></div>
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


