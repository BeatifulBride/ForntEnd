
import { 
    GET_MEMBER
  , POST_LOGIN
  , POST_REGISTER
  , GET_MEMBER_INFO
} from '../modules/MemberModule';



export const callLoginAPI = ({form}) => {
    const requestURL = `http://localhost:8080/auth/login`;

    return async (dispatch, getState) => {

        /* 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능 */
        /* 서버에서 cors 허용을 해주어야 함 */
        /* headers에 Access-Control-Allow-Origin을 *로 해서 모든 도메인에 대해 허용한다. */
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*"
            },
            body: form
        })
            .then(response => response);

        console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
        // if(result.status === 200){
        //     window.localStorage.setItem('accessToken', result.data);
        // }
        dispatch({ type: POST_LOGIN,  payload: result });

    };
}




export const callLogoutAPI = () => {
    

    return async (dispatch, getState) => {            

        dispatch({ type: POST_LOGIN,  payload: '' });        
        console.log('[MemberAPICalls] callLogoutAPI RESULT : SUCCESS');
    };
}


// 회원 정보(이름,디데이정보)
export const callRegisterAPI = ({form}) => {
    const requestURL = `http://localhost:8080/auth/signup`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                memberId: form.memberId,
                memberPassword: form.memberPassword,
                memberName: form.memberName,
                memberEmail: form.memberEmail                
            })
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callRegisterAPI RESULT : ', result);        
        
        if(result.status === 201){
            dispatch({ type: POST_REGISTER,  payload: result });
        }        
    };
}

