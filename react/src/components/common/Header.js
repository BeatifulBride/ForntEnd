import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HeaderCSS from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';


import {
    callLogoutAPI
} from '../../apis/MemberAPICalls'



function Header() {

    const isLogin = false;
    const navigate = useNavigate()

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer);  // 저장소에서 가져온 loginMember 정보(이름,디데이)
    // const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인


    //드레스 리스트 핸들러
    const onClickDressHandler = () => {
        navigate("/dress", {replace: true})
    }

    const onClickMypageHandler = () => {
        navigate("/mypage", { replace: true });
    }

    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');  
        //로그아웃
        dispatch(callLogoutAPI());
        
        alert('로그아웃이 되어 메인화면으로 이동합니다.');
        navigate("/", { replace: true })
        window.location.reload();
    }

    function BeforeLogin() {

        return (
            <div>
                <NavLink to="/login">로그인</NavLink>
            </div>
        );
    }

    function AfterLogin() {

        return (
            <div className={HeaderCSS.HeaderContainer}>
                <div className={HeaderCSS.MemberInfo}>
                    {loginMember && <b>{`${loginMember?.data?.memberName}님 환영합니다`}</b>}
                    &nbsp;&nbsp;&nbsp;
                    {loginMember && <b>{`${loginMember?.data?.memberWeddingDate}`}</b>}
                </div>
                <div className={HeaderCSS.ButtonsGroup}>
                    <button className={HeaderCSS.HeaderBtn} onClick={onClickDressHandler}>드레스보기</button>&nbsp;&nbsp;
                    <button className={HeaderCSS.HeaderBtn} onClick={onClickMypageHandler}>마이페이지</button>&nbsp;&nbsp;
                    <button className={HeaderCSS.HeaderBtn} onClick={onClickLogoutHandler}>로그아웃</button>&nbsp;
                </div>
            </div>
        );
    }

    return (
        <>
            {/*{ loginModal ? <LoginModal setLoginModal={ setLoginModal }/> : null}*/}
            <div className={ HeaderCSS.HeaderDiv }>
                {/* 로그인 상태에 따라 다른 컴포넌트 랜더링 */}
                { (isLogin == null || isLogin === undefined) ? <BeforeLogin /> : <AfterLogin />}
            </div>

        </>
    );
}

export default Header;