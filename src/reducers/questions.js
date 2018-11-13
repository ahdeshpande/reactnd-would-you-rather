import {ADD_QUESTION, GET_QUESTIONS} from "../actions/questions";

export default function questions(state = {}, action) {
    switch (action.type) {
        case ADD_QUESTION:
            const {question} = action;
            return {
                ...state,
                [action.question.id]: question,
            };
        case GET_QUESTIONS:
            return {
                ...state,
                ...action.questions,
            };
        default:
            return state;
    }
}