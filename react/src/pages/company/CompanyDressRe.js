import CompanyDressReCSS from './CompanyDressRe.module.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import qs from 'qs';
import Footer from "../../components/common/Footer";
import CompanyMypageCSS from "./CompanyMypage.module.css";
import {Icon} from "@iconify/react";
import Swal from "sweetalert2";
function  CompanyDressRe() {

    /* 드레스 등록하기 */

    // 이미지 업로드
    const accessToken = sessionStorage.getItem("accessToken");
    const [dressName, setDressName] = useState('');
    const [dressPNumber, setDressPNumber] = useState('');
    const [designer, setDesigner] = useState('');
    const [dressPrice, setDressPrice] = useState('');
    const [dressExplanation, setDressExplanation] = useState('');
    const [companyName, setCompanyName] = useState('');

    const handlerChangeDressName = e => setDressName(e.target.value);
    const handlerChangeDressPNumber = e => setDressPNumber(e.target.value);
    const handlerChangeDesigner = e => setDesigner(e.target.value);
    const handlerChangeDressPrice = e => setDressPrice(e.target.value);
    const handlerChangeDressExplanation = e => setDressExplanation(e.target.value);

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
        });
    };

    useEffect(() => {
        info()
    }, []);

    const [front, setFront] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const handleImageChange = (e) => {
        const fileF = e.target.files[0];
        if (fileF) {
            setFront(fileF);
            setPreviewUrl(URL.createObjectURL(fileF));
        }
    };

    const [side, setSide] = useState(null);
    const [previewUrlS, setPreviewUrlS] = useState('');

    const handleImageChangeSide = (e) => {
        const fileS = e.target.files[0];
        if (fileS) {
            setSide(fileS);
            setPreviewUrlS(URL.createObjectURL(fileS));
        }
    };

    const [back, setBack] = useState(null);
    const [previewUrlB, setPreviewUrlB] = useState('');

    const handleImageChangeBack = (e) => {
        const fileB = e.target.files[0];
        if (fileB) {
            setBack(fileB);
            setPreviewUrlB(URL.createObjectURL(fileB));
        }
    };

    // 등록
    const onChangeUpload = () => {
        const formData = new FormData();
        formData.append('front', front);
        formData.append('side', side);
        formData.append('back', back);
        formData.append('dressName', dressName);
        formData.append('dressPNumber', dressPNumber);
        formData.append('designer', designer);
        formData.append('dressPrice', dressPrice);
        formData.append('dressExplanation', dressExplanation);

        axios.post(
            'http://1.214.19.22:6900/dress/newdress',
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
            .then(response => {
                // 성공적으로 서버 응답을 받았을 때 수행할 작업
                Swal.fire({
                    icon: "success",
                    title: "업로드 성공",
                    text: "드레스가 성공적으로 업로드되었습니다.",
                });
                // 성공 후 추가 작업 수행 가능
            })
            .catch(error => {
                // 오류 처리
                Swal.fire({
                    icon: "error",
                    title: "업로드 실패",
                    text: "드레스 업로드 중 오류가 발생했습니다.",
                });
            });
    };

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


        return(
        <div className={CompanyDressReCSS.backgroundDiv}>
            <div className={CompanyDressReCSS.companyDiv}>
                <input type='text' className={CompanyDressReCSS.name} value={companyName} onChange={handleCompanyNameChange}/> <span className={CompanyDressReCSS.a}>님 환영합니다.</span>
                <button className={CompanyDressReCSS.logout} onClick={handleLogout}>로그아웃</button>
                <Icon className={CompanyDressReCSS.icon_logout} icon="line-md:logout" />
            </div>
            {/* 이미지 등록 */}
            <div className={CompanyDressReCSS.regsterDiv}>
                <h1 className={CompanyDressReCSS.h1}>Dress Registration</h1>
                <h2 className={CompanyDressReCSS.h2}>Image</h2>
                <div className={CompanyDressReCSS.imagebox}>
                <div className={CompanyDressReCSS.frontDiv}>
                    <li className={CompanyDressReCSS.li1}>Front</li>
                    <div className={CompanyDressReCSS.front}>
                    {/* 이미지 미리보기 */}
                    <img alt="front" src={previewUrl} key={previewUrl} className={CompanyDressReCSS.imgfront} ></img>
                    </div>
                    {/* 이미지 업로드 */}
                    <input type="file" id="fileF" accept="image/*"
                           className={CompanyDressReCSS.nameInputimage}
                           onChange={handleImageChange} />

                </div>
                <div className={CompanyDressReCSS.sideDiv}>
                    <li className={CompanyDressReCSS.li2}>Side</li>
                    <div className={CompanyDressReCSS.side}>
                        {/* 이미지 미리보기 */}
                    <img alt="side" src={previewUrlS} key={previewUrlS} className={CompanyDressReCSS.imgside}></img>
                </div>
                    {/* 이미지 업로드 */}
                    <input type="file" id="fileS" accept="image/*"
                           className={CompanyDressReCSS.nameInputimages}
                           onChange={handleImageChangeSide} />
                </div>
                <div className={CompanyDressReCSS.backDiv}>
                    <li className={CompanyDressReCSS.li3}>Back</li>
                    <div className={CompanyDressReCSS.back}>
                        {/* 이미지 미리보기 */}
                        <img alt="back" src={previewUrlB} key={previewUrlB} className={CompanyDressReCSS.imgback}></img>
                    </div>
                    {/* 이미지 업로드 */}
                    <input type="file" id="fileB" accept="image/*"
                           className={CompanyDressReCSS.nameInputimageb}
                           onChange={handleImageChangeBack} />
                </div>
            </div>
            </div>
            
            {/* 드레스 정보 등록 */}
            <h2 className={CompanyDressReCSS.h2}>Dress Info</h2>
            <div className={CompanyDressReCSS.infoDiv}>
                <div className={CompanyDressReCSS.nameDiv}>
                    Dress Name :
                    <input type="text" className={CompanyDressReCSS.nameinput} value={dressName} onChange={handlerChangeDressName}/>
                </div>
                <div className={CompanyDressReCSS.numberDiv}>
                    Dress Number :
                    <input type="text" className={CompanyDressReCSS.numberinput} value={dressPNumber} onChange={handlerChangeDressPNumber}/>
                </div>
                <div className={CompanyDressReCSS.designerDiv}>
                    Designer :
                    <input type="text" className={CompanyDressReCSS.designerinput} value={designer} onChange={handlerChangeDesigner}/>
                </div>
                <div className={CompanyDressReCSS.priceDiv}>
                    Price :
                    <input type="text" className={CompanyDressReCSS.priceinput} value={dressPrice} onChange={handlerChangeDressPrice}/>
                </div>
            </div>
            {/* 상세 설명 등록 */}
            <div className={CompanyDressReCSS.detailDiv}>
                <h2 className={CompanyDressReCSS.h2}>Detail</h2>
                <input type="text" className={CompanyDressReCSS.inputDetail} value={dressExplanation} onChange={handlerChangeDressExplanation}/>
            </div>
            
            {/* 등록하기*/}
            <div className={CompanyDressReCSS.btnDiv}>
                <button className={CompanyDressReCSS.upload} onClick={onChangeUpload}>등록하기</button>
            </div>
            <Footer/>
        </div>
    );

}

export default CompanyDressRe;