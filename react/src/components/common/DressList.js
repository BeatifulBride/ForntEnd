
import React, {Component, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import dresslist from "./DressList.module.css";
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingDots from "../../pages/products/LoadingDots";
import {ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES} from "../../modules/MemberModule";
import LikeButton from "../../components/common/LikeButton"

import {
    callDressListAPI
} from '../../apis/ProductAPICalls'
import {
    callDressLikeIndexAPI,
    callDressLikeAPI
} from "../../apis/MemberAPICalls";

function DressList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { data : dressList } = useSelector(state => state.productReducer)
    const likeDressIndex = useSelector(state => state.memberReducer);
    console.log("드레스리스트에 넘어오는 데이터 값은? : ", dressList)
    console.log("드레스인덱스에 넘어오는 데이터 값은? : ", likeDressIndex)

    const [heart, setHeart] = useState(false)
    const [dressLike, setDressLike] = useState([])
    const [currentItems, setCurrentItems] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [likedDresses, setLikedDresses] = useState({})

    useEffect(() => {
        async function fetchInitialData() {
            try {
                setLoading(true);
                await dispatch(callDressListAPI());
                const response = await dispatch(callDressLikeIndexAPI());
                setLoading(false);

                let initialLikes = {};
                response.forEach(index => {
                    initialLikes[index] = true;
                });
                setLikedDresses(initialLikes);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        }
        fetchInitialData();
    }, [dispatch]);


    useEffect(() => {
        if(dressList && dressList.length > 0) {
            setCurrentItems(dressList.slice(0, 12));
        }
    }, [dressList]);


    /* 무한스크롤 동작 */
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
            let newLikedDresses = { ...likedDresses };
            if (responseText === "즐겨찾기에 추가 되었습니다.") {
                newLikedDresses[dressIndex] = true;
                dispatch({ type: ADD_TO_FAVORITES, payload: dressIndex });
            } else if (responseText === "즐겨찾기가 취소 되었습니다.") {
                delete newLikedDresses[dressIndex];
                dispatch({ type: REMOVE_FROM_FAVORITES, payload: dressIndex });
            }
            setLikedDresses(newLikedDresses);
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
                {currentItems.map((dressData, index) => (
                    // <div key={index} className={dresslist.card}>
                    <div key={index} className={`${dresslist.card} ${dresslist.fadeInUp}`}>
                        <img src={`${process.env.REACT_APP_IMAGE_PATH_URL}/${dressData.dressImagePath}`}  className={dresslist.image} />
                        <div className={dresslist.content}>
                            <div className={dresslist.info}>
                                <div className={dresslist.name}>{dressData.dressName}</div>
                                <div>Company: {dressData.companyName}</div>
                            </div>
                            <button
                                onClick={() => onClickTryOnHandler(dressData)}
                                className={dresslist.tryOnButton}
                            >
                                Try-on
                            </button>
                            <LikeButton
                                dressIndex={dressData.dressIndex}
                                isLiked={likedDresses[dressData.dressIndex]}
                                onToggleLike={heartChange}
                            />
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}

export default DressList;