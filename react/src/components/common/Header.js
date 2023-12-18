import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HeaderCSS from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {useEffect, useState} from "react";
import jwtDecode from "jwt-decode";



import {
    callLogoutAPI,
    callMainInfoAPI
} from '../../apis/MemberAPICalls'



function Header() {


    const navigate = useNavigate()
    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const isLogin = window.sessionStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const login = useSelector(state => state.memberInfoReducer);
    console.log(login.data)
    const accessToken = window.sessionStorage.getItem('accessToken');


    useEffect(() => {

        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            console.log(decodedToken);

            dispatch(callMainInfoAPI(decodedToken.sub));
        }
    }, [dispatch, accessToken]);





    //드레스 리스트 핸들러
    const onClickDressHandler = () => {
        navigate("/dress", {replace: true})
    }

    const onClickMypageHandler = () => {

        navigate("/mypage", { replace: true });
    }

    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('loginInfo');
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
                    {/*{loginMember.data.memName}*/}
                    {login && <b>{`${login?.data?.memName}님 환영합니다`}</b>}
                    {/*{loginMember.data.memName}*/}
                    &nbsp;&nbsp;&nbsp;
                    {login && <b>{`${login?.data?.memWeddingDate}`}</b>}
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