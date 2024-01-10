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
        navigate("/companyregister", { replace: true })
    }

    const onClickUserRegisterHandler = () => {
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
            'http://1.214.19.22:6900/auth/login',
            formData,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            }
        )
            .then(response => {
                const responseData = response.data;

                if (responseData && responseData.token) {
                    // 서버 응답에서 토큰과 company 정보를 꺼내기
                    const token = responseData.token;
                    const company = responseData.company;

                    try {
                        // 토큰 디코딩
                        const decode_token = jwtDecode(token);
                        console.log("Decoded Token:", decode_token);
                        console.log("Company:", company);

                        // company에 따라 페이지 이동
                        if (company === "true") {
                            sessionStorage.setItem("accessToken", JSON.stringify(token));
                            navigate('/company');
                        } else {
                            sessionStorage.setItem("accessToken", JSON.stringify(token));
                            navigate('/');
                        }
                    } catch (decodeError) {
                        console.error("Error decoding token:", decodeError);
                        // 디코딩 에러 처리
                        sessionStorage.clear();
                    }
                } else {
                    console.error("No token received from the server.");
                    // 토큰이 없을 때의 처리
                    sessionStorage.clear();
                }
            })
            .catch(error => {
                console.error("Error during login request:", error);
                // 로그인 요청 중에 발생한 에러 처리
                sessionStorage.clear();
            });
    };


    return (
                <div className={LoginCSS.backgroundDiv}>
                    <div className={LoginCSS.loginDiv}>
                        <h1 className={LoginCSS.h1}>LOGIN</h1>
                        <div className={LoginCSS.userid}>
                            <input
                                type="text"
                                name='loginId'
                                placeholder="ID"
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
                                placeholder="PASSWORD"
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
                            LOGIN
                        </button>
                    </div>
                    <div className={LoginCSS.btn}>
                        <Icon className={LoginCSS.bride} icon="material-symbols:girl" />
                    <button
                        className={LoginCSS.uregbtn}
                        onClick={onClickUserRegisterHandler}
                    ><span>예비 신부 회원가입</span>
                    </button>
                        <Icon className={LoginCSS.dress} icon="game-icons:large-dress" />
                    <button
                        className={LoginCSS.regbtn}
                        onClick={onClickRegisterHandler}
                    ><span>드레스 업체 회원가입</span>
                    </button>
                    </div>
        </div>
    );
}

export default Login;