import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dress from '../member/DressSelectTop.module.css';
import {
    callDressSelectTopAPI
} from "../../apis/ProductAPICalls";
import {
    callDressLikeIndexAPI
} from "../../apis/MemberAPICalls";

function DressSelectTop() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dressSelectTop = useSelector(state => state.productReducer);
    const dreesSelectList = dressSelectTop.data
    console.log("dressSelectTop은?",dressSelectTop.data)

    const likedDresses = useSelector(state => state.memberReducer.likedDresses);
    console.log("likedDresses는 뭐야?", likedDresses)

    const [currentItems, setCurrentItems] = useState([])


    useEffect(() => {
        dispatch(callDressLikeIndexAPI());
    }, [dispatch]);

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

    /* tryon버튼 핸들러 */
    const onClickTryOnHandler = (dressData) => {
        const accessToken = window.sessionStorage.getItem('accessToken');
        if (accessToken) {
            const selectedDressWithLikeStatus = {
                ...dressData,
                isLiked: likedDresses[dressData.dressIndex] // 이 부분이 추가됩니다

            };
            navigate("/tryon", { state: { selectedDress: selectedDressWithLikeStatus } });
            console.log("이거는뭐야?",selectedDressWithLikeStatus)
        } else {
            navigate("/login");
        }
    };

    return(
        <div className={dress.back}>
            <div className={dress.best}>
                {currentItems.slice(0,1).map((dressData, index) => (
                    <div key={index} className={dress.brideContainerbest}>
                        <img src={`${process.env.REACT_APP_IMAGE_PATH_URL}/${dressData.dressImagePath}`} alt={`Dress ${index}`}/>
                        <div className={dress.textContainertu}>
                            <div><b>Dress Name: {dressData.dressName}</b></div>
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
                        <img src={dressData.dressImagePath} alt={`Dress ${index + 1}`}/>
                        <div className={dress.textContainer}>
                            <div><b>Dress Name: {dressData.dressName}</b></div>
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


