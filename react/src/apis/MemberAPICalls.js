
import {
    GET_MEMBER
    , POST_LOGIN
} from '../modules/MemberModule';
import {
    GET_MAININFO
} from "../modules/MemberInfoModule";


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
            /* 로그인데이터를 가져올때 localStorage에 맴버네임 저장??? */
        })
        .then(response => response);

        console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);
        if(result.status === 200){
            window.localStorage.setItem('loginInfo', result.data);
        }
        dispatch({ type: POST_LOGIN,  payload: result });
        
    };
}



export const callLogoutAPI = () => {
    

    return async (dispatch, getState) => {            

        dispatch({ type: POST_LOGIN,  payload: '' });        
        console.log('[MemberAPICalls] callLogoutAPI RESULT : SUCCESS');
    };
}

export const callMainInfoAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/mem/maininfo`;

    return async (dispatch, getState) => {

        /* 클라이언트 fetch mode : no-cors 사용시 application/json 방식으로 요청이 불가능 */
        /* 서버에서 cors 허용을 해주어야 함 */
        /* headers에 Access-Control-Allow-Origin을 *로 해서 모든 도메인에 대해 허용한다. */
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "*/*",
                "Access-Control-Allow-Origin": "*"
            },

        })
            .then(response => response);

        dispatch({ type: GET_MAININFO,  payload: result });
    };
}



