
import { createActions, handleActions } from 'redux-actions';


const initialState = {
    data: null
};


export const GET_MAININFO = 'member/GET_MAININFO';

export const { getMaininfo } = createActions({
    [GET_MAININFO]: data => data
});

// 리듀서
const memberInfoReducer = handleActions(
    {
        [GET_MAININFO]: (state, { payload }) => {

            return { ...state, data: payload };
        },
    },
    initialState
);

export default memberInfoReducer;
