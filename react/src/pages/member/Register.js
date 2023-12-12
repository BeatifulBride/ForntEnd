import RegisterCSS from './Register.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import $ from 'jquery';
import axios from "axios";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import emailjs from 'emailjs-com'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Icon } from '@iconify/react';

import {
    callRegisterAPI
} from '../../apis/MemberAPICalls'
import { POST_LOGIN } from '../../modules/MemberModule';

function Register({history}) {

     // 테스트입니다~ 될거얌
    const navigate = useNavigate();

    //성공바람
    /* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보

    // Id, Password, PasswordCheck, Email, PhoneNumber, WeddingDate 변수 선언
    const [userId, setUserId] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordCheck, setUserPasswordCheck] = useState('');
    const [userName, setUserNmae] = useState('')
    const [userEmail, setUserEmail] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [userWeddingDate, setUserWeddingDate] = useState('');
    //달력
    const [value, onChange] = useState(new Date());

    //비밀번호 확인, 이메일 - 오류 메시지 상태 저장
    const [userPasswordCheckMessage, setUserPasswordCheckMessage] = useState('');
    const [userEmailMessage, setUserEmailMessage] = useState('');

    //비밀번호 확인, 이메일, 비밀번호 유효성 검사
    const [isEmail, setIsEmail] = useState('');
    const [isPasswordCheck, setIsPasswordCheck] = useState('');
    const [passwordOption, setPasswordOption] = useState('');
    //비밀번호 숨기기 기능(눈)
    const [showPassword, setShowPassword] = useState(false);

    //아이디, 이메일 중복 확인
    let isValidId = false;
    let isValidEmail = false;

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

    //핸들러 정의 - Id, Email, Password, PasswordCheck, PhoneNumber, WeddingDate
    const handlerChangeUserId = e => setUserId(e.target.value);
    const handlerChangeUserName = e => setUserNmae(e.target.value)
    const handlerChangeUserEmail = useCallback((e) => {
        const emailRegex =
            /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        const emailCurrent = e.target.value
        setUserEmail(emailCurrent)
        if (!emailRegex.test(emailCurrent)) {
            setUserEmailMessage('이메일 형식이 올바르지 않습니다. 다시 확인해주세요.')
            setIsEmail(false)
        } else {
            setUserEmailMessage('올바른 이메일 형식입니다.')
            setIsEmail(true)
        }
    }, [])
    const handlerChangeUserPassword = e => setUserPassword(e.target.value);
    const handlerChangeUserPasswordCheck = useCallback((e) => {
        const passwordCheckCurrent = e.target.value
        setUserPasswordCheck(passwordCheckCurrent)
        if (userPassword === passwordCheckCurrent){
            setUserPasswordCheckMessage('비밀번호가 일치합니다.')
            setIsPasswordCheck(true)
        }else{
            setUserPasswordCheckMessage('비밀번호가 일치하지 않습니다. 다시 확인해주세요.')
            setIsPasswordCheck(false)
        }
    }, [userPassword])

    const handlerChangeUserPhoneNumber = e => {
        const before = e.target.value.replaceAll('-', '');

        // 숫자 여부 체크
        let numberFormat = before.replace(/[^0-9]/g, '');

        // 길이에 따라서 짤라서 포맷팅
        if (numberFormat.length < 3) {
            numberFormat = numberFormat.substr(0, 3);
        } else if (numberFormat.length > 4 && numberFormat.length < 8) {
            numberFormat = numberFormat.substr(0, 3) + '-' + numberFormat.substr(3, 4);
        } else if (numberFormat.length >= 8) {
            numberFormat = numberFormat.substr(0, 3) + '-' + numberFormat.substr(3, 4) + '-' + numberFormat.substr(7, 4);
        }
        setUserPhoneNumber(numberFormat);
    }

    const handlerChangeUserWeddingDate = e => setUserWeddingDate(e.target.value);

    //아이디 중복 확인
    function checkId(){
        var id = $('#id').val();

        if (id.trim() === '') {
            alert('아이디를 입력해주세요.');
            return;
        };
        $.ajax({
            url: `http://localhost:8000/api/idCheck`, //Controller에서 요청 받을 주소
            type: 'post', //POST 방식으로 전달
            data: { id: id },
            success: function (cnt) { //컨트롤러에서 넘어온 cnt값을 받는다
                if (cnt == 0) { //cnt가 1이 아니면(=0일 경우) -> 사용 가능한 아이디
                    $('.id_ok').css("display", "inline-block");
                    $('.id_already').css("display", "none");
                    alert('사용가능한 아이디입니다.');
                    isValidId = true; //사용가능한 아이디로 확인이 되면 true값으로 바뀌면서 회원가입 가능
                } else { // cnt가 1일 경우 -> 이미 존재하는 아이디
                    $('.id_already').css("display", "inline-block");
                    $('.id_ok').css("display", "none");
                    alert('이미 사용중인 아이디입니다.');
                    $('#id').val('');
                    isValidId = false; // 중복확인을 실패한 경우에는 isValidId 값을 false로 변경
                }
            },

            error: function () {
                alert("에러입니다");
            }
        });
    };

    //이메일 전송
    const [isEmailSent, setIsEmailSent] = useState(false);
    //인증코드
    const [randomCode, setRandomCode] = useState("0000")
    //random 함수
    const generatRandomCode = () => {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return randomNum.toString();
    };
    //이메일 중복 확인
    function checkEmail(){
        var email = $('#email').val();

        if (email.trim() === '') {
            alert('이메일을 입력해주세요.');
            return;
        };
        $.ajax({
            url: `http://localhost:8000/api/idCheck`, //Controller에서 요청 받을 주소
            type: 'post', //POST 방식으로 전달
            data: { email : email },
            success: function (cnt_e) { //컨트롤러에서 넘어온 cnt값을 받는다
                if (cnt_e == 0) { //cnt가 1이 아니면(=0일 경우) -> 사용 가능한 아이디
                    $('.email_ok').css("display", "inline-block");
                    $('.email_already').css("display", "none");
                    alert('사용가능한 이메일입니다.');
                    isValidEmail = true; //사용가능한 아이디로 확인이 되면 true값으로 바뀌면서 회원가입 가능
                } else { // cnt가 1일 경우 -> 이미 존재하는 아이디
                    $('.email_already').css("display", "inline-block");
                    $('.email_ok').css("display", "none");
                    alert('이미 사용중인 이메일입니다.');
                    $('#email').val('');
                    isValidEmail = false; // 중복확인을 실패한 경우에는 isValidId 값을 false로 변경
                }
            },

            error: function () {
                alert("에러입니다");
            }
        });
    };

    //사용자 인증코드
    const [code, setCode] = useState();
    const [isEmailCode, setIsEmailCode] = useState(false);

    const sendVerificationEamil = () => {

        //인증코드
        const newRandomCode = generatRandomCode();
        setRandomCode(newRandomCode);

        //이메일 중복 확인
        checkEmail();

        if (isValidEmail) {

            // 이메일 보내기
            const templateParams = {
                to_email: userEmail,
                from_name: "memory",
                message: '인증되었습니다.',
                code: newRandomCode,
            };

            emailjs
                .send(
                    'Beautiful_Bride', // 서비스 Id
                    'test-template',   // 템플릿 Id
                    templateParams,
                    'GsD06wf1JCdrh2J04' // public-key
                )
                .then((response) => {
                    // 이메일 전송 성공 처리 로직
                    console.log('이메일이 성공적으로 발송되었습니다.', response);
                    setIsEmailSent(true);
                })
                .catch((error) => {
                    // 이메일 전송 실패 처리 로직
                    console.error('이메일 발송 실패: 이메일을 다시 확인해주세요.', error);
                });
        } else {
            console.log('이메일 중복 확인 실패: 이메일을 다시 확인해주세요.');
            // 이메일이 중복되는 경우에 대한 처리를 추가
        }
    };

    //이메일 발송 핸들러
    const handleVerification = () => {
        sendVerificationEamil(userEmail);
    }

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

    //회원가입 값 푸쉬 버튼
    const handlerOnClick = e => {
        e.preventDefault();

        //아이디 중복 확인을 수행하지 않은 경우
        if(!isValidId){
            alert('아이디 중복확인을 해주세요.');
            return;
        }

        //이메일 중복 확인을 수행하지 않은 경우
        if(!isValidEmail){
            alert('이메일 중복확인을 해주세요.');
            return;
        }

        axios.post(`http://localhost:8000/api/regist`,
            { userId, userPassword, userPhoneNumber: userPhoneNumber.replaceAll('-', ''), userEmail, userWeddingDate})
            .then(response => {
                if (response.data) {
                    alert('정상적으로 가입 되었습니다. 로그인 페이지로 이동합니다.');
                    history.push('/login');
                    localStorage.clear();
                    sessionStorage.clear();
                }
            })
            .catch(error => {
                console.log(error);
                alert('확인 후 다시 시도해주세요.' );
                sessionStorage.clear();
            });
    };



    const [form, setForm] = useState({
        memberId: '',
        memberPassword: '',
        memberName: '',
        memberEmail: ''
    });

    useEffect(() => {
            if(member.status == 201){
                console.log("[Login] Register SUCCESS {}", member);
                navigate("/login", { replace: true })
            }
        },
        [member]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickBackHandler = () => {

        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate("/", { replace: true })
    }

    const onClickRegisterHandler = () => {
        dispatch(callRegisterAPI({
            form: form
        }));
    }

    return (
        <div className={ RegisterCSS.backgroundDiv}>
            <div className={ RegisterCSS.registerDiv }>
                <h1 className={RegisterCSS.h1} >Create Account</h1>
                <div className={ RegisterCSS.userid }>
                    <input
                        type="text"
                        name="id"
                        value={userId}
                        placeholder="Id"
                        autoComplete='off'
                        onChange={handlerChangeUserId}
                    />
                    <button className={ RegisterCSS.userid_btn } onClick={checkId}>Id  중복  확인</button>
                </div>
                <Icon className={RegisterCSS.icon_id} icon="fa-solid:user" />
                <div className={ RegisterCSS.userpw }>
                    <input
                        type={passwordInputType.type}
                        id="password"
                        password="비밀번호 (숫자+영문자+특수문자 조합으로 8자리 이상)"
                        title="비밀번호"
                        placeholder="Password"
                        value={userPassword}
                        onChange={handlerChangeUserPassword}
                    />
                    <p className={RegisterCSS.check_item} onClick={handleTogglePassword}>
                        {passwordInputType.type === 'password' ? <FaEye /> : <FaEyeSlash />}
                    </p>
                </div>
                <Icon className={RegisterCSS.icon_pw} icon="mdi:password" />
                <div className={ RegisterCSS.userpw2 }>
                    <p className={RegisterCSS.check_item2} onClick={handleTogglePassword}>
                        {passwordInputType.type === 'password' ? <FaEye /> : <FaEyeSlash />}
                    </p>
                    <input
                        type={passwordInputType.type}
                        name="memberPassword"
                        title="비밀번호 확인"
                        placeholder="PasswordCheck"
                        value={userPasswordCheck}
                        onChange={handlerChangeUserPasswordCheck}
                    />
                    {userPasswordCheck.length > 0 && (
                        <p className={`message ${isPasswordCheck ? 'success' : 'error'}`}>{userPasswordCheckMessage}</p>
                    )}
                </div>
                <Icon className={RegisterCSS.icon_pw2} icon="mdi:password" />
                <div className={RegisterCSS.username}>
                    <input
                        type="text"
                        name="name"
                        value={userName}
                        placeholder="Name"
                        autoComplete='off'
                        onChange={handlerChangeUserName}
                    />
                </div>
                <Icon className={RegisterCSS.icon_name} icon="gridicons:nametag" />
                <div className={ RegisterCSS.useremail }>
                    <input
                        type="text"
                        name="userEmail"
                        placeholder="Email"
                        value={userEmail}
                        onChange={handlerChangeUserEmail}
                    />
                    {userEmail.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{userEmailMessage}</span>
                    }
                    {isEmailSent ? (
                        <p>인증 이메일이 성공적으로 발송되었습니다. 이메일을 확인해주세요.</p>
                    ):(
                        <button className={ RegisterCSS.useremail_btn } onClick={handleVerification}>인증코드 받기</button>
                    )}
                </div>
                <Icon className={RegisterCSS.icon_email} icon="mdi:email-heart-outline" />
                <div className={ RegisterCSS.usercode}>
                    <input
                        type="text"
                        name='i_code'
                        placeholder='인증코드를 입력하세요.'
                        value={code}
                        onChange={handleCodeChange}
                    />
                    {isEmailCode ? (
                        <p>인증코드가 확인되었습니다.</p>
                    ):(
                        <button className={ RegisterCSS.usercode_btn } onClick={handlerCode}>인증코드 확인</button>
                    )}
                </div>
                <Icon className={ RegisterCSS.icon_code} icon="tabler:mail-code" />
                <div className={ RegisterCSS.userPhoneNumber}>
                    <input
                        type="text"
                        name="memberPhoneNumber"
                        placeholder="Phone Number"
                        onChange={handlerChangeUserPhoneNumber}
                    />
                </div>
                <Icon className={ RegisterCSS.icon_phone} icon="mingcute:phone-call-fill" />
                <div className={ RegisterCSS.userWeddingDate}>
                    <input
                        type="text"
                        name="memberWeddingDate"
                        placeholder="Wedding Date"
                        autoComplete='off'
                        value={moment(value).format("YYYY-MM-DD")}
                        onChange={handlerChangeUserWeddingDate}
                        readOnly
                    />
                    {/* <Calendar onChange={onChange} value={value} /> */}
                </div>
                <Icon className={ RegisterCSS.icon_wedding} icon="file-icons:ring" />
            </div>
            <div className={ RegisterCSS.submit_box}>
                <button
                    className={ RegisterCSS.submit_btn}
                    onClick={handlerOnClick}
                    type="submit"
                    disabled={!(userId && userPassword && isPasswordCheck && isEmail && userPhoneNumber && isEmailSent && isEmailCode)}
                >
                    Create Account
                </button>
            </div>
            <div className='login_box'>
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                    onClick = { onClickBackHandler }
                >
                    로그인 하기
                </button>
            </div>
        </div>
    );
}

export default Register;