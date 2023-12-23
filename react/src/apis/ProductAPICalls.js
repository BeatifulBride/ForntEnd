
import {
    GET_DRESSLIST
    , GET_DRESSSELECT, TRY_ON_FAIL, TRY_ON_SUCCESS
} from '../modules/ProductModule.js';



// Dress 좋아요 버튼 API
// export const callDressLikeAPI = (form) => {
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/dress/like?`;
//
//     return async (dispatch, getState) => {
//         const response = await fetch(requestURL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 "Accept": "*/*"
//             },
//             body: form
//         });
//
//         const result = await response
//
//         dispatch({ type: POST_DRESSLIKE, payload: result.data })
//     }
// }


export const callDressListAPI = () => {
    const requestURL = `http://1.214.19.22:6900/dress/list`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            const result = await response.json();
            if (response.ok) {
                console.log('[ProductAPICalls] callDressListAPI RESULT1 : ', result);
                dispatch({ type: GET_DRESSLIST, payload: result });
            } else {
                // 오류 처리
                console.error('API Error:', result);
            }
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    };

}

export const callDressSelectTopAPI =() => {
    const requestURL = `http://1.214.19.22:6900/dress/top5`;


    return async (dispatch) => {
        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            const result = await response.json()
            if (response.ok) {
                console.log('[ProductAPICalls] callDressSelectTopAPI RESULT : ', result)
                dispatch({ type: GET_DRESSSELECT, payload: result })
            } else {
                console.error('API Error:', result)
            }
        } catch (error) {
            console.error('Fetch Error:', error)
        }
    }
}

export const callTryOnAPI = (image, dressData) => {
    const requestURL = 'http://1.214.19.22:6900/tryon/starttryon';

    return async (dispatch) => {
        try {
            const formData = new FormData();
            formData.append('multipartFile', image);
            formData.append('companyName', dressData.companyName);
            formData.append('dressIndex', dressData.dressIndex);

            const response = await fetch(requestURL, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                console.log('[TryOnAPICalls] callTryOnAPI RESULT: ', result);
                // 성공 액션 디스패치
                dispatch({ type: TRY_ON_SUCCESS, payload: result });
            } else {
                // 오류 액션 디스패치
                dispatch({ type: TRY_ON_FAIL, payload: result });
            }
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    };
}


