import {getUsers, getQuestions} from "./_DB";

export function _getUsers() {
    return new Promise((res, ) => {
        getUsers()
            .on('value', (snapshot) => {
                res(snapshot.val());
            }, (errorObject) => {
                console.log("The read failed: " + errorObject.code);
                res();
            });
    });
}

export function _getQuestions() {
    return new Promise((res, ) => {

        getQuestions()
            .on('value', (snapshot) => {
                res(snapshot.val());
            }, (errorObject) => {
                console.log("The read failed: " + errorObject.code);
                return {};
            });
    });
}

function formatQuestion({optionOneText, optionTwoText, author, qid}) {
    return {
        id: qid,
        timestamp: Date.now(),
        author,
        optionOne: {
            votes: [],
            text: optionOneText,
        },
        optionTwo: {
            votes: [],
            text: optionTwoText,
        }
    };
}

export function _saveQuestion(question) {
    return new Promise((res, ) => {

        const authedUser = question.author;
        const newQRef = getQuestions().push();
        const authRef = getUsers().child(authedUser);
        let authData = {};
        authRef.on('value', (snapshot) => {
            authData = snapshot.val();
        });
        authData['questions'] = authData.questions ? authData.questions : [];

        const formattedQuestion = formatQuestion({
            ...question,
            qid: newQRef.key
        });

        newQRef.set(formattedQuestion)
            .then(() => {
                authRef.update({
                    questions: authData.questions.concat([newQRef.key])
                });
                res(formattedQuestion)
            });
    });
}

export function _saveQuestionAnswer({authedUser, qid, answer}) {
    return new Promise((res, ) => {

        const authRef = getUsers().child(authedUser).child('answers');

        authRef.update({
            [qid]: answer,
        });

        const qRef = getQuestions().child(qid).child(answer);
        let qData = {};
        qRef.on('value', (snapshot) => {
            qData = snapshot.val();
        });
        qData['votes'] = qData.votes ? qData.votes : [];

        qRef.update({
            votes: qData.votes.concat([authedUser])
        });

        res();

    })
}
