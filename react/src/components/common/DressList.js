
import React, {Component, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import bride from "../../image/bride.png";
import dresslist from "./DressList.module.css";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingDots from "../../pages/products/LoadingDots";
import jwtDecode from "jwt-decode";

import {
    callDressListAPI
} from '../../apis/ProductAPICalls'


function DressList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dressInfo = useSelector(state => state.productReducer);
    const dressList = dressInfo.data;

    const [currentItems, setCurrentItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);


    const dummyBrides = [
        { name: 'Dress A', type: 'Type A', company: 'Company A', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress A', type: 'Type A', company: 'Company A', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress A', type: 'Type A', company: 'Company A', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress A', type: 'Type A', company: 'Company A', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },
        { name: 'Dress B', type: 'Type B', company: 'Company B', imageUrl: bride },

    ];

    useEffect(() => {
        dispatch(callDressListAPI)
    }, []);


    useEffect(() => {
        setCurrentItems(dummyBrides.slice(0, 12));
    }, []);


    const fetchMoreData = () => {
        if (currentItems.length >= dummyBrides.length) {
            setHasMore(false);
            return;
        }

        setTimeout(() => {
            setCurrentItems(currentItems.concat(dummyBrides.slice(currentItems.length, currentItems.length + 12)));
        }, 1500);
    };


    const onClickTryOnHandler = (dressData) => {
        console.log(dressData)
        const accessToken = window.sessionStorage.getItem('accessToken');
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
        <div className={loading ? dresslist.blur : ''}>
            {loading && <LoadingDots />}
            <InfiniteScroll
                dataLength={currentItems.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<div className="loader">Loading...</div>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
                className={dresslist.container}
            >
                {currentItems.map((dressData, index) => (
                    <div key={index} className={dresslist.card}>
                        <img src={dressData.imageUrl} alt={`Dress ${index}`} className={dresslist.image} />
                        <div className={dresslist.content}>
                            <div className={dresslist.info}>
                                <div className={dresslist.name}>{dressData.name}</div>
                                <div>Type: {dressData.type}</div>
                                <div>Company: {dressData.company}</div>
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
}

export default DressList;