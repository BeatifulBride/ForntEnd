import React, { useState, useEffect } from 'react';
import DressSelectTop from "../pages/member/DressSelectTop";
import MainSampleImage from "../components/image/MainSampleImage";
import Main from "./MainLayout.module.css"
function MainLayout() {
    const [items, setItems] = useState([]); // 데이터 아이템을 저장할 상태
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [pageNumber, setPageNumber] = useState(1); // 현재 페이지 번호


    return (
        <div className={Main.Main}>
            <div className={Main.MainImagesContainer}>

                <MainSampleImage/>

            </div>
            <div className={Main.select}>Select Top5</div>
            <DressSelectTop items={items} />

        </div>
    );
}

export default MainLayout;
