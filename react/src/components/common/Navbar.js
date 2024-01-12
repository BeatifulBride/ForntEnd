import { useNavigate } from 'react-router-dom';
import NavCSS from './Navbar.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import MainLogo from "../image/MainLogo";
import {useSelector, useDispatch} from "react-redux";
import Bride from "../image/Bride";
import {useEffect} from "react";
import jwtDecode from "jwt-decode";
import {callMainInfoAPI} from "../../apis/MemberAPICalls";
import {calculateDaysLeft} from "./DateUtils";

function Navbar() {

    const dispatch = useDispatch()
    const loginMember = useSelector(state => state.memberInfoReducer);  // 저장소에서 가져온 loginMember 정보(이름,디데이)
    const navigate = useNavigate();

    const accessToken = window.sessionStorage.getItem('accessToken');
    console.log("토근값은? :" , accessToken)

    const daysUntilWedding = loginMember?.data?.memWeddingDate
        ? calculateDaysLeft(loginMember.data.memWeddingDate)
        : null;

    useEffect(() => {
        if (accessToken) {
            /* 백단의 로직으로 인하여 decode 노필요 */
            // const decodedToken = jwtDecode(accessToken);
            // console.log(decodedToken);
            dispatch(callMainInfoAPI(accessToken));
        }
    }, [dispatch, accessToken]);

    const onClickMain = () => {
        navigate("/", { replace: true });
    }

    // 마이페이지로 이동하는 핸들러
    const onClickMypageHandler = () => {
        if (accessToken) {
            navigate("/mypage", {
                replace: true,
                state: { accessToken: accessToken }
            });
        } else {
            alert('로그아웃 상태여서 로그인창으로 이동합니다.');
            navigate("/login", { replace: true });
        }
    }


    return (
        <>
            <div className={NavCSS.PageContainer}>
                <div className={NavCSS.Centered}>
                    {/*<MainLogo onClick={onClickMain}/>*/}
                </div>
                <div className={NavCSS.ContentRow}>
                    <div className={NavCSS.BridePicture}>
                        {/*<Bride onClick={onClickMypageHandler}/>*/}
                    </div>
                    <div>
                        <div className={NavCSS.NavbarDiv}>
                            {loginMember?.data?.memWeddingDate && (
                                <b>{`결혼까지 D-${daysUntilWedding}일`}</b>
                            )}
                        </div>
                        <div className={NavCSS.NavbarDiv2}>
                            {loginMember?.data?.memName && (
                                <b>{`${loginMember.data.memName}님 환영합니다`}</b>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;