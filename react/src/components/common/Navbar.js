import { useNavigate } from 'react-router-dom';
import NavCSS from './Navbar.module.css';
import { decodeJwt } from '../../utils/tokenUtils';
import MainLogo from "../image/MainLogo";
import {useSelector} from "react-redux";
import Bride from "../image/Bride";

function Navbar() {

    const loginMember = useSelector(state => state.memberReducer);  // 저장소에서 가져온 loginMember 정보(이름,디데이)
    const navigate = useNavigate();
    const onClickMain = () => {
        navigate("/", { replace: true });
    }
    const onClickMypage = () => {
        navigate("/test", { replace: true });
    }


    // const isLogin = window.localStorage.getItem('accessToken');
    // let decoded = null;
    // if(isLogin !== undefined && isLogin !== null) {
    //     const temp = decodeJwt(window.localStorage.getItem("accessToken"));
    //     console.log(temp);
    //     decoded = temp.auth[0];
    // }

    // console.log('decoded ', decoded);
    return (
        <>
            <div className={NavCSS.PageContainer}>
                <div className={NavCSS.Centered}>
                    <MainLogo onClick={onClickMain}/>
                </div>
                <div className={NavCSS.ContentRow}>
                    <div className={NavCSS.BridePicture}>
                        <Bride onClick={onClickMypage}/>
                    </div>
                    <div>
                        <div className={NavCSS.NavbarDiv}>
                            결혼식
                            {loginMember && <b>{`${loginMember?.data?.memberWeddingDate}`}</b>}
                        </div>
                        <div className={NavCSS.NavbarDiv2}>
                            {loginMember && <b>{`${loginMember?.data?.memberName}님 환영합니다`}</b>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;