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
import axios from "axios";
import CompanyMypageCSS from "./CompanyMypage.module.css";

function  CompanyDressList() {
        const dressInfo = useSelector(state => state.productReducer);
        const dressList = dressInfo.data;
        const [dressInfoIndex, setDressInfoIndex] = useState('');
        const [dressImagePath, setDressImagePath] = useState('');
        const [dressName, setDressName] = useState('');
        const [markCount, setMarkCount] = useState('');

        const [currentItems, setCurrentItems] = useState([]);
        const [hasMore, setHasMore] = useState(true);
        const [loading, setLoading] = useState(false);
        const accessToken = sessionStorage.getItem("accessToken");

    const list = () => {
        axios.post(
            'http://1.214.19.22:6900/com/mypage',
            {},
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        ).then((response) => {
            // HTTP 상태 코드가 200일 때 응답 데이터에서 정보를 추출합니다.
            if (response.status === 200) {
                // companyAllDressList에 대한 처리
                const companyAllDressList = response.data.companyAllDressList; // 데이터에서 companyAllDressList를 가져옵니다.
                const { dressImagePath, dressName, dressInfoIndex, markCount } = companyAllDressList;

                if (companyAllDressList && companyAllDressList.length > 0) {
                    setCurrentItems(companyAllDressList); // 받아온 데이터를 currentItems에 설정

                    setDressImagePath(dressImagePath);
                    setDressName(dressName);
                    setMarkCount(markCount);
                    setDressInfoIndex(dressInfoIndex);


                    // 필요한 경우, 추가적인 정보 로깅
                    companyAllDressList.forEach((dress, i) => {
                        console.log(`Dress ${i + 1} in companyAllDressList:`, {
                            dressImagePath: dress.dressImagePath,
                            dressName: dress.dressName,
                            dressInfoIndex: dress.dressInfoIndex,
                            markCount: dress.markCount
                        });
                    });
                }

                console.log("companyAllDressList:", companyAllDressList);
            }

        }).catch((error) => {
            // 에러 핸들링
            console.error("An error occurred:", error);
            alert('에러');
        });
    };

    useEffect(() => {
        list()
    }, []);

    const fetchMoreData = () => {
        if (currentItems.length >= 100) { // Example condition to stop loading
            setHasMore(false);
            return;
        }
        // Simulate fetching data
        setLoading(true);
        setTimeout(() => {

            setLoading(false);
        }, 1500);
    };

    const imageUrl = `http://1.214.19.22:6900/${dressImagePath}`;

    const handleDelete = (dressIndex) => {
        const dressToDelete = currentItems[dressIndex];
        axios.delete(
            `http://1.214.19.22:6900/dress/del/${dressToDelete.dressInfoIndex}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        ).then(response => {
            if(response.status === 200) {
                // 드레스 삭제 후 상태 업데이트
                const updatedItems = currentItems.filter((item, index) => index !== dressIndex);
                setCurrentItems(updatedItems);
                console.log('삭제 성공 ', dressInfoIndex);
            }
        }).catch(error => {
            console.error("An error occurred:", error);
            alert('에러');
        });
    };




    return (
        <div>
            {loading && <LoadingDots />}
            <InfiniteScroll
                dataLength={currentItems.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<div className="loader" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}>Loading...<SyncLoader/></div>}
                endMessage={<p style={{ textAlign: 'center' }}>You have seen it all</p>}
                className={CompanyDressListCSS.container}
            >
                {currentItems.map((dressData, index) => {
                    // 각 드레스 카드에 대한 이미지 URL을 생성합니다.
                    const imageUrl = `http://1.214.19.22:6900/${dressData.dressImagePath}`;

                    return (
                        <div key={dressData.dressInfoIndex} className={CompanyDressListCSS.card}>
                            <img src={imageUrl} alt={`Dress ${dressData.dressInfoIndex}`} className={CompanyDressListCSS.image} />
                            <div className={CompanyDressListCSS.content}>
                                <div className={CompanyDressListCSS.info}>
                                    <div className={CompanyMypageCSS.b1}><b>Dress Name:<br/> {dressData.dressName}</b></div>
                                    <div className={CompanyMypageCSS.b2}><b>markCount: {dressData.markCount}</b></div>
                                    <div className={CompanyMypageCSS.b3}><b>DressInfoIndex: {dressData.dressInfoIndex}</b></div>
                                    <button onClick={() => handleDelete(index)}>삭제</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </InfiniteScroll>

        </div>
    );


}

export default CompanyDressList;