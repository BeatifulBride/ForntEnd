import CompanyMypageCSS from './CompanyMypage.module.css'
import {useDaumPostcodePopup} from "react-daum-postcode";
import CompanyRegisterCSS from "../member/CompanyRegister.module.css";
import {useState} from "react";
import axios from "axios";
import Layout from "../../layouts/Layout";
function  CompanyMypage() {

    /*업체 정보 수정하기*/
    //dto 정의
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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
        setAddress(fullAddress);

    };

    const handleClick = () => {
        open({ onComplete: handleComplete });
    };

    const handlerChangeCompanyAddress = e => setAddress(e.target.value);

    const handlerChangeInfo = e => {
        axios.post(`http://{}/api/regist`,
            { companyName, phoneNumber, address})
            .then(response => {
                if (response.data) {
                    alert('정상적으로 수정되었습니다.');
                }
            })
            .catch(error => {
                console.log(error);
                alert('확인 후 다시 시도해주세요.' );
            });
    };



    /*최신 업로드*/

    //총 드레스 수량
    const [allDress, setAllDress] = useState('');

    const handlerChangeAllDress = (allDress) => {
        axios
            .get(`http://1.214.19.22:6900/api/dress`, { params: { allDress } })
            .then((response) => {
                if (response.data) {
                    console.log('드레스 수량', allDress);
                }
            })
            .catch((error) => {
                console.log(error);
                console.log('데이터가 없습니다.');
            });
    };


    /*내 상품 top5*/

    return(
        <div className={CompanyMypageCSS.backgroundDiv}>
            {/*업체 환영*/}
            <div className={CompanyMypageCSS.companyDiv}>
                <h1>업체 환영합니다.</h1>
            </div>

            {/*업체 정보 수정*/}
            <div className={CompanyMypageCSS.Info}>
                <h1>업체 정보</h1>
                <div className={CompanyMypageCSS.name}>
                    업체명 : <input type="text" placeholder="업체명" value={companyName}/>
                </div>
                <div className={CompanyMypageCSS.address}>`
                    주소 : <input type="text" placeholder="주소" value={address} onChange={handlerChangeCompanyAddress} />
                    <button type='button' className={CompanyMypageCSS.address_btn} onClick={handleClick}>
                        주소찾기
                    </button>
                </div>
                <div className={CompanyMypageCSS.phonenumber}>
                    전화번호 : <input type="text" placeholder="전화번호" value={phoneNumber}/>
                </div>
                <button className={CompanyMypageCSS.changeInfo_btn} onClick={handlerChangeInfo}>수정하기</button>
            </div>

            {/*최신 업로드*/}
            <div className={CompanyMypageCSS.Upload}>
                <h1>최신 업로드</h1>
                <h2>드레스 박스</h2>
                <h2>총 드레스 등록 수량 : <input type='text' value={allDress} onChange={handlerChangeAllDress} readOnly/>개</h2>
                <button>내 드레스 목록 보기</button>
            </div>

            {/*내 상품 top5*/}
            <div className={CompanyMypageCSS.Top}>
                <h1>내 상품  Top5</h1>
                <h2>드레스 박스 1</h2>
                <h2>드레스 박스 2</h2>
                <h2>드레스 박스 3</h2>
                <h2>드레스 박스 4</h2>
                <h2>드레스 박스 5</h2>
            </div>
        </div>
    );

}

export default CompanyMypage;