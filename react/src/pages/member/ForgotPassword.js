// 아이디를 잃어버렸을 때 - 이메일을 입력 받은 후 아이디 이메일로 전달
// 비밀번호를 잃어버렸을 때 - 이메일과 아이디를 입력받은 후 일치 시
// 이메일로 코드 전달
// 코드 일치 시 비밀번호 재설정
import {NavLink, Route, Routes, useNavigate} from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from "react";
import 'react-calendar/dist/Calendar.css';
import emailjs from 'emailjs-com'
import { Icon } from '@iconify/react';
import SelectRegisterCSS from "./SelectRegister.module.css";
import CompanyRegister from "./CompanyRegister";
import ForgotInfoCSS from "./ForgotInfo.module.css"
import axios from "axios";


function ForgotPassword({history}) {

    //navi
    const navigate = useNavigate();

    // 회원 API
    // String loginId       : 아이디
    // String loginPwd      : 비밀번호
    // String loginEmail    : 이메일

    // Id, Password, PasswordCheck, Email 변수 선언
    const [loginId, setLoginId] = useState('');
    const [loginPwd, setLoginPwd] = useState('');
    const [loginPwdCheck, setLoginPwdCheck] = useState('');
    const [loginEmail, setLoginEmail] = useState('');

    //비밀번호 확인, 이메일 - 오류 메시지 상태 저장
    const [userPasswordCheckMessage, setUserPasswordCheckMessage] = useState('');

    //비밀번호 확인, 이메일, 비밀번호 유효성 검사
    const [isEmail, setIsEmail] = useState('');
    const [isPasswordCheck, setIsPasswordCheck] = useState('');
    const [passwordOption, setPasswordOption] = useState('');
    //비밀번호 숨기기 기능(눈)
    const [showPassword, setShowPassword] = useState(false);

    //비밀번호 옵션
    const [passwordInputType, setPasswordInputType] = useState({
        type: "password",
        autoComplete: "current-password",
    });

    const handleTogglePassword = () => {
        setPasswordInputType((prev) => ({
            ...prev,
            type: prev.type === 'password' ? 'text' : 'password',
        }));
    };

    useEffect(()=> {
        if (passwordOption === false)
            setPasswordInputType({
                type: "password",
                autoComplete: "current-password",
            });
        else
            setPasswordInputType({
                type: "text",
                autoComplete: "off"
            });
    }, [passwordOption])

    //핸들러 정의 - Id, Email, Password, PasswordCheck
    const handlerChangeUserId = e => setLoginId(e.target.value);
    const handlerChangeUserEmail = e => setLoginEmail(e.target.value);
    const handlerChangeUserPassword = e => setLoginPwd(e.target.value);

    const [id, setId] = useState('');
    const [isValidId, setIsValidId] = useState(null);
    const [Email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState();

    //이메일 전송
    const [isEmailSent, setIsEmailSent] = useState(false);
    //인증코드
    const [randomCode, setRandomCode] = useState("0000")
    //random 함수
    const generatRandomCode = () => {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return randomNum.toString();
    };

    //사용자 인증코드
    const [code, setCode] = useState();
    const [isEmailCode, setIsEmailCode] = useState(false);

    //이메일 중복 확인
    const checkEmail = () => {
        // 1. 입력값이 비어있는지 확인
        if (loginEmail.trim() === '') {
            // 1-1. 비어있다면 사용자에게 알림
            alert('이메일을 입력해주세요.');
            console.log(loginEmail); // (디버깅용) 입력값 로깅
            return; // 함수 종료
        }

        // 2. 서버에 아이디 중복 여부 확인 요청

        axios.post(`http://localhost:8080/checkuser`, { loginId, loginEmail})
            .then(userResponse => {
                if (userResponse.status === 200) {
                    const userData = userResponse.data;
                    if (userData === "일치하는 회원이 존재합니다.") {
                        // 아이디와 이메일이 일치하는 경우
                        console.log('아이디와 이메일이 일치합니다.')
                        setIsValidEmail(false);
                    } else {
                        // 일치하는 회원이 없는 경우
                        alert('아이디와 이메일이 일치하지 않습니다');
                        console.log('아이디와 이메일이 일치하지 않습니다.')
                        setEmail('');
                        setIsValidEmail(false);
                    }
                } else {
                    // 다른 상태 코드에 대한 처리
                    console.error('Unexpected response status:', userResponse.status);
                }
            })
            .catch(userError => {
                console.error('데이터를 가져오는 도중 오류가 발생했습니다:', userError);
                alert('데이터를 가져오는 도중 오류가 발생했습니다');
            });
    };

    // const sendVerificationEamil = () => {
    //
    //     //인증코드
    //     const newRandomCode = generatRandomCode();
    //     setRandomCode(newRandomCode);
    //
    //
    //
    //     if (isValidEmail) {
    //
    //         // 이메일 보내기
    //         const templateParams = {
    //             to_email: loginEmail,
    //             from_name: "memory",
    //             message: '인증되었습니다.',
    //             code: newRandomCode,
    //         };
    //
    //         emailjs
    //             .send(
    //                 'Beautiful_Bride_pwd', // 서비스 Id
    //                 'Beautiful_Bride_pwd',   // 템플릿 Id
    //                 templateParams,
    //                 'GsD06wf1JCdrh2J04' // public-key
    //             )
    //             .then((response) => {
    //                 // 이메일 전송 성공 처리 로직
    //                 console.log('이메일이 성공적으로 발송되었습니다.', response);
    //                 setIsEmailSent(true);
    //             })
    //             .catch((error) => {
    //                 // 이메일 전송 실패 처리 로직
    //                 console.error('이메일 발송 실패: 이메일을 다시 확인해주세요.', error);
    //             });
    //     } else {
    //         console.log('이메일 중복 확인 실패: 이메일을 다시 확인해주세요.');
    //         // 이메일이 중복되는 경우에 대한 처리를 추가
    //     }
    // };

    //이메일 발송 핸들러
    // const handleVerification = () => {
    //     sendVerificationEamil(loginEmail);
    // }

    //이메일 인증코드 확인 핸들러
    const handlerCode = () => {
        if(code === randomCode){
            console.log('코드가 일치합니다. 사용자가 인증되었습니다.');
            setIsEmailCode(true);
        }else {
            console.error('코드가 일치하지 않습니다. 다시 시도해주세요.');
        }
    };

    // 인증코드 입력값 변경 핸들러
    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };


    const onClickBackHandler = () => {

        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate("/", { replace: true })
    }


    return (
        <div className={SelectRegisterCSS.App}>
            <div className={SelectRegisterCSS.appAside}/>
            <div className={SelectRegisterCSS.appForm}>
                <div className={SelectRegisterCSS.pageSwitcher}>
                    <NavLink
                        to="/forgotinfo"
                        activeClassName="pageSwitcherItem-active"
                        className={SelectRegisterCSS.pageSwitcherItem}
                    >
                        Forgot Id(아이디 찾기)
                    </NavLink>
                    <NavLink
                        to="/forgotpassword"
                        activeClassName="pageSwitcherItem-active"
                        className={SelectRegisterCSS.pageSwitcherItem}
                        style={{color:"white"}}
                    >
                        Forgot Password(비밀번호 찾기)
                    </NavLink>
                </div>
                <div className={ ForgotInfoCSS.backgroundDiv}>
                    <div className={ForgotInfoCSS.registerDiv}>
                        <h1 className={ForgotInfoCSS.h1}>Forgot Password(비밀번호 찾기)</h1>
                        <div className={ForgotInfoCSS.userid}>
                            <input
                                type="text"
                                name="id"
                                value={loginId}
                                placeholder="Id"
                                autoComplete='off'
                                onChange={handlerChangeUserId}
                            />
                        </div>
                        <Icon className={ForgotInfoCSS.icon_id} icon="fa-solid:user"/>

                        {/*<div className={CompanyRegisterCSS.userpw}>*/}
                        {/*    <input*/}
                        {/*        type={passwordInputType.type}*/}
                        {/*        id="password"*/}
                        {/*        password="비밀번호 (숫자+영문자+특수문자 조합으로 8자리 이상)"*/}
                        {/*        title="비밀번호"*/}
                        {/*        placeholder="Password"*/}
                        {/*        value={loginPwd}*/}
                        {/*        onChange={handlerChangeUserPassword}*/}
                        {/*    />*/}
                        {/*    <p className={CompanyRegisterCSS.check_item} onClick={handleTogglePassword}>*/}
                        {/*        {passwordInputType.type === 'password' ? <FaEye/> : <FaEyeSlash/>}*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                        {/*<Icon className={CompanyRegisterCSS.icon_pw} icon="mdi:password"/>*/}
                        {/*<div className={CompanyRegisterCSS.userpw2}>*/}
                        {/*    <p className={CompanyRegisterCSS.check_item2} onClick={handleTogglePassword}>*/}
                        {/*        {passwordInputType.type === 'password' ? <FaEye/> : <FaEyeSlash/>}*/}
                        {/*    </p>*/}
                        {/*    <input*/}
                        {/*        type={passwordInputType.type}*/}
                        {/*        name="memberPassword"*/}
                        {/*        title="비밀번호 확인"*/}
                        {/*        placeholder="PasswordCheck"*/}
                        {/*        value={loginPwdCheck}*/}
                        {/*        onChange={handlerChangeUserPasswordCheck}*/}
                        {/*    />*/}
                        {/*    {loginPwdCheck.length > 0 && (*/}
                        {/*        <p className={`message ${isPasswordCheck ? 'success' : 'error'}`}>{userPasswordCheckMessage}</p>*/}
                        {/*    )}*/}
                        {/*</div>*/}
                        {/*<Icon className={CompanyRegisterCSS.icon_pw2} icon="mdi:password"/>*/}
                        <div className={ForgotInfoCSS.useremail}>
                            <input
                                type="text"
                                name="userEmail"
                                placeholder="Email"
                                value={loginEmail}
                                onChange={handlerChangeUserEmail}
                            />
                            {isEmailSent ? (
                                <p>인증 이메일이 성공적으로 발송되었습니다. 이메일을 확인해주세요.</p>
                            ) : (
                                <button className={ForgotInfoCSS.useremail_btn} onClick={checkEmail}>인증코드
                                    받기</button>
                            )}
                        </div>
                        <Icon className={ForgotInfoCSS.icon_email} icon="mdi:email-heart-outline"/>
                        <div className={ForgotInfoCSS.usercode}>
                            <input
                                type="text"
                                name='i_code'
                                placeholder='인증코드를 입력하세요.'
                                value={code}
                                onChange={handleCodeChange}
                            />
                            {isEmailCode ? (
                                <p>인증코드가 확인되었습니다.</p>
                            ) : (
                                <button className={ForgotInfoCSS.usercode_btn} onClick={handlerCode}>인증코드 확인</button>
                            )}
                        </div>
                        <Icon className={ForgotInfoCSS.icon_code} icon="tabler:mail-code"/>

                    </div>
                    {/*<div className={CompanyRegisterCSS.submit_box}>*/}
                    {/*    <button*/}
                    {/*        className={CompanyRegisterCSS.submit_btn}*/}
                    {/*        onClick={handlerOnClick}*/}
                    {/*        type="submit"*/}
                    {/*        disabled={!(loginId && loginPwd && isPasswordCheck && isEmail && companyPhone && isEmailSent && isEmailCode)}*/}
                    {/*    >*/}
                    {/*        Dress Comapany Create Account*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                    <div className='login_box'>
                        <button
                            className={ForgotInfoCSS.login_btn}
                            onClick = { onClickBackHandler }
                        >
                            로그인 하기
                        </button>
                    </div>
                </div>
                <Routes>
                    <Route path="/companyregister" element={<CompanyRegister/>}/>
                </Routes>
            </div>
            <div className={SelectRegisterCSS.appAside2}/>
        </div>
    );
}

export default ForgotPassword;