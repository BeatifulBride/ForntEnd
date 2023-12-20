import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_DRESSLIST   = 'product/GET_DRESSLIST';
export const GET_DRESSSELECT = 'product/GET_DRESSSELECT'

const actions = createActions({
    [GET_DRESSLIST]: () => {},
    [GET_DRESSSELECT]: () => {}
});

/* 리듀서 */
const productReducer = handleActions(
    {
        [GET_DRESSLIST]: (state, { payload}) => {
            return payload;
        },
        [GET_DRESSSELECT]: (state, { payload}) => {
            return payload;
        }
    },
    initialState
);

export default productReducer;