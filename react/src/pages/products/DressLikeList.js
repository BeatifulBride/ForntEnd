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

import {ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES} from "../../modules/MemberModule";
const DressLikeList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dressInfo = useSelector(state => state.productReducer);
    console.log(dressInfo)
    const dressList = dressInfo.data;
    console.log("dressList는???", dressList)


    const [currentItems, setCurrentItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        dispatch(callDressLikeListAPI());
    }, [dispatch]);

    // useEffect(() => {
    //     setLoading(true);
    //     dispatch(callDressLikeListAPI()).then(response => {
    //         console.log(response)
    //         setCurrentItems(response.likedDresses || []);
    //         setLoading(false);
    //     }).catch(error => {
    //         console.error('Error fetching liked dresses:', error);
    //         setLoading(false);
    //     });
    // }, [dispatch]);

    useEffect(() => {
        if(dressList && dressList.length > 0) {
            setCurrentItems(dressList.slice(0, 12));
        }
    }, [dressList]);


    const fetchMoreData = () => {

        if (currentItems.length >= dressList.length) {
            setHasMore(false);
            return;
        }
        setTimeout(() => {
            setCurrentItems(currentItems.concat(dressList.slice(currentItems.length, currentItems.length + 12)));
        }, 1500);
    };

    const onClickTryOnHandler = (dressData) => {

        const accessToken = window.sessionStorage.getItem('accessToken');
        console.log(dressData)
        if (accessToken) {
            navigate("/tryon", { state: { selectedDress: dressData } });
        } else {
            navigate("/login");
        }
    };


    return (
        <div>
            {loading && <LoadingDots />}
            <InfiniteScroll
                dataLength={currentItems.length}
                // dataLength={currentItems ? currentItems.length : 0}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<div className="loader">Loading...</div>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                    </p>
                }
                className={dresslist.container}
            >
                {currentItems.map((dressData, index) => (
                    <div key={index} className={dresslist.card}>
                        <img src={dressData.dressPath} alt={`Dress ${index}`} className={dresslist.image} />
                        <div className={dresslist.content}>
                            <div className={dresslist.info}>
                                <div className={dresslist.name}>{dressData.dressName}</div>
                                <div>Type: {dressData.dressLine}</div>
                                <div>Company: {dressData.companyName}</div>
                            </div>
                            <button
                                onClick={() => onClickTryOnHandler(dressData)}
                                className={dresslist.tryOnButton}
                            >
                                Try-on
                            </button>
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default DressLikeList;
