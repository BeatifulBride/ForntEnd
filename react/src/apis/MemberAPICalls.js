
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
        /* 서버에을서 cors 허용을 해주어야 함 */
        /* headers에 Access-Control-Allow-Origin *로 해서 모든 도메인에 대해 허용한다. */
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


export const callMainInfoAPI = (loginId) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/mem/maininfoTest?loginId=${loginId}`;

    return async (dispatch) => {
        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('[MemberAPICalls] callMainInfoAPI RESULT1 : ', data);

            dispatch({ type: GET_MAININFO, payload: data });
        } catch (error) {
            console.error('Error fetching main info:', error);
        }
    };
};




