import {NavLink, Route, Routes, useNavigate} from 'react-router-dom';
import {useCallback, useEffect, useState} from "react";
import emailjs from 'emailjs-com';
import {Icon} from '@iconify/react';
import SelectRegisterCSS from "./SelectRegister.module.css";
import CompanyRegister from "./CompanyRegister";
import ForgotPasswordCSS from "./ForgotPassword.module.css";
import axios from "axios";
import LoginCSS from "./Login.module.css";
import CompanyRegisterCSS from "./CompanyRegister.module.css";
import {FaEye, FaEyeSlash} from "react-icons/fa";

function ForgotPassword() {
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState('');
    const [loginId, setLoginId] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [randomCode, setRandomCode] = useState("0000");
    const [code, setCode] = useState('');
    const [isEmailCode, setIsEmailCode] = useState(false);
    const [newPwd, setNewPwd] = useState('');
    const [loginPwdCheck, setLoginPwdCheck] = useState('');
    const [isPasswordCheck, setIsPasswordCheck] = useState('');

    const [userPasswordCheckMessage, setUserPasswordCheckMessage] = useState('');

    const handlerChangeUserEmail = (e) => {
        setLoginEmail(e.target.value);
    };

    const onChangeHandler = (e) => {setLoginId(e.target.value);};

    const generatRandomCode = () => {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return randomNum.toString();
    };

    const sendVerificationEmail = () => {
        // 이메일, 아이디 조회
        axios.get(`http://localhost:8080/find/account/check/${loginId}/${loginEmail}`, {loginId, loginEmail})
            .then(response => {
                if (response.status === 200) {
                    // 아이디, 이메일이 존재하면 메일 발송
                    const newRandomCode = generatRandomCode();
                    setRandomCode(newRandomCode);

                    const templateParams = {
                        to_email: loginEmail,
                        from_name: "memory",
                        message: '인증되었습니다.',
                        code: newRandomCode,
                    };

                    emailjs
                        .send(
                            'Beautiful_Bride',
                            'Beautiful_Bride_code',
                            templateParams,
                            'GsD06wf1JCdrh2J04'
                        )
                        .then((response) => {
                            console.log('이메일이 성공적으로 발송되었습니다.', response);
                            setIsEmailSent(true);
                        })
                        .catch((error) => {
                            console.error('이메일 발송 실패: 이메일을 다시 확인해주세요.', error);
                        });
                } else {
                    // 아이디가 존재하지 않음
                    console.log('사용자의 아이디가 존재하지 않습니다.');
                }
                    })
                    .catch(error => {
                    console.error('아이디 조회 중 오류 발생:', error);
                    });
    };

    const handleVerification = () => {
        sendVerificationEmail(loginEmail);
    };

    const handlerCode = async () => {
        try {
            if (code === randomCode) {
                console.log('코드가 일치합니다. 사용자가 인증되었습니다.');
                setIsEmailCode(true);

            } else {
                console.error('코드가 일치하지 않습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('아이디 조회 중 오류 발생:', error);
        }

    };

    const [passwordOption, setPasswordOption] = useState('');
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

    const handlerChangeUserPassword = e => setNewPwd(e.target.value);
    const handlerChangeUserPasswordCheck = useCallback((e) => {
        const passwordCheckCurrent = e.target.value
        setLoginPwdCheck(passwordCheckCurrent)
        if (newPwd === passwordCheckCurrent){
            setUserPasswordCheckMessage('비밀번호가 일치합니다.')
            setIsPasswordCheck(true)
        }else{
            setUserPasswordCheckMessage('비밀번호가 일치하지 않습니다. 다시 확인해주세요.')
            setIsPasswordCheck(false)
        }
    }, [newPwd])

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const handleResetPassword = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Create a FormData object
        const formData = new FormData();
        formData.append('loginId', loginId);
        formData.append('loginEmail', loginEmail);
        formData.append('newPwd', newPwd);

        axios.post(`http://localhost:8080/find/account/pwd`, formData)
            .then(response => {
                if (response.status === 200) {
                    // 비밀번호 재설정 성공
                    console.log('비밀번호가 성공적으로 재설정되었습니다.');
                } else {
                    // 비밀번호 재설정 실패
                    console.error('비밀번호 재설정 실패:', response.data);
                }
            })
            .catch(error => {
                // 오류 발생
                console.error('비밀번호 재설정 중 오류 발생:', error);
            });
    };


    const onClickBackHandler = () => {
        navigate("/selectregister", {replace: true});
    };

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
                        style={{color: "white"}}
                    >
                        Forgot Password(비밀번호 찾기)
                    </NavLink>
                </div>
                <div className={ForgotPasswordCSS.backgroundDiv}>
                    <div className={ForgotPasswordCSS.registerDiv}>
                        <h1 className={ForgotPasswordCSS.h1}>Forgot Password(비밀번호 찾기)</h1>
                        <div className={ForgotPasswordCSS.userid}>
                            <input
                                type="text"
                                name='loginId'
                                placeholder="아이디"
                                autoComplete='off'
                                onChange={onChangeHandler}
                            />
                        </div>
                        <Icon className={ForgotPasswordCSS.icon_id} icon="fa-solid:user"/>
                        <div className={ForgotPasswordCSS.useremail}>
                            <input
                                type="text"
                                name="userEmail"
                                placeholder="Email"
                                value={loginEmail}
                                onChange={handlerChangeUserEmail}
                            />
                            {isEmailSent ? (
                                <p>이메일이 성공적으로 발송되었습니다. <br/>이메일에서 코드를 확인해주세요.</p>
                            ) : (
                                <button className={ForgotPasswordCSS.useremail_btn} onClick={handleVerification}>
                                    인증코드 받기
                                </button>
                            )}
                        </div>
                        <Icon className={ForgotPasswordCSS.icon_email} icon="mdi:email-heart-outline"/>
                        <div className={ForgotPasswordCSS.usercode}>
                            <input
                                type="text"
                                name='i_code'
                                placeholder='인증코드를 입력하세요.'
                                value={code}
                                onChange={handleCodeChange}
                            />
                            {isEmailCode ? (
                                <div className={ForgotPasswordCSS.userpw_box}>
                                    <p>인증코드가 확인되었습니다.<br />비밀번호를 다시 설정해주세요.</p>
                                    {/* 비밀번호 재설정을 위한 인풋창들 */}
                                    <div className={ForgotPasswordCSS.userpw}>
                                        <input
                                            type={passwordInputType.type}
                                            id="password"
                                            name="newPassword"
                                            placeholder="newPassword"
                                            value={newPwd}
                                            onChange={handlerChangeUserPassword}
                                        />
                                        <p className={ForgotPasswordCSS.check_item} onClick={handleTogglePassword}>
                                            {passwordInputType.type === 'password' ? <FaEyeSlash/>: <FaEye/>}
                                        </p>
                                    </div>
                                    <Icon className={ForgotPasswordCSS.icon_pw} icon="mdi:password"/>
                                    <div className={ForgotPasswordCSS.userpw2}>
                                        <input
                                            type={passwordInputType.type}
                                            id="password"
                                            name="confirmPassword"
                                            placeholder="newPassword Check"
                                            value={loginPwdCheck}
                                            onChange={handlerChangeUserPasswordCheck}
                                        />
                                        <p className={ForgotPasswordCSS.check_item2} onClick={handleTogglePassword}>
                                            {passwordInputType.type === 'password' ? <FaEyeSlash/>: <FaEye/>}
                                        </p>
                                    </div>
                                    <Icon className={ForgotPasswordCSS.icon_pw2} icon="mdi:password"/>
                                    <div className={ForgotPasswordCSS.userpwd_box}>
                                    <button className={ForgotPasswordCSS.userpwd_btn} onClick={handleResetPassword}>비밀번호 재설정</button>
                                    </div>
                                </div>
                            ) : (
                                <button className={ForgotPasswordCSS.usercode_btn} onClick={handlerCode}>인증코드 확인</button>
                            )}
                        </div>
                        <Icon className={ForgotPasswordCSS.icon_code} icon="tabler:mail-code"/>
                    </div>
                    <div className='login_box'>
                        <button
                            className={ForgotPasswordCSS.login_btn}
                            onClick={onClickBackHandler}
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
