import CompanyDressReCSS from './CompanyDressRe.module.css'
import {useState} from "react";
function  CompanyDressRe() {

    /* 드레스 등록하기 */

    // 이미지 업로드
    const [frontImg, setFrontImg] = useState("");
    const [sideImg, setSideImg] = useState("");
    const [backImg, setBackImg] = useState("");

    const setPreviewImg = (event, setImageSetter) => {
        var reader = new FileReader();
        reader.onload = function (event) {
            setImageSetter(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    }



    return(
        <div className={CompanyDressReCSS.backgroundDiv}>
            {/* 이미지 등록 */}
            <div className={CompanyDressReCSS.regsterDiv}>
                <h1>이미지 등록 </h1>
                <div className={CompanyDressReCSS.frontDiv}>
                    <li> 드레스 앞 이미지</li>
                    {/* 이미지 업로드 */}
                    <input type="file" id="frontImage" accept="image/*"
                           style={{ border: "solid 1px lightgray", borderRadius: "5px" }}
                           onChange={(event) => setPreviewImg(event, setFrontImg)} />

                    {/* 이미지 미리보기 */}
                    <img alt="front" src={frontImg} style={{ maxWidth: "100px" }}></img>
                </div>
                <div className={CompanyDressReCSS.sideDiv}>
                    <li>드레스 옆 이미지</li>
                    {/* 이미지 업로드 */}
                    <input type="file" id="sideImage" accept="image/*"
                           style={{ border: "solid 1px lightgray", borderRadius: "5px" }}
                           onChange={(event) => setPreviewImg(event, setSideImg)} />

                    {/* 이미지 미리보기 */}
                    <img alt="side" src={sideImg} style={{ maxWidth: "100px" }}></img>
                </div>
                <div className={CompanyDressReCSS.backDiv}>
                    <li>드레스 뒤 이미지</li>
                    {/* 이미지 업로드 */}
                    <input type="file" id="backImage" accept="image/*"
                           style={{ border: "solid 1px lightgray", borderRadius: "5px" }}
                           onChange={(event) => setPreviewImg(event, setBackImg)} />

                    {/* 이미지 미리보기 */}
                    <img alt="back" src={backImg} style={{ maxWidth: "100px" }}></img>
                </div>
            </div>
            
            {/* 드레스 정보 등록 */}
            <div className={CompanyDressReCSS.infoDiv}>
                <div className={CompanyDressReCSS.nameDiv}>
                    드레스명 :
                    <input type="text" />
                </div>
                <div className={CompanyDressReCSS.numberDiv}>
                    드레스 품번 :
                    <input type="text" />
                </div>
                <div className={CompanyDressReCSS.designerDiv}>
                    디자이너 :
                    <input type="text" />
                </div>
                <div className={CompanyDressReCSS.priceDiv}>
                    가격 :
                    <input type="text" />
                </div>
            </div>
            {/* 상세 설명 등록 */}
            <div className={CompanyDressReCSS.detailDiv}>
                상세 설명 등록
                <input type="text"/>
            </div>
            
            {/* 등록하기*/}
            <div className={CompanyDressReCSS.btnDiv}>
                <button>등록하기</button>
            </div>
        </div>
    );

}

export default CompanyDressRe;