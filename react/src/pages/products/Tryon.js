import React, { useState } from 'react';
import styles from '../products/Tryon.module.css';
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Bride from "../../components/image/Bride";

function Tryon() {

    // const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [liked, setLiked] = useState(false);
    const location = useLocation();
    const selectedDress = location.state?.selectedDress;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const toggleLike = () => {
        setLiked(!liked);
    };

    return (
        <div className={styles.tryonWrapper}>
            <div className={styles.imageUploadSection}>
                <div className={styles.imageContainer} onClick={() => document.getElementById('file-input').click()}>
                    {previewUrl && <img src={previewUrl} alt="Uploaded" className={styles.imagePreview} />}
                    {!previewUrl && <div className={styles.uploadPlaceholder}>사용자 전신 사진</div>}
                    <div className={styles.uploadButtonWrapper}>
                        <div className={styles.uploadButton}>+</div>
                    </div>
                </div>
                <input id="file-input" type="file" onChange={handleImageChange} style={{ display: 'none' }} />
            </div>

            <div className={styles.centerButton}>
                <button className={styles.tryOnButton}>Try-on</button>
            </div>

            <div className={styles.dressInfoSection}>
                <div className={styles.dressContainer}>
                    {selectedDress && (
                        <>
                            <img src={selectedDress.imageUrl || Bride} alt="Selected Dress" className={styles.dressImage} />
                            <button onClick={toggleLike} className={styles.likeButton}>
                                {liked ? '❤️' : '🤍'}
                            </button>
                        </>
                    )}
                    <div className={styles.dressDetails}>
                        {/* 드레스 정보 표시 */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tryon;
