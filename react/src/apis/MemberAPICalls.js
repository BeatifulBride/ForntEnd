
import {
    POST_LOGIN,
    GET_DRESSLIKE,
    GET_DRESSLIKEINDEX
} from '../modules/MemberModule';
import {
    GET_MAININFO
} from "../modules/MemberInfoModule";



export const callLoginAPI = ({form}) => {
    // const requestURL = `http://localhost:8080/auth/login`;
    const requestURL = `http://1.214.19.22:6900/auth/login`;

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

        console.log('[MemberAPICalls] callLoginAPI RESULT11111111111111: ', result);
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

/* 메인에 회원의 정보 */
export const callMainInfoAPI = (accessToken) => {
    const requestURL = `http://1.214.19.22:6900/mem/maininfo`;

    return async (dispatch) => {
        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + accessToken
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);

            }

            const data = await response.json();
            console.log(accessToken)
            console.log('[MemberAPICalls] callMainInfoAPI RESULT11111 : ', data);
            dispatch({ type: GET_MAININFO, payload: data });
        } catch (error) {
            console.error('Error fetching main info:', error);
        }
    };
};


/* 좋아요 버튼 */
export const callDressLikeAPI = ( dressIndex ) => {
    const requestURL = `http://1.214.19.22:6900/mem/mark/${dressIndex}`;
    return async (dispatch) => {
        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + window.sessionStorage.getItem("accessToken")
                }
            });

            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.text();
            console.log('[MemberAPICalls] callDressLikeAPI RESULT1111 : ', data);
            dispatch({ type: GET_DRESSLIKE, payload: data });
            return data;
        } catch (error) {
            console.error('Error fetching error', error);
        }
    };
};

/* 좋아요가 눌린 드레스 인덱스 */
export const callDressLikeIndexAPI = () => {
    const requestURL = `http://1.214.19.22:6900/mem/mark/mymark`;
    return async(dispatch) => {
        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + window.sessionStorage.getItem("accessToken")
                }
            });

            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const data = await response.json()
            console.log('[MemberAPICalls] callDressLikeIndexAPI RESULT : ', data)
            dispatch( { type: GET_DRESSLIKEINDEX, payload: data })
            return data
        } catch (error){
            console.error('Error fetching error', error)
        }
    }
}


