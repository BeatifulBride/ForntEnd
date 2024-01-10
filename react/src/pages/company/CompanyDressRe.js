import CompanyDressReCSS from './CompanyDressRe.module.css'
import {useState} from "react";
import axios from "axios";
import qs from 'qs';
function  CompanyDressRe() {

    /* 드레스 등록하기 */

    // 이미지 업로드
    const [dressName, setDressName] = useState('');
    const [dressPNumber, setDressPNumber] = useState('');
    const [designer, setDesigner] = useState('');
    const [dressPrice, setDressPrice] = useState('');
    const [dressExplanation, setDressExplanation] = useState('');

    const handlerChangeDressName = e => setDressName(e.target.value);
    const handlerChangeDressPNumber = e => setDressPNumber(e.target.value);
    const handlerChangeDesigner = e => setDesigner(e.target.value);
    const handlerChangeDressPrice = e => setDressPrice(e.target.value);
    const handlerChangeDressExplanation = e => setDressExplanation(e.target.value);

    const [front, setFront] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    const handleImageChange = (e) => {
        const fileF = e.target.files[0];
        if (fileF) {
            setFront(fileF);
            setPreviewUrl(URL.createObjectURL(fileF));
            console.log(fileF);
        }
    };

    const [side, setSide] = useState(null);
    const [previewUrlf, setPreviewUrlF] = useState('');

    const handleImageChangeSide = (e) => {
        const fileS = e.target.files[0];
        if (fileS) {
            setSide(fileS);
            setPreviewUrlF(URL.createObjectURL(fileS));
            console.log(fileS);
        }
    };

    const [back, setBack] = useState(null);
    const [previewUrls, setPreviewUrlS] = useState('');

    const handleImageChangeBack = (e) => {
        const fileB = e.target.files[0];
        if (fileB) {
            setBack(fileB);
            setPreviewUrlS(URL.createObjectURL(fileB));
            console.log(fileB);
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
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
            .then(response => {
                // 성공적으로 서버 응답을 받았을 때 수행할 작업
                console.log("Successfully uploaded the dress:", response.data);
            })
            .catch(error => {
                // 오류 처리
                console.error("Error uploading dress:", error);

                // 에러 상세 정보 로깅
                if (error.response) {
                    console.error("Server responded with:", error.response.data);
                } else if (error.request) {
                    console.error("No response received from server.");
                } else {
                    console.error("Error setting up the request:", error.message);
                }
            });
    };


        return(
        <div className={CompanyDressReCSS.backgroundDiv}>
            {/* 이미지 등록 */}
            <div className={CompanyDressReCSS.regsterDiv}>
                <h1>이미지 등록 </h1>
                <div className={CompanyDressReCSS.frontDiv}>
                    <li> 드레스 앞 이미지</li>
                    {/* 이미지 업로드 */}
                    <input type="file" id="fileF" accept="image/*"
                           style={{ border: "solid 1px lightgray", borderRadius: "5px" }}
                           onChange={handleImageChange} />

                    {/* 이미지 미리보기 */}
                    <img alt="front" src={front} style={{ maxWidth: "100px" }}></img>
                </div>
                <div className={CompanyDressReCSS.sideDiv}>
                    <li>드레스 옆 이미지</li>
                    {/* 이미지 업로드 */}
                    <input type="file" id="fileS" accept="image/*"
                           style={{ border: "solid 1px lightgray", borderRadius: "5px" }}
                           onChange={handleImageChangeSide} />

                    {/* 이미지 미리보기 */}
                    <img alt="side" src={side} style={{ maxWidth: "100px" }}></img>
                </div>
                <div className={CompanyDressReCSS.backDiv}>
                    <li>드레스 뒤 이미지</li>
                    {/* 이미지 업로드 */}
                    <input type="file" id="fileB" accept="image/*"
                           style={{ border: "solid 1px lightgray", borderRadius: "5px" }}
                           onChange={handleImageChangeBack} />

                    {/* 이미지 미리보기 */}
                    <img alt="back" src={back} style={{ maxWidth: "100px" }}></img>
                </div>
            </div>
            
            {/* 드레스 정보 등록 */}
            <div className={CompanyDressReCSS.infoDiv}>
                <div className={CompanyDressReCSS.nameDiv}>
                    드레스명 :
                    <input type="text" value={dressName} onChange={handlerChangeDressName}/>
                </div>
                <div className={CompanyDressReCSS.numberDiv}>
                    드레스 품번 :
                    <input type="text" value={dressPNumber} onChange={handlerChangeDressPNumber}/>
                </div>
                <div className={CompanyDressReCSS.designerDiv}>
                    디자이너 :
                    <input type="text" value={designer} onChange={handlerChangeDesigner}/>
                </div>
                <div className={CompanyDressReCSS.priceDiv}>
                    가격 :
                    <input type="text" value={dressPrice} onChange={handlerChangeDressPrice}/>
                </div>
            </div>
            {/* 상세 설명 등록 */}
            <div className={CompanyDressReCSS.detailDiv}>
                상세 설명 등록
                <input type="text" value={dressExplanation} onChange={handlerChangeDressExplanation}/>
            </div>
            
            {/* 등록하기*/}
            <div className={CompanyDressReCSS.btnDiv}>
                <button onClick={onChangeUpload}>등록하기</button>
            </div>
        </div>
    );

}

export default CompanyDressRe;