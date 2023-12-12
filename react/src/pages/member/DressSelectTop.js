import test from '../../image/jinyang.png'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import dress from '../member/DressSelectTop.module.css'
import {useEffect} from "react";

import {
    callDressSelectAPI, callProductListAboutDessertAPI
} from "../../apis/ProductAPICalls";

function DressSelectTop() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const dressInfo = useSelector(state => state.productReducer)
    const dressList = dressInfo.data

    const onClickTryOn = () => {
        navigate("/tryon", {replace: true})
    }
    // useEffect(
    //     () => {
    //         dispatch(callDressSelectAPI());
    //     }
    //     ,[]
    // );


    return(
        <div> {/* 모든 내용을 감싸는 루트 div 추가 */}
            <div className={dress.container}>
                <div className={dress.imageContainer}>
                    <img src={test}/>
                </div>
                <div className={dress.textContainer}>
                    {dressInfo && <div><b>Dress Name: {dressInfo?.data?.companyName}</b>1</div>}
                    {dressInfo && <div><b>Company: {dressInfo?.data?.dressPNumber}</b>111</div>}
                </div>
            </div>
            <div>
                <button onClick={onClickTryOn}>Try-on</button>
            </div>
        </div>
    )
}

export default DressSelectTop;