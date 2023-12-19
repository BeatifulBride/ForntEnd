
import {
    GET_DRESSLIST
} from '../modules/ProductModule.js';


// 아직 완성안된코드
export const callDressSelectAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/dress/top5?`;

    return async (dispatch, getState) => {
        const response = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "*/*"
            }
        });

        const result = await response;

        // console.log('[ProduceAPICalls] callDressSelectAPI RESULT : ', result);

        dispatch({ type: GET_DRESSLIST, payload: result.data });
    };
};

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

