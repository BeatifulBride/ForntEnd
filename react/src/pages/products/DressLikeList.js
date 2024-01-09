import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {callDressListAPI} from "../../apis/ProductAPICalls";
import LoadingDots from "./LoadingDots";
import InfiniteScroll from "react-infinite-scroll-component";
import dresslist from "../../components/common/DressList.module.css";

const DressLikeList = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dressInfo = useSelector(state => state.productReducer);
    const dressList = dressInfo.data;

    const [currentItems, setCurrentItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        dispatch(callDressListAPI());
    }, [dispatch]);


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
