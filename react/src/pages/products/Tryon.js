import React, {useState} from 'react';
import Box from '../products/Tryon.module.css';
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";


function Tryon() {

    const [dispatch, setDispatch] = useDispatch
    const [image, setImage] = useState(null); // 이미지 상태
    const [previewUrl, setPreviewUrl] = useState(''); // 미리보기 URL 상태

    const location = useLocation();
    const selectedDress = location.state?.selectedDress;

    // const [form, setForm] = useState({
    //     memberId: token.sub,
    // });


    // 이미지업로드 핸들러
    const handleImageChangeHandler = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file)); // 파일을 위한 URL 생성
        }
    };

    return (
        <div className={Box.imageUploadWrapper}>
            <div className={Box.imageContainer} onClick={() => document.getElementById('file-input').click()}>
                {previewUrl && (
                    <img src={previewUrl} alt="Uploaded" className={Box.imagePreview}/>
                )}
                <div className={Box.uploadButtonWrapper}>
                    <div className={Box.uploadButton}>+</div>
                </div>
                <input id="file-input" type="file" onChange={handleImageChangeHandler} style={{display: 'none'}}/>
            </div>

            <div className={Box.centerButton}>
                <button>123</button>
            </div>
            <div className={Box.rightImageContainer}>
                <div>
                    <button>좋아용~~</button>
                </div>

            </div>


            {/*<div>*/}
            {/*   <h2>Selected Dress</h2>*/}

            {/*    <img src={selectedDress.imageUrl} alt="Selected Dress"/>*/}

            {/*   <p><b>Dress Name:</b> {selectedDress.companyName}</p>*/}

            {/*   <p><b>Company:</b> {selectedDress.dressPNumber}</p>*/}

            {/*</div>*/}
        </div>
    );

}

export default Tryon