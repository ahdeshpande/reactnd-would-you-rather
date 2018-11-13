import {combineReducers} from 'redux';
import {loadingBarReducer} from "react-redux-loading";
import questions from "./questions";

export default combineReducers({
    questions,
    loadingBar: loadingBarReducer,
})