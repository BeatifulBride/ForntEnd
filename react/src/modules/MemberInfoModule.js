import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MAININFO = 'member/GET_MAININFO';

const actions = createActions({
    [GET_MAININFO]: () => {}
});

/* 리듀서 */
const memberInfoReducer = handleActions(
    {
        [GET_MAININFO]: (state, { payload}) => {

            return payload
        }
    },
    initialState
);

export default memberInfoReducer;