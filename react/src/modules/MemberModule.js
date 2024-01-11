import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MEMBER     = 'member/GET_MEMBER';
export const POST_LOGIN     = 'member/POST_LOGIN';
export const POST_REGISTER  = 'member/POST_REGISTER';
export const GET_MEMBER_INFO = 'member/GET_MEMBER_INFO';
export const GET_DRESSLIKE = 'member/GET_DRESSLIKE';
export const GET_DRESSLIKEINDEX = 'member/GET_DRESSLIKEINDEX';


const actions = createActions({
    [GET_MEMBER]: () => {},
    [POST_LOGIN]: () => {},
    [POST_REGISTER]: () => {},
    [GET_MEMBER_INFO]: () => {},
    [GET_DRESSLIKE]: () => {},
    [GET_DRESSLIKEINDEX]: () => {},

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

            return [...payload];
        }


    },
    initialState
);

export default memberReducer;