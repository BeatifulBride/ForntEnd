
import React, {Component, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import dresslist from "./DressList.module.css";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingDots from "../../pages/products/LoadingDots";

import {
    callDressListAPI
} from '../../apis/ProductAPICalls'
import {
    callDressLikeIndexAPI,
    callDressLikeAPI
} from "../../apis/MemberAPICalls";
import {MdFavorite, MdFavoriteBorder} from "react-icons/md";



function DressList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const dressInfo = useSelector(state => state.productReducer);
    const { data : dressList } = useSelector(state => state.productReducer)
    const likeDressIndex = useSelector(state => state.memberReducer);
    console.log("드레스리스트에 넘어오는 데이터 값은? : ", dressList)
    console.log("드레스인덱스에 넘어오는 데이터 값은? : ", likeDressIndex())

    const [heart, setHeart] = useState(false)
    const [dressLike, setDressLike] = useState([])
    const [currentItems, setCurrentItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchInitialData() {
            setLoading(true);
            await dispatch(callDressListAPI());
            await dispatch(callDressLikeIndexAPI());
            setLoading(false);
        }
        fetchInitialData();
    }, [dispatch]);


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
        dispatch(callDressLikeAPI(dressIndex)).then((responseText) => {
            if (responseText === "즐겨찾기에 추가 되었습니다.") {
                setHeart(true)
                alert(responseText)
            } else if (responseText === "즐겨찾기가 이미 있습니다.") {
                alert(responseText)
            } else {
                console.error('Unexpected response:' , responseText)
            }
        }).catch((error) => {
            console.error('Dress Like API call failed:', error)
            setHeart(current => current)
        });
    };

     useEffect(() => {
        dispatch(callDressListAPI());
    }, [dispatch]);

     useEffect(() => {
         dispatch(callDressLikeIndexAPI());
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
                                <div className={dresslist.heart} onClick={() => heartChange(dressData.dressIndex)}>
                                    {/*{heart ? <MdFavorite size="2.2em"/> : <MdFavoriteBorder size="2.2em"/>}*/}
                                    {likeDressIndex.includes(dressData.dressIndex) ? <MdFavorite size="2.2em" className={dresslist.activeHeart} /> : <MdFavoriteBorder size="2.2em"/>}
                                </div>

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
}

export default DressList;