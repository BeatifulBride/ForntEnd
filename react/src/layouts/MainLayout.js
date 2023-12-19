import React, { useState, useEffect } from 'react';
import DressSelectTop from "../pages/member/DressSelectTop";
import MainSampleImage from "../components/image/MainSampleImage";
import Main from "./MainLayout.module.css"
function MainLayout() {
    const [items, setItems] = useState([]); // 데이터 아이템을 저장할 상태
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [pageNumber, setPageNumber] = useState(1); // 현재 페이지 번호

    // 더미 데이터 로딩 함수
    // `const loadMoreItems = () => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         const newItems = Array.from({ length: 20 }, (_, index) => ({
    //             id: index + 1 + (pageNumber - 1) * 20,
    //             name: 'Dress Name',
    //             type: 'Type',
    //             company: 'Company'
    //         }));
    //         setItems(prevItems => [...prevItems, ...newItems]);
    //         setPageNumber(prevPageNumber => prevPageNumber + 1);
    //         setLoading(false);
    //     }, 1000); // 1초 지연으로 로딩 효과를 모방
    // };`

    // 스크롤 이벤트 핸들러
    // const handleScroll = () => {
    //     if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight - 100 || loading) return;
    //     loadMoreItems();
    // };
    //
    // useEffect(() => {
    //     window.addEventListener('scroll', handleScroll);
    //     loadMoreItems(); // 초기 데이터 로드
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    return (
        <div className={Main.Main}>
            <div>
                <MainSampleImage/><MainSampleImage/><MainSampleImage/>

            </div>
            <div>Select Top5</div>


            <DressSelectTop items={items} />


            {/*{loading && <div>Loading...</div>}*/}
        </div>
    );
}

export default MainLayout;
