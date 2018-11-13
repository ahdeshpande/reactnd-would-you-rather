import {hideLoading, showLoading} from "react-redux-loading";
import {getInitialData} from "../utils/api";
import {getQuestions} from "./questions";
import {getUsers} from "./users";
import {setAuthedUser} from "./authedUser";

const AUTHED_ID = null;

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading);
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(getQuestions(questions));
                dispatch(getUsers(questions));
                dispatch(setAuthedUser(AUTHED_ID));
                dispatch(hideLoading);
            });
    };
}