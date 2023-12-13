
import React from 'react';
import { useLocation } from "react-router-dom";

function Tryon() {

    const location = useLocation();
    const selectedDress = location.state?.selectedDress;


    return (
        <div>

            <div>
                <h2>Selected Dress</h2>
                <img src={selectedDress.imageUrl} alt="Selected Dress" />
                <p><b>Dress Name:</b> {selectedDress.companyName}</p>
                <p><b>Company:</b> {selectedDress.dressPNumber}</p>
            </div>
            <div>
                전신사진 등록하기
            </div>
        </div>
    );
}

export default Tryon;
