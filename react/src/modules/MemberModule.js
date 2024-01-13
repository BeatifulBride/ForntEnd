import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    likedDresses: {},

};

/* 액션 */
export const GET_MEMBER     = 'member/GET_MEMBER';
export const POST_LOGIN     = 'member/POST_LOGIN';
export const POST_REGISTER  = 'member/POST_REGISTER';
export const GET_MEMBER_INFO = 'member/GET_MEMBER_INFO';
export const GET_DRESSLIKE = 'member/GET_DRESSLIKE';
export const GET_DRESSLIKEINDEX = 'member/GET_DRESSLIKEINDEX';
export const ADD_TO_FAVORITES = 'member/ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'member/REMOVE_FROM_FAVORITES';



const actions = createActions({
    [GET_MEMBER]: () => {},
    [POST_LOGIN]: () => {},
    [POST_REGISTER]: () => {},
    [GET_MEMBER_INFO]: () => {},
    [GET_DRESSLIKE]: () => {},
    [GET_DRESSLIKEINDEX]: () => {},

    [ADD_TO_FAVORITES]: payload => payload,
    [REMOVE_FROM_FAVORITES]: payload => payload,

});

/* 리듀서 */
const memberReducer = handleActions(
    {
        [GET_MEMBER]: (state, { payload }) => {
            
            return payload;
        },
        [POST_LOGIN]: (state, { payload }) => {
            
            return payload;
        },
        [POST_REGISTER]: (state, { payload }) => {

            return payload;
        },
        [GET_MEMBER_INFO]: (state, { payload }) => {

            return payload;
        },
        [GET_DRESSLIKE]: (state, { payload }) => {

            return payload;
        },
        [GET_DRESSLIKEINDEX]: (state, { payload }) => {
            let updatedLikedDresses = {};
            payload.forEach(dressIndex => {
                updatedLikedDresses[dressIndex] = true;
            });
            return { ...state, likedDresses: updatedLikedDresses };
        },
        [ADD_TO_FAVORITES]: (state, { payload }) => {
            return { ...state, likedDresses: { ...state.likedDresses, [payload]: true }};
        },

        [REMOVE_FROM_FAVORITES]: (state, { payload }) => {
            const newLikedDresses = { ...state.likedDresses };
            delete newLikedDresses[payload];
            return { ...state, likedDresses: newLikedDresses };
        }


    },
    initialState
);

export default memberReducer;