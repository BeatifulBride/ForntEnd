import React, {useEffect, useState} from 'react';
import styles from '../products/Tryon.module.css';
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';

import {
    callTryOnAPI
} from "../../apis/ProductAPICalls";
import {callDressLikeAPI} from "../../apis/MemberAPICalls";


function Tryon() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [heart, setHeart] = useState(false);

    const {selectedDress} = location.state || {};
    const dressData = location.state ? location.state.selectedDress : {};

    console.log("이거는 뭐야?", dressData)
    console.log("넘어오는 데이터 값은", JSON.stringify(selectedDress, null, 2));


    useEffect(() => {


    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleTryOn = () => {
        if (image && dressData) {
            dispatch(callTryOnAPI(image, dressData)).then(() => {
                navigate("/tryonresult");
            }).catch((error) => {
                console.error('Try-on API call failed:', error);
            });
        }
    };

    const heartChange = () => {
        if (dressData) {
            const { dressIndex } = dressData;

            dispatch(callDressLikeAPI(dressIndex)).then((responseText) => {

                if (responseText === "즐겨찾기에 추가 되었습니다.") {
                    setHeart(true);
                    alert(responseText);
                } else if (responseText === "즐겨찾기가 이미 있습니다.") {
                    alert(responseText);
                } else {
                    console.error('Unexpected response:', responseText);
                }
            }).catch((error) => {
                console.error('Dress Like API call failed:', error);
                setHeart(current => current);
            });
        }
    };




    return (
            <div className={styles.tryonWrapper}>
                <div className={`${styles.commonSectionStyle} ${styles.imageUploadSection}`}>
                    <div className={styles.imageContainer}
                         onClick={() => document.getElementById('file-input').click()}>
                        {previewUrl && <img src={previewUrl} alt="Uploaded" className={styles.imagePreview}/>}
                        {!previewUrl && <div className={styles.uploadPlaceholder}>사용자 전신 사진</div>}
                        <div className={styles.uploadButtonWrapper}>
                            <div className={styles.uploadButton}>+</div>
                        </div>
                    </div>
                    <input id="file-input" type="file" onChange={handleImageChange} style={{display: 'none'}}/>
                </div>

                <div className={styles.centerButton}>
                    <button className={styles.tryOnButton} onClick={handleTryOn}>Try-on</button>
                </div>


                <div className={`${styles.commonSectionStyle} ${styles.dressSection}`}>
                    <div className={styles.dressInfoSection}>
                        {dressData ? (
                            <>
                                <img src={dressData.dressPath} className={styles.dressImage}/>
                                <div className={styles.heart} onClick={heartChange}>
                                    {heart ? <MdFavorite size="2.2em"/> : <MdFavoriteBorder size="2.2em"/>}
                                </div>
                            </>
                        ) : (
                            <div className={styles.dressPlaceholder}>
                                <p>No dress data available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }


export default Tryon;
