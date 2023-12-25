import styles from './TryonResult.module.css';


function TryonResult() {
    return (
        <div>
            <div className={styles.card}>
                <div className={styles.imageSection}>
                    <img src="/path-to-dress-image.jpg" alt="Dress"/>
                </div>
                <div className={styles.detailsSection}>

                    <p>Brand</p>
                    <p>Style</p>
                    <p>예상 조건</p>
                    <p>드레스 예상가격 정보</p>
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <button className={styles.button}>관련 상품보기</button>
                <button className={styles.button}>나의 관심 상품</button>
                <button className={styles.button}>다른 드레스 탐색</button>
            </div>
        </div>
    )
}

export default TryonResult;
