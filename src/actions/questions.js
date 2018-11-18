import {_saveQuestion} from "../utils/_DATA";
import {hideLoading, showLoading} from "react-redux-loading";

export const ADD_QUESTION = 'ADD_QUESTION';
export const GET_QUESTIONS = 'GET_QUESTIONS';

export function getQuestions(questions){
    return {
        type: GET_QUESTIONS,
        questions,
    }
}

function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {

        const {authedUser} = getState();
        dispatch(showLoading());

        return _saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser,
        })
            .then((question) => {
                dispatch(addQuestion(question));
            })
            .then(() => dispatch(hideLoading()));
    }
}