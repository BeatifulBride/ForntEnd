import CompanyMypageCSS from './CompanyMypage.module.css'
import {useDaumPostcodePopup} from "react-daum-postcode";
import CompanyRegisterCSS from "../member/CompanyRegister.module.css";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Layout from "../../layouts/Layout";
import dress from "../member/DressSelectTop.module.css";
import {callDressSelectTopAPI} from "../../apis/ProductAPICalls";
import {Link} from "react-router-dom";
import {Icon} from "@iconify/react";
import { Navigate } from "react-router-dom";
import {NavLink, useNavigate} from 'react-router-dom';
function  CompanyMypage() {

    // 업체 정보를 가져오는 함수
    const accessToken = sessionStorage.getItem("accessToken");
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [companyPhone, setCompanyPhone] = useState('');
    const [dressAllRegistrationCount, setDressAllRegistrationCount] = useState('');
    const [latestUpload, setLatestUpload] = useState('');
    const [dressInfoIndex, setDressInfoIndex] = useState('');
    const [dressImagePath, setDressImagePath] = useState('');
    const [dressName, setDressName] = useState('');
    const [markCount, setMarkCount] = useState('');
    const [companyTop5DressList, setCompanyTop5DressList] = useState('');


    const info = () => {
        axios.post(
            'http://1.214.19.22:6900/com/mypage',
            {},
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        ).then((response) => {
            // HTTP 상태 코드가 200일 때 응답 데이터에서 정보를 추출합니다.
            if (response.status === 200) {
                const {
                    companyName,
                    companyAddress,
                    companyPhone,
                    dressAllRegistrationCount,
                    latestUpload

                } = response.data;
                setCompanyName(companyName);
                setCompanyAddress(companyAddress);
                setCompanyPhone(companyPhone);
                setDressAllRegistrationCount(dressAllRegistrationCount);

                console.log(companyName);

                // latestUpload에 대한 처리
                if (latestUpload) {
                    const {dressImagePath, dressName, dressInfoIndex, markCount} = latestUpload;
                    setDressImagePath(dressImagePath);
                    setDressName(dressName);
                    setMarkCount(markCount);
                    setLatestUpload(latestUpload);
                    setDressInfoIndex(dressInfoIndex);

                    console.log("Latest Upload Values:", {
                        dressImagePath,
                        dressName,
                        dressInfoIndex,
                        markCount
                    });
                }

                // companyTop5DressList에 대한 처리
                if (companyTop5DressList && companyTop5DressList.length > 0) {
                    const firstDress = companyTop5DressList[0];
                    const {dressImagePath, dressName, dressInfoIndex, markCount} = firstDress;

                    setDressImagePath(dressImagePath);
                    setDressName(dressName);
                    setMarkCount(markCount);
                    setLatestUpload(latestUpload);
                    setDressInfoIndex(dressInfoIndex);

                    console.log("First dress in companyTop5DressList:", {
                        dressImagePath,
                        dressName,
                        dressInfoIndex,
                        markCount
                    });
                }

                console.log("companyTop5DressList:", companyTop5DressList);
            }

        }).catch((error) => {
            // 에러 핸들링
            console.error("An error occurred:", error);
            alert('에러');
        });
    };

    useEffect(() => {
        info()
    }, []);


    // 변경 이벤트 핸들러
    const handleCompanyNameChange = (e) => {
        setCompanyName(e.target.value);
    };

    const handleCompanyAddressChange = (e) => {
        setCompanyAddress(e.target.value);
    };

    const handleCompanyPhoneChange = (e) => {
        setCompanyPhone(e.target.value);
    };

    const handlerChangeAllDress = (e) => {
        setDressAllRegistrationCount(e.target.value);
    }

    // 업체 주소 찾기
    //주소 api
    let scriptUrl;
    scriptUrl="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"

    //업체 상세 주소(daum api)
    const open = useDaumPostcodePopup(scriptUrl);

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }

        console.log(fullAddress);
        setCompanyAddress(fullAddress);

    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };


    const handlerChangeDressList = () =>{
        // navigate("/companyregister", { replace: true })
    }

    let imageUrl = `http://1.214.19.22:6900/${dressImagePath}`;


    const handleChangeInfo = () => {
        const formData = new FormData();
        formData.append('companyName', companyName);
        formData.append('companyAddress', companyAddress);
        formData.append('companyPhone', companyPhone);

        // axios를 사용하여 폼 데이터 전송
        axios.put(
            'http://1.214.19.22:6900/com/mypage/modify',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        )
            .then((response) => {
                // HTTP 상태 코드가 200일 때 응답 데이터에서 정보를 추출합니다.
                if (response.status === 200) {
                    console.log('수정 성공')
                    console.log("Company Name:", companyName);
                    console.log("Address:", companyAddress);
                    console.log("Phone Number:", companyPhone);



                }
            })
            .catch((error) => {
                // 에러 핸들링
                console.error("An error occurred:", error);
                alert('에러');
            });
    };


    /*내 상품 top5*/
    const [currentItems, setCurrentItems] = useState([])
    useEffect(() => {
        // 컴포넌트가 처음 마운트될 때 한 번만 실행
        info();
        // dressAllRegistrationCount();
    }, []); // 빈 배열은 컴포넌트가 처음 로드될 때만 실행


    return(
        <div className={CompanyMypageCSS.backgroundDiv}>
            {/*업체 환영*/}
            <div className={CompanyMypageCSS.companyDiv}>
                <input type='text' className={CompanyMypageCSS.name} value={companyName} onChange={handleCompanyNameChange}/> <span className={CompanyMypageCSS.a}>님 환영합니다.</span>
                <button className={CompanyMypageCSS.logout}>로그아웃</button>
                <Icon className={CompanyMypageCSS.icon_logout} icon="line-md:logout" />
            </div>
            {/*업체 정보 수정*/}
            <div className={CompanyMypageCSS.Info}>
                <div className={CompanyMypageCSS.Infos}>
                <h1 className={CompanyMypageCSS.infoh}>Edit business information</h1>
                <div className={CompanyMypageCSS.name2}>
                    <span className={CompanyMypageCSS.name3}>CompanyName : </span><input type="text" placeholder="업체명" value={companyName} onChange={handleCompanyNameChange} className={CompanyMypageCSS.name4}/>
                </div>
                <div className={CompanyMypageCSS.address}>
                    <span className={CompanyMypageCSS.address2}>Address : </span> <input type="text" placeholder="주소" value={companyAddress} onChange={handleCompanyAddressChange} className={CompanyMypageCSS.address3}/>
                    <button type='button' className={CompanyMypageCSS.address_btn} onClick={handleClick}>
                        주소찾기
                    </button>
                </div>
                <div className={CompanyMypageCSS.phonenumber}>
                    <sapn className={CompanyMypageCSS.phonenumber2}>PhoneNumber : </sapn><input type="text" placeholder="전화번호" value={companyPhone} onChange={handleCompanyPhoneChange} className={CompanyMypageCSS.phonenumber3}/>
                </div>
                <button className={CompanyMypageCSS.changeInfo_btn} onClick={handleChangeInfo} >sumbit</button>
                </div>
            </div>

            {/*최신 업로드*/}
            <div className={CompanyMypageCSS.Upload}>
                <h1 className={CompanyMypageCSS.upload_h}>Latest Upload</h1>
                <div className={CompanyMypageCSS.dressbox}>
                        <div key={dressInfoIndex} className={CompanyMypageCSS.brideContainerbest}>
                            <img className={CompanyMypageCSS.img} src={imageUrl} alt={`Dress ${dressInfoIndex}`}/>
                            <div className={CompanyMypageCSS.textContainertu}>
                                <div className={CompanyMypageCSS.b1}><b>Dress Name:<br/> {dressName}</b></div>
                                <div className={CompanyMypageCSS.b2}><b>markCount: {markCount}</b></div>
                                <div className={CompanyMypageCSS.b3}><b>DressInfoIndex: {dressInfoIndex}</b></div>
                                {/*<div><b>Type: {latestUpload.dressLine}</b></div>*/}
                            </div>
                        </div>
                </div>
                <div className={CompanyMypageCSS.all}>
                <h2 className={CompanyMypageCSS.allh}>Total Dress Registration Count  <input type="text" value={dressAllRegistrationCount} onChange={handlerChangeAllDress} className={CompanyMypageCSS.alldress} readOnly/></h2>
                <Link to="/companylist">
                    <button onClick={handlerChangeDressList} className={CompanyMypageCSS.list}>내 드레스 목록 보기</button>
                </Link>
                </div>
            </div>

            {/*내 상품 top5*/}
            <div className={CompanyMypageCSS.Top}>
                <h1 className={CompanyMypageCSS.Toph}>Top 5</h1>
                {currentItems.map((dressData, index) => (
                    <div key={index} className={CompanyMypageCSS.brideContainer}>
                        <img src={dressData.dressPath} alt={`Dress ${index}`}/>
                        <div className={CompanyMypageCSS.textContainer}>
                            <div><b>Dress Name: {dressData.dressName}</b></div>
                            <div><b>Type: {dressData.dressLine}</b></div>
                            <div><b>Company: {dressData.companyName}</b></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default CompanyMypage;