import React, { useEffect } from 'react';
import SampleImage from "../../image/main3.png";
import styles from "./MainSampleImage.module.css"; // styles라는 이름으로 가져옴

function MainSampleImage() {
    useEffect(() => { // 컴포넌트가 마운트되었을 때 실행
        let observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add(styles.visible); // CSS 모듈의 클래스 이름을 사용
                }
            });
        }, {threshold: 0.1});

        const imgs = document.querySelectorAll(`.${styles['img-slide-in']}`); // CSS 모듈의 클래스 이름을 사용
        imgs.forEach(img => {
            observer.observe(img);
        });

        // Observer를 clean up하는 함수를 반환합니다.
        return () => {
            imgs.forEach(img => {
                observer.unobserve(img);
            });
        };
    }, []); // 빈 의존성 배열로 한 번만 실행되도록 함

    return(
        <div className={styles.back}> {/* CSS 모듈의 클래스 이름을 사용 */}
            <img src={SampleImage} className={`${styles['img-fade-in']} ${styles['img-slide-in']}`} width='1000px' height='600px' />
        </div>
    )
}

export default MainSampleImage;