import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import productReducer from './ProductModule';


const rootReducer = combineReducers({
    memberReducer,
    productReducer,
});

export default rootReducer;
