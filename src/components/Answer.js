import React, {Component} from 'react';
import {connect} from "react-redux";
import {Badge, LinearProgress, withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Button from "@material-ui/core/Button/Button";
import {compose} from "recompose";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel
    from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import FormControl from "@material-ui/core/FormControl/FormControl";
import {LOGIN, PAGE404} from "../constants/routes";
import {Redirect, withRouter} from "react-router-dom";
import {handleAnswerQuestion} from "../actions/shared";

const styles = theme => ({
    card: {
        display: 'flex',
        margin: '20px auto',
        maxWidth: '80%',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        width: '100%',
    },
    content: {
        flex: '1 0 auto',
        padding: 0,
        alignItems: 'left',
    },
    cover: {
        width: 128,
        backgroundSize: 'contain',
        margin: '0 15px',
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        width: '100%',
    },
    pollButton: {
        display: 'block',
        width: '90%',
    },
    formControl: {
        maxWidth: '80%',
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
        flexDirection: 'wrap',
    },
    progressBar: {
        display: 'block',
        width: '100%',
        height: 20,
    },
    optionContainer: {
        border: '1px solid #838383',
        padding: 10,
        width: '100%'
    },
    option__wrap: {
        display: 'flex',
        maxWidth: '90%',
    },
    myVote: {
        backgroundColor: 'rgb(63, 81, 181, 0.15)',
    }
});

class Answer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: '',
            submitSent: false,
        };
    }

    handleChange = event => {
        this.setState({answer: event.target.value});
    };

    submitAnswer = e => {
        e.preventDefault();

        this.setState(() => ({submitSent: true}));
        const {dispatch, question, history} = this.props;

        dispatch(handleAnswerQuestion(question.id, this.state.answer))
            .then(() => history.push(`/question/${question.id}`))
            .catch(() => this.setState(() => ({submitSent: false})));
    };

    render() {
        const {classes, question, author, authedUser, location} = this.props;

        if (!authedUser) {
            return <Redirect to={{
                pathname: LOGIN,
                state: {redirectUrl: location.pathname}
            }}/>
        } else if (!question) {
            return <Redirect to={{
                pathname: PAGE404,
            }}/>
        }

        const voteCountOne = question.optionOne.votes ? question.optionOne.votes.length : 0;
        const voteCountTwo = question.optionTwo.votes ? question.optionTwo.votes.length : 0;

        const totalVotes = voteCountOne + voteCountTwo;
        const votesOptionA = totalVotes > 0 ? (voteCountOne / totalVotes * 100).toFixed(2) : 0;
        const votesOptionB = totalVotes > 0 ? (voteCountTwo / totalVotes * 100).toFixed(2) : 0;


        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cover}
                    image={author.avatarURL}
                    title={`Avatar of ${author.name}`}
                />

                {
                    (question.optionOne.votes && question.optionOne.votes.includes(authedUser)) || (question.optionTwo.votes && question.optionTwo.votes.includes(authedUser))
                        ?
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h4" variant="h4">
                                    Asked by {author.name}
                                </Typography>

                                <br/>

                                <Typography component="h5" variant="h5"
                                            color="textSecondary">
                                    Results:
                                </Typography>

                                <Badge
                                    className={`${classes.option__wrap} ${question.optionOne.votes && question.optionOne.votes.includes(authedUser) && classes.myVote}`}
                                    badgeContent={(question.optionOne.votes && question.optionOne.votes.includes(authedUser)) ? "You" : ""}
                                    color={!(question.optionOne.votes && question.optionOne.votes.includes(authedUser)) ? 'default' : 'primary'}
                                >
                                    <div className={classes.optionContainer}>
                                        <Typography variant="subtitle1"
                                                    color="textSecondary">
                                            Would you
                                            rather {question.optionOne.text}
                                        </Typography>
                                        <LinearProgress variant="determinate"
                                                        className={classes.progressBar}
                                                        value={parseInt(votesOptionA)}/>
                                        <Typography variant="subtitle1"
                                                    color="textSecondary">
                                            {`${voteCountOne} out of ${totalVotes}. (${votesOptionA}%)`}
                                        </Typography>
                                    </div>
                                </Badge>

                                <br/>

                                <Badge
                                    className={`${classes.option__wrap} ${question.optionTwo.votes && question.optionTwo.votes.includes(authedUser) && classes.myVote}`}
                                    badgeContent={(question.optionTwo.votes && question.optionTwo.votes.includes(authedUser)) ? "You" : ""}
                                    color={!(question.optionTwo.votes && question.optionTwo.votes.includes(authedUser)) ? 'default' : 'primary'}
                                >
                                    <div className={classes.optionContainer}>
                                        <Typography variant="subtitle1"
                                                    color="textSecondary">
                                            Would you
                                            rather {question.optionTwo.text}
                                        </Typography>
                                        <LinearProgress variant="determinate"
                                                        className={classes.progressBar}
                                                        value={parseInt(votesOptionB)}/>
                                        <Typography variant="subtitle1"
                                                    color="textSecondary">
                                            {`${voteCountTwo} out of ${totalVotes}. (${votesOptionB}%)`}
                                        </Typography>
                                    </div>
                                </Badge>

                            </CardContent>
                        </div>
                        :
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h6" variant="h6">
                                    {author.name} asks:
                                </Typography>
                                <Typography variant="subtitle1"
                                            color="textSecondary">
                                    Would you rather . . .
                                </Typography>
                                <FormControl component="fieldset"
                                             className={classes.formControl}>
                                    <RadioGroup
                                        aria-label="questionTypes"
                                        name="questionTypes"
                                        className={classes.group}
                                        value={this.state.answer}
                                        onChange={this.handleChange}
                                    >
                                        <FormControlLabel
                                            value="optionOne"
                                            control={<Radio color="primary"/>}
                                            label={question.optionOne.text}
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            value="optionTwo"
                                            control={<Radio color="primary"/>}
                                            label={question.optionTwo.text}
                                            labelPlacement="end"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </CardContent>
                            <div className={classes.controls}>
                                <Button variant="contained" color="primary"
                                        disabled={this.state.submitSent || this.state.answer === ''}
                                        className={classes.pollButton}
                                        onClick={this.submitAnswer}>
                                    Answer
                                </Button>
                            </div>
                        </div>
                }
            </Card>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, props) {
    const {questionId} = props.match.params;
    const question = questions[questionId];

    return {
        authedUser,
        question,
        author: question ? users[question.author] : undefined
    }
}

export default withRouter(compose(withStyles(styles, {withTheme: true}),
    connect(mapStateToProps),)(Answer));