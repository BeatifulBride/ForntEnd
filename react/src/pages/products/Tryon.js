

import React, { useState } from 'react';
import Box from '../products/Tryon.module.css';
import { useLocation } from "react-router-dom";

function Tryon() {

    const [image, setImage] = useState(null); // 이미지 상태
    const [previewUrl, setPreviewUrl] = useState(''); // 미리보기 URL 상태

    // const location = useLocation();
    // const selectedDress = location.state?.selectedDress;

    // 이미지업로드 핸들러
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file)); // 파일을 위한 URL 생성
        }
    };



            {/*<div>*/}
            {/*    <h2>Selected Dress</h2>*/}
            {/*    <img src={selectedDress.imageUrl} alt="Selected Dress" />*/}
            {/*    <p><b>Dress Name:</b> {selectedDress.companyName}</p>*/}
            {/*    <p><b>Company:</b> {selectedDress.dressPNumber}</p>*/}
            {/*</div>*/}
    return (
        <div className={Box.imageUploadWrapper}>
            <div className={Box.imageContainer}>
                {previewUrl ? (
                    <img src={previewUrl} alt="Uploaded" className={Box.imagePreview}/>
                ) : (
                    <div className={Box.uploadButtonWrapper}>
                        <button className={Box.uploadButton} onClick={() => document.getElementById('file-input').click()}>
                            +
                        </button>
                    </div>
                )}
                <input id="file-input" type="file" onChange={handleImageChange} style={{display: 'none'}}/>
            </div>
        </div>
    );

}

export default Tryon