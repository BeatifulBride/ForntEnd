import CompanyDressListCSS from './CompanyDressList.module.css'
import React, {Component, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import bride from "../../image/bride.png";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingDots from "../../pages/products/LoadingDots";
import {SyncLoader} from "react-spinners";

import {
    callDressListAPI
} from '../../apis/ProductAPICalls'

function  CompanyDressList() {

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

        ];

        useEffect(() => {
            setCurrentItems(dummyBrides.slice(0, 12));
        }, []);

        useEffect(() => {
            if(dressList && dressList.length > 0) {

                setCurrentItems(dressList.slice(0, 12));
            }
        }, [dressList]);


    const fetchMoreData = () => {
        // Use the total length of either dummyBrides or dressList, whichever is available
        const totalLength = dressList ? dressList.length : dummyBrides.length;

        if (currentItems.length >= totalLength) {
            setHasMore(false);
            return;
        }

        setTimeout(() => {
            // Use the slice of either dummyBrides or dressList, whichever is available
            const newDataSlice = dressList
                ? dressList.slice(currentItems.length, currentItems.length + 12)
                : dummyBrides.slice(currentItems.length, currentItems.length + 12);

            setCurrentItems(currentItems.concat(newDataSlice));
        }, 1500);
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
                loader={<div className="loader" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}>Loading...<SyncLoader/></div>}
                endMessage={<p style={{ textAlign: 'center' }}></p>}
                className={CompanyDressListCSS.container}
            >
                {currentItems.map((dressData, index) => (
                    <div key={index} className={CompanyDressListCSS.card}>
                        <img src={dressData.dressPath} alt={`Dress ${index}`} className={CompanyDressListCSS.image} />
                        <div className={CompanyDressListCSS.content}>
                            <div className={CompanyDressListCSS.info}>
                                <div className={CompanyDressListCSS.name}>{dressData.dressName}</div>
                                <div>Type: {dressData.dressType}</div>
                                <div>Company: {dressData.dressCompany}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </InfiniteScroll>

        </div>
    );


}

export default CompanyDressList;