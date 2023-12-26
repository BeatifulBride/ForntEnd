// import React from 'react';
// import { useSelector } from 'react-redux';
// import styles from './TryonResult.module.css';
// import { useNavigate } from "react-router-dom";
//
// function TryonResult() {
//
//     const navigate = useNavigate();
//     const tryonResult = useSelector(state => state.product.tryOnResult);
//
//     const DressListHandle = () => {
//         navigate("/dresslist");
//     }
//
//     return (
//         <div>
//             <div className={styles.card}>
//                 <div className={styles.imageSection}>
//                     {tryonResult && tryonResult.dressImageUrl ? (
//                         <img src={tryonResult.dressImageUrl} alt="Dress" />
//                     ) : (
//                         <p>Loading...</p>
//                     )}
//                 </div>
//                 <div className={styles.detailsSection}>
//                     <p><strong>Brand:</strong> {tryonResult?.brand || 'Unavailable'}</p>
//                     <p><strong>Style:</strong> {tryonResult?.style || 'Unavailable'}</p>
//                     <p><strong>Condition:</strong> {tryonResult?.condition || 'Unavailable'}</p>
//                     <p><strong>Estimated Price:</strong> {tryonResult?.price || 'Unavailable'}</p>
//                 </div>
//             </div>
//             <div className={styles.buttonsContainer}>
//                 <button className={styles.button}>관련 상품보기</button>
//                 <button className={styles.button}>나의 관심 상품</button>
//                 <button className={styles.button} onClick={DressListHandle}>다른 드레스 탐색</button>
//             </div>
//         </div>
//     );
// }
//
// export default TryonResult;
