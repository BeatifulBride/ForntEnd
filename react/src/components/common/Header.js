import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HeaderCSS from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import { calculateDaysLeft } from './DateUtils';

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
    const accessToken = window.sessionStorage.getItem('accessToken');


    useEffect(() => {

        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            console.log(decodedToken);

            dispatch(callMainInfoAPI(decodedToken.sub));
        }
    }, [dispatch, accessToken]);

    // 드레스리스트로 이동하는 핸들러
    const onClickDressHandler = () => {
        navigate("/dresslist", {
            replace: true,
            state: { accessToken: accessToken }
        });
    }

    // 마이페이지로 이동하는 핸들러
    const onClickMypageHandler = () => {
        navigate("/mypage", {
            replace: true,
            state: { accessToken: accessToken }
        });
    }

    // 로그아웃 하는 핸들러
    const onClickLogoutHandler = () => {
        window.sessionStorage.removeItem('accessToken');

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

        const daysUntilWedding = login?.data?.memWeddingDate
            ? calculateDaysLeft(login.data.memWeddingDate)
            : null;

        return (
            <div className={HeaderCSS.HeaderContainer}>
                <div className={HeaderCSS.MemberInfo}>
                    {login && <b>{`${login?.data?.memName}님 환영합니다`}</b>}
                    &nbsp;&nbsp;&nbsp;
                    {login?.data?.memWeddingDate && (
                        <b>{`결혼까지 D-${daysUntilWedding}일`}</b>
                    )}
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

            <div className={ HeaderCSS.HeaderDiv }>

                { (isLogin == null || isLogin === undefined) ? <BeforeLogin /> : <AfterLogin />}
            </div>

        </>
    );
}

export default Header;