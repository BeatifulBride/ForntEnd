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
import {Icon} from "@iconify/react";
import Footer from "../../components/common/Footer";
import Swal from "sweetalert2";

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

    const showAlert = () => {
        if (!accessToken) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "유효한 토큰값이 없습니다.",
                showConfirmButton: false,
                timer: 3000,
            }).then(() => {
                // 3초 후에 실행
                setTimeout(() => {
                    window.location.href = '/login'; // '/login'은 로그인 페이지 경로에 따라 수정
                });
            });
        } else {

        }
    };


    useEffect(() => {
        showAlert()
    }, []);


    const info = () => {
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
                const {
                    companyName,

                } = response.data;

                // Setting company information
                setCompanyName(companyName);


            }

        }).catch((error) => {
            // 에러 핸들링
            // alert('에러');
        });
    };

    useEffect(() => {
        info()
    }, []);

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
                }

            }

        }).catch((error) => {
            // 에러 핸들링
            // alert('에러');
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
        Swal.fire({
            title: "삭제하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!",
        }).then((result) => {
            if (result.isConfirmed) {
                // SweetAlert2에서 확인 버튼을 눌렀을 때 삭제 로직 실행
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
                    if (response.status === 200) {
                        // 드레스 삭제 후 상태 업데이트
                        const updatedItems = currentItems.filter((item, index) => index !== dressIndex);
                        setCurrentItems(updatedItems);
                        Swal.fire(
                            "삭제에 성공하였습니다.",
                            "success"
                        );
                    }
                }).catch(error => {
                    Swal.fire("에러", "삭제에 실패하였습니다.", "error");
                });
            } else {
                // SweetAlert2에서 취소 버튼을 눌렀을 때의 동작
                Swal.fire("취소되었습니다.", "Your imaginary file is safe :)", "info");
            }
        });
    };

    const [companyName, setCompanyName] = useState('');

    const handleCompanyNameChange = (e) => {
        setCompanyName(e.target.value);
    };

    const handleLogout = () => {
        Swal.fire({
            title: "로그아웃 하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes!",
            cancelButtonText: "No!",
        })
            .then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        "메인화면으로 돌아갑니다.",
                        "로그아웃에 성공하였습니다.",
                        "success"
                    );
                    // 로그아웃 처리 및 기타 작업 수행
                    sessionStorage.clear();
                    window.location.href = '/'; // 메인 페이지로 이동
                } else {
                    Swal.fire("취소되었습니다.", "Your imaginary file is safe :)", "info");
                }
            });
    };




    return (
        <div className={CompanyDressListCSS.background}>
            {/*업체 환영*/}
            <div className={CompanyDressListCSS.companyDiv}>
                <input type='text' className={CompanyDressListCSS.name} value={companyName} onChange={handleCompanyNameChange}/> <span className={CompanyDressListCSS.a}>님 환영합니다.</span>
                <button className={CompanyDressListCSS.logout} onClick={handleLogout}>로그아웃</button>
                <Icon className={CompanyDressListCSS.icon_logout} icon="line-md:logout" />
            </div>
            <div className={CompanyDressListCSS.list}>
            {loading && <LoadingDots />}
            <InfiniteScroll
                dataLength={currentItems.length}
                next={fetchMoreData}
                hasMore={hasMore}
                // loader={<div className="loader" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '9999' }}>Loading...<SyncLoader/></div>}
                endMessage={<p style={{ textAlign: 'center' }}>You have seen it all</p>}
                className={CompanyDressListCSS.container}
            >
                <h1 className={CompanyDressListCSS.h1}>My Dress List</h1>
                {currentItems.map((dressData, index) => {
                    // 각 드레스 카드에 대한 이미지 URL을 생성합니다.
                    const imageUrl = `http://1.214.19.22:6900/${dressData.dressImagePath}`;

                    return (
                        <div className={CompanyDressListCSS.dressList}>
                        <div key={dressData.dressInfoIndex} className={CompanyDressListCSS.card}>
                            <img src={imageUrl} alt={`Dress ${dressData.dressInfoIndex}`} className={CompanyDressListCSS.image} />
                            <div className={CompanyDressListCSS.content}>
                                <div className={CompanyDressListCSS.info}>
                                    <div className={CompanyMypageCSS.b1}><b>Dress Name:<br/> {dressData.dressName}</b></div>
                                    <div className={CompanyMypageCSS.b2}><b>markCount: {dressData.markCount}</b></div>
                                    <div className={CompanyMypageCSS.b3}><b>DressInfoIndex: {dressData.dressInfoIndex}</b></div>
                                    <button className={CompanyDressListCSS.delete} onClick={() => handleDelete(index)}>삭제</button>
                                </div>
                            </div>
                        </div>
                        </div>
                    );
                })}

            </InfiniteScroll>
            </div>

            <Footer />
        </div>
    );


}

export default CompanyDressList;