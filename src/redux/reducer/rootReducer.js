import {combineReducers} from "redux";
import dishReducer from "./dishReducer";
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    dish:dishReducer,
    form: formReducer,
});

export default rootReducer;