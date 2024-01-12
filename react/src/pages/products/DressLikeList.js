import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LoadingDots from "./LoadingDots";
import InfiniteScroll from "react-infinite-scroll-component";
import dresslist from "../../components/common/DressList.module.css";
import LikeButton from "../../components/common/LikeButton";

import {
    callDressLikeListAPI
} from "../../apis/ProductAPICalls";
import {callDressLikeAPI} from "../../apis/MemberAPICalls";

const DressLikeList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const dressLikeInfo = useSelector(state => state.productReducer);
    console.log("dressLikeInfo는???", dressLikeInfo)
    const dressLikeList = dressLikeInfo.data;
    console.log("dressLikeList는???", dressLikeList)


    const [currentItems, setCurrentItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        dispatch(callDressLikeListAPI()).then(dressLikeList => {
            console.log("API에서 반환하는 값은?" ,dressLikeList)
            setCurrentItems(dressLikeList || []);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching liked dresses:', error);
            setLoading(false);
        });
    }, [dispatch]);


    useEffect(() => {
        if(dressLikeList && dressLikeList.length > 0) {
            setCurrentItems(dressLikeList.slice(0, 12));
        }
    }, [dressLikeList]);

    /* 무한스크롤 동작 */
    const fetchMoreData = () => {

        if (currentItems.length >= dressLikeList.length) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            setCurrentItems(currentItems.concat(dressLikeList.slice(currentItems.length, currentItems.length + 12)));
        }, 1500);
    };

    /* tryon버튼 핸들러 */
    const onClickTryOnHandler = (dressData) => {

        const accessToken = window.sessionStorage.getItem('accessToken');
        console.log(dressData)
        if (accessToken) {
            navigate("/tryon", { state: { selectedDress: dressData } });
        } else {
            navigate("/login");
        }
    };

    /* 즐겨찾기버튼 핸들러 */
    const heartChange = (dressIndex) => {

        dispatch(callDressLikeAPI(dressIndex)).then(() => {
            const updatedDressList = currentItems.filter(item => item.dressIndex !== dressIndex);
            setCurrentItems(updatedDressList);
        }).catch((error) => {
            console.error('Dress Like API call failed:', error);
        });
    };

    return (
        <div>
            {loading && <LoadingDots />}
            <InfiniteScroll
                dataLength={currentItems.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<div className="loader">Loading...</div>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                    </p>
                }
                className={dresslist.container}
            >
                {currentItems && currentItems.map((dressData, index) => (
                    <div key={index} className={dresslist.card}>
                        <img src={dressData.dressImagePath}  className={dresslist.image} />
                        <div className={dresslist.content}>
                            <div className={dresslist.info}>
                                <div className={dresslist.name}>{dressData.dressName}</div>
                                <div>Pirce: {dressData.dressPrice}</div>
                                <div>Address: {dressData.dressCompanyAddress}</div>
                                <div>Company: {dressData.dressCompanyName}</div>
                            </div>
                            <button
                                onClick={() => onClickTryOnHandler(dressData)}
                                className={dresslist.tryOnButton}
                            >
                                Try-on
                            </button>
                            <LikeButton
                                dressIndex={dressData.dressIndex}
                                isLiked={true}
                                onToggleLike={heartChange}
                            />
                        </div>

                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default DressLikeList;
