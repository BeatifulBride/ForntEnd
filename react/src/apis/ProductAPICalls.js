
import {
        GET_DRESSLIST
      , GET_DRESSSELECT
} from '../modules/ProductModule.js';


// main selectTopList
// export const callDressSelectAPI = () => {
//
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/dress/top5?`;
//
//     return async (dispatch, getState) => {
//         const response = await fetch(requestURL, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//                 "Accept": "*/*"
//             }
//         });
//
//         const result = await response;
//
//         console.log('[ProduceAPICalls] callDressSelectAPI RESULT : ', result);
//
//         dispatch({ type: GET_DRESSSELECT, payload: result.data });
//     };
// };

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

