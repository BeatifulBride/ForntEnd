import LoginCSS from './Login.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { POST_REGISTER } from '../../modules/MemberModule';
import {
    callLoginAPI
} from '../../apis/MemberAPICalls'
import { POST_LOGIN } from '../../modules/MemberModule';
import RegisterCSS from "./Register.module.css";
import CompanyRegisterCSS from "./CompanyRegister.module.css";
import {Icon} from "@iconify/react";
import SelectRegisterCSS from "./SelectRegister.module.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import qs from 'qs';

function Login({history}) {

    const navigate = useNavigate();

    const [loginId, setLoginId] = useState('');
    const [loginPwd, setLoginPwd] = useState('');
    /* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보

    /* 폼 데이터 한번에 변경 및 State에 저장 */
    const [form, setForm] = useState({
        loginId: '',
        loginPwd: ''
    });

    useEffect(() => {

            if(loginMember.status === 200){
                console.log("[Login] Login SUCCESS {}", loginMember);
                navigate("/", { replace: true });
            }

            /* 회원 가입 후 로그인 페이지로 안내 되었을 때 */
            if(loginMember.status === 201){

                loginMember.status = 100  // Continue
                dispatch({ type: POST_REGISTER,  payload: loginMember });
            }
        }
        ,[loginMember]);

    /* 로그인 상태일 시 로그인페이지로 접근 방지 */
    if(loginMember.length > 0) {
        console.log("[Login] Login is already authenticated by the server");
        return <Navigate to="/"/>
    }

    const handlerChangeUserId = e => setLoginId(e.target.value);
    const handlerChangeUserPwd = e => setLoginPwd(e.target.value);

    const onClickRegisterHandler = () => {
        navigate("/selectregister", { replace: true })
    }

    /* 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동 */
    const onClickLoginHandler = () => {
        // 폼 데이터 생성
        const formData = qs.stringify({
            LOGIN_ID: loginId,
            LOGIN_PWD: loginPwd,
        });

        axios.post(
            'http://localhost:8080/auth/login',
            formData,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }
        )
            .then(response => {
                const token = response.data;
                const decode_token = jwtDecode(token);

                console.log(decode_token);

                if (response.data) {
                    // 성공적인 로그인 처리
                    sessionStorage.setItem("accessToken", response.data);
                    navigate('/');
                } else {
                    sessionStorage.clear();
                }
            })
            .catch(error => {
                console.log(error);
                sessionStorage.clear();
            });
    };


    return (
        <div className={SelectRegisterCSS.App}>
            <div className={SelectRegisterCSS.appAside}/>
            <div className={SelectRegisterCSS.appForm}>
                <div className={SelectRegisterCSS.pageSwitcher}>
                    <NavLink
                        to="/login"
                        activeClassName="pageSwitcherItem-active"
                        className={SelectRegisterCSS.pageSwitcherItem}
                        style={{color:"white"}}
                    >
                        Bride Login(일반 로그인)
                    </NavLink>
                    <NavLink
                        to="/companylogin"
                        activeClassName="pageSwitcherItem-active"
                        className={SelectRegisterCSS.pageSwitcherItem}
                    >
                        Company Login(드레스업체  로그인)
                    </NavLink>
                </div>
                <div className={LoginCSS.backgroundDiv}>
                    <div className={LoginCSS.loginDiv}>
                        <h1 className={LoginCSS.h1}>로그인</h1>
                        <div className={LoginCSS.userid}>
                            <input
                                type="text"
                                name='loginId'
                                placeholder="아이디"
                                value={loginId}
                                autoComplete='off'
                                onChange={handlerChangeUserId}
                            />
                        </div>
                        <Icon className={LoginCSS.icon_id} icon="fa-solid:user"/>
                        <div className={LoginCSS.userpw}>
                            <input
                                type="password"
                                name='loginPwd'
                                placeholder="패스워드"
                                value={loginPwd}
                                autoComplete='off'
                                onChange={handlerChangeUserPwd}
                            />
                        </div>
                        <Icon className={LoginCSS.icon_pw} icon="mdi:password"/>
                    </div>
                    <div className={LoginCSS.login_box}>
                        <button className={LoginCSS.login_btn}
                                onClick={onClickLoginHandler}
                        >
                            로그인
                        </button>
                    </div>
                    <button
                        style={{border: 'none', margin: 0, fontSize: '10px', height: '10px'}}
                        onClick={onClickRegisterHandler}
                    >
                        회원가입
                    </button>
                </div>
            </div>
            <div className={SelectRegisterCSS.appAside2}/>
        </div>
    );
}

export default Login;