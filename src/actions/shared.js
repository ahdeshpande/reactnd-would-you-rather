import {hideLoading, showLoading} from "react-redux-loading";
import {getInitialData} from "../utils/api";
import {getQuestions} from "./questions";
// import {setAuthedUser} from "./authedUser";

// const AUTHED_ID = 'ahdeshpande';

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading);
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(getQuestions(questions));
                // dispatch(setAuthedUser(AUTHED_ID));
                dispatch(hideLoading);
            });
    };
}