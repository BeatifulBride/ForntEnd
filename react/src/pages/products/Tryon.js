import React, { useState } from 'react';
import styles from '../products/Tryon.module.css';
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import {decodeJwt} from "../../utils/tokenUtils";
// import {callDressLikeAPI} from "../../apis/ProductAPICalls";

function Tryon() {

    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const location = useLocation();
    const token = decodeJwt(window.sessionStorage.getItem("accessToken"));

    const { selectedDress } = location.state || {};
    const dressData = selectedDress.dressData || {};
    console.log("넘어오는 데이터 값은", JSON.stringify(selectedDress, null, 2));


    // const [form, setForm] = useState({
    //     memberId: token.sub,
    //     dressImage: ''
    // })

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    return (
        <div className={styles.tryonWrapper}>

            <div className={styles.imageUploadSection}>
                <div className={styles.imageContainer} onClick={() => document.getElementById('file-input').click()}>
                    {previewUrl && <img src={previewUrl} alt="Uploaded" className={styles.imagePreview}/>}
                    {!previewUrl && <div className={styles.uploadPlaceholder}>사용자 전신 사진</div>}
                    <div className={styles.uploadButtonWrapper}>
                        <div className={styles.uploadButton}>+</div>
                    </div>
                </div>
                <input id="file-input" type="file" onChange={handleImageChange} style={{display: 'none'}}/>
            </div>

            <div className={styles.centerButton}>
                {/*API 미작성으로 인하여 버튼기능만 추가(추가 API 작성시 적용시켜야됨*/}
                <button className={styles.tryOnButton}>Try-on</button>
            </div>

            <div className={styles.dressSection}>


                <div className={styles.dressInfoSection}>
                    {dressData ? (
                        <img src={dressData.imageUrl} alt={`Dress: ${dressData.name}`} className={styles.dressImage}/>
                    ) : (
                        <div className={styles.dressPlaceholder}>
                            <p>No dress data available</p>
                        </div>
                    )}
                </div>

                <div className={styles.dressDetails}>
                    <p><b>Name:</b> {dressData.name}</p>
                    <p><b>Type:</b> {dressData.type}</p>
                    <p><b>Company:</b> {dressData.company}</p>
                </div>
            </div>

        </div>
    );
}

export default Tryon;
