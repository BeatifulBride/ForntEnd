import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dress from '../member/DressSelectTop.module.css';
import { useEffect } from "react";
// import { callDressSelectAPI } from "../../apis/ProductAPICalls";
import bride from "../../image/bride.png";


function DressSelectTop() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dressInfo = useSelector(state => state.productReducer);
    console.log(dressInfo)
    const dressList = dressInfo.data;




    const dummyBrides = [
        { name: 'Dress A', type: 'Type A', company: 'Company A', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },

    ];


    // Tryon하는 핸들러 (로그인 x 시 로그인 페이지로 이동)
    const onClickTryOnHandler = (dressData) => {

        const accessToken = window.sessionStorage.getItem('accessToken');

        if (accessToken) {
            navigate("/tryon", { state: { selectedDress: dressData } });
        } else {
            navigate("/login");
        }
    };

    // useEffect(() => {
    //     dispatch(callDressSelectAPI());
    // }, [dispatch]);

    return(
        <div>
            {/*<div className={dress.container}>*/}
            {/*    <Bride/>*/}
            {/*    {dressList && dressList.map((item, index) => (*/}
            {/*        <div key={index}>*/}
            {/*            <div className={dress.imageContainerImg}>*/}
            {/*                <img src={item.imageUrl} alt={`Dress ${index}`}/>*/}
            {/*            </div>*/}
            {/*            <div className={dress.textContainer}>*/}
            {/*                <div><b>Dress Name: {item.companyName}</b></div>*/}
            {/*                <div><b>Company: {item.dressPNumber}</b></div>*/}
            {/*            </div>*/}
            {/*            <div>셀렉</div>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*    <button onClick={onClickTryOnHandler}>Try-on</button>*/}
            {/*</div>*/}


            <div className={dress.container}>
                {dummyBrides.map((dressData, index) => (
                    <div key={index} className={dress.brideContainer}>
                        <img src={dressData.imageUrl} alt={`Dress ${index}`} width='150%' height={50}/>
                        <div className={dress.textContainer}>
                            <div><b>Dress Name: {dressData.name}</b></div>
                            <div><b>Type: {dressData.type}</b></div>
                            <div><b>Company: {dressData.company}</b></div>
                        </div>
                        <button onClick={() => onClickTryOnHandler({ dressData})}>
                            Try-on
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DressSelectTop


