# Would You Rather Project

The Would You Rather project is a React and Redux web application  that lets 
a user play the “Would You Rather?” game. The game goes like this: A user is 
asked a question in the form: “Would you rather [option A] or [option B] ?”. 
Answering "neither" or "both" is against the rules. Users are able to 
answer questions, see which questions they haven’t answered, see how other 
people have voted, post questions, and see the ranking of users on the 
leaderboard.

This project is live [here](https://wouldyou.herokuapp.com/).

This project was bootstrapped with
[Create React App](https://github.com/facebookincubator/create-react-app).

## Installing the project
* install all project dependencies with `npm install`

## Run the project
* start the development server with `npm start`

## Data

The project makes use of the Firebase SDK to serve the database for 
users and questions.

A further explanation of the data follows:

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |
