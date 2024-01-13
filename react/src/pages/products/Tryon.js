import React, {useEffect, useState} from 'react';
import styles from '../products/Tryon.module.css';
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LikeButton from "../../components/common/LikeButton";

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

    const likedDresses = useSelector(state => state.memberReducer.likedDresses);
    console.log("likeDresses는? ", likedDresses)
    const isLiked = likedDresses && likedDresses[selectedDress.dressIndex]
    console.log("isLiked는?" , isLiked)


    console.log("dressData로 오는 이거는 뭐야?", dressData)
    console.log("넘어오는 데이터 값은", JSON.stringify(selectedDress, null, 2));

    useEffect(() => {

        if (selectedDress && likedDresses && selectedDress.dressIndex in likedDresses) {
            setHeart(likedDresses[selectedDress.dressIndex]);
        }
    }, [likedDresses, selectedDress]);

    useEffect(() => {

        if (selectedDress && 'isLiked' in selectedDress) {
            setHeart(selectedDress.isLiked);
        }
    }, [selectedDress]);


    /* 이미지 업로드 핸들러 */
    const handleImageChange = (e) => {

        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setImage(file);
                setPreviewUrl(URL.createObjectURL(file));
            } else {
                alert('업로드한 파일이 이미지가 아닙니다. 이미지 파일을 선택해주세요.');
            }
        }
    };

    /* tryon버튼 핸들러 */
    const handleTryOn = () => {
        if (image && dressData) {
            dispatch(callTryOnAPI(image, dressData)).then(() => {
                console.log(dressData)
                navigate("/tryonresult", {state : { dressData: dressData }});
            }).catch((error) => {
                console.error('Try-on API call failed:', error);
            });
        } else if(!image) {
            alert("사용자 이미지를 등록해주세요")
        }
    };

    /* 즐겨찾기버튼 핸들러 */
    const heartChange = () => {
        dispatch(callDressLikeAPI(selectedDress.dressIndex)).then(() => {
                console.log("여기는 뭐가나올까?", selectedDress.dressIndex)
            setHeart(currentHeart => !currentHeart);
        }).catch((error) => {
            console.error('Dress Like API call failed:', error);
        });
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
                    <LikeButton
                        dressIndex={selectedDress.dressIndex}
                        isLiked={heart}
                        onToggleLike={heartChange}
                    />

                    <div className={styles.dressInfoSection}>
                        {dressData ? (
                            <>
                                <img src={dressData.dressImagePath} className={styles.dressImage}/>
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
