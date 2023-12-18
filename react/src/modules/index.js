import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import productReducer from './ProductModule';
import memberInfoReducer from "./MemberInfoModule";


const rootReducer = combineReducers({
    memberReducer,
    productReducer,
    memberInfoReducer,
});

export default rootReducer;
