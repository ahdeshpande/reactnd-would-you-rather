import {hideLoading, showLoading} from "react-redux-loading";
import {getInitialData} from "../utils/api";
import {getQuestions} from "./questions";
import {getUsers} from "./users";
import {setAuthedUser} from "./authedUser";
import {_saveQuestionAnswer} from "../utils/_DATA";

const AUTHED_ID = null;

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading);
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(getQuestions(questions));
                dispatch(getUsers(users));
                dispatch(setAuthedUser(AUTHED_ID));
                dispatch(hideLoading);
            });
    };
}

export function handleAnswerQuestion(qId, answer) {
    return (dispatch, getState) => {

        const {authedUser} = getState();
        dispatch(showLoading());

        return _saveQuestionAnswer({
            authedUser: authedUser,
            qid: qId,
            answer: answer,
        })
            .then(() => {
                return getInitialData()
                    .then(({users, questions}) => {
                        dispatch(getQuestions(questions));
                        dispatch(getUsers(users));
                        dispatch(hideLoading);
                    });
            });
    }
}