import {NavLink, Route, Routes, useNavigate} from 'react-router-dom';
import {useState} from "react";
import emailjs from 'emailjs-com';
import {Icon} from '@iconify/react';
import SelectRegisterCSS from "./SelectRegister.module.css";
import CompanyRegister from "./CompanyRegister";
import ForgotInfoCSS from "./ForgotInfo.module.css";
import axios from "axios";

function ForgotInfo() {
    const navigate = useNavigate();

    const [loginEmail, setLoginEmail] = useState('');
    const [loginId, setLoginId] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [randomCode, setRandomCode] = useState("0000");
    const [code, setCode] = useState('');
    const [isEmailCode, setIsEmailCode] = useState(false);

    const handlerChangeUserEmail = (e) => {
        setLoginEmail(e.target.value);
        // 이메일 유효성 검사 로직 추가 (필요시)
    };

    const generatRandomCode = () => {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return randomNum.toString();
    };

    const sendVerificationEmail = () => {
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

    };

    const handleVerification = () => {
        sendVerificationEmail(loginEmail);
    };

    const handlerCode = async () => {
        try {
            if (code === randomCode) {
                console.log('코드가 일치합니다. 사용자가 인증되었습니다.');
                setIsEmailCode(true);

                // 이메일로 아이디 조회
                axios.post('http://localhost:8080/find/account/id', null, {
                    params: {
                        loginEmail: loginEmail
                    }
                })
                    .then(response => {
                        if (response.status === 200) {
                            // 아이디가 존재하면 보여줌
                            console.log('사용자의 아이디:', response.data);
                            setLoginId(response.data);
                        } else {
                            // 아이디가 존재하지 않음
                            console.log('사용자의 아이디가 존재하지 않습니다.');
                        }
                    })
                    .catch(error => {
                        console.error('아이디 조회 중 오류 발생:', error);
                    });
            } else {
                console.error('코드가 일치하지 않습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('아이디 조회 중 오류 발생:', error);
        }

    };

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const onClickBackHandler = () => {
        navigate("/", {replace: true});
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
                        style={{color: "white"}}
                    >
                        Forgot Id(아이디 찾기)
                    </NavLink>
                    <NavLink
                        to="/forgotpassword"
                        activeClassName="pageSwitcherItem-active"
                        className={SelectRegisterCSS.pageSwitcherItem}
                    >
                        Forgot Password(비밀번호 찾기)
                    </NavLink>
                </div>
                <div className={ForgotInfoCSS.backgroundDiv}>
                    <div className={ForgotInfoCSS.registerDiv}>
                        <h1 className={ForgotInfoCSS.h1}>Forgot Id(아이디 찾기)</h1>

                        <div className={ForgotInfoCSS.useremail}>
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
                                <button className={ForgotInfoCSS.useremail_btn} onClick={handleVerification}>
                                    인증코드 받기
                                </button>
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
                                <p>인증코드가 확인되었습니다.<br/>아이디 : {loginId}</p>

                            ) : (
                                <button className={ForgotInfoCSS.usercode_btn} onClick={handlerCode}>인증코드 확인</button>
                            )}
                        </div>
                        <Icon className={ForgotInfoCSS.icon_code} icon="tabler:mail-code"/>
                    </div>
                    <div className='login_box'>
                        <button
                            className={ForgotInfoCSS.login_btn}
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

export default ForgotInfo;
