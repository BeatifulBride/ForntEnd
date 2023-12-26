import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    data: [],
    tryOnResult: null,
    tryOnError: null
};

/* 액션 */
export const GET_DRESSLIST   = 'product/GET_DRESSLIST';
export const GET_DRESSSELECT = 'product/GET_DRESSSELECT'

export const TRY_ON_SUCCESS = 'product/TRY_ON_SUCCESS';
export const TRY_ON_FAIL = 'product/TRY_ON_FAIL';

const actions = createActions({
    [GET_DRESSLIST]: payload => payload,
    [GET_DRESSSELECT]: payload => payload,
    [TRY_ON_SUCCESS]: payload => payload,
    [TRY_ON_FAIL]: payload => payload
});


/* 리듀서 */
const productReducer = handleActions(
    {
        [GET_DRESSLIST]: (state, { payload }) => {
            return { ...state, data: payload };
        },
        [GET_DRESSSELECT]: (state, { payload }) => {
            return { ...state, data: payload };
        },
        [TRY_ON_SUCCESS]: (state, { payload }) => {
            // 'Try-on' 성공 결과를 상태에 반영하는 로직
            return { ...state, tryOnResult: payload };
        },
        [TRY_ON_FAIL]: (state, { payload }) => {
            // 'Try-on' 실패 결과를 상태에 반영하는 로직
            return { ...state, tryOnError: payload };
        }
    },
    initialState
);

export default productReducer;