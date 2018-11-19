import React, {Component} from 'react';
import {connect} from "react-redux";
import classNames from 'classnames';
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
import {DASHBOARD, LOGIN} from "../constants/routes";
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
    progressBar: {
        display: 'block',
        width: '90%',
        height: 20,
    },
    optionContainer: {
        border: '1px solid #f3f3f3',
        padding: 10,
        width: '100%'
    },
    option__wrap: {
        display: 'flex',
        maxWidth: '90%',
    },
});

class Result extends Component {

    render() {
        const {classes, question, author, authedUser} = this.props;

        if (!authedUser) {
            return <Redirect to={LOGIN}/>
        }

        const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
        const votesOptionA = totalVotes > 0 ? question.optionOne.votes.length / totalVotes * 100 : 0;
        const votesOptionB = totalVotes > 0 ? question.optionTwo.votes.length / totalVotes * 100 : 0;

        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cover}
                    image={author.avatarURL}
                    title={`Avatar of ${author.name}`}
                />
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

                        <Badge className={classes.option__wrap}
                               badgeContent={question.optionOne.votes.includes(authedUser) && "You"}
                               color={!question.optionOne.votes.includes(authedUser) ? '' : 'primary'}>
                            <div className={classes.optionContainer}>
                                <Typography variant="subtitle1"
                                            color="textSecondary">
                                    Would you rather {question.optionOne.text}
                                </Typography>
                                <LinearProgress variant="determinate"
                                                className={classes.progressBar}
                                                value={votesOptionA}/>
                                <Typography variant="subtitle1"
                                            color="textSecondary">
                                    {`${question.optionOne.votes.length} out of ${totalVotes}. (${votesOptionA}%)`}
                                </Typography>
                            </div>
                        </Badge>

                        <br/>

                        <Badge className={classes.option__wrap}
                               badgeContent={question.optionTwo.votes.includes(authedUser) && "You"}
                               color={!question.optionTwo.votes.includes(authedUser) ? '' : 'primary'}>
                            <div className={classes.optionContainer}>
                                <Typography variant="subtitle1"
                                            color="textSecondary">
                                    Would you rather {question.optionTwo.text}
                                </Typography>
                                <LinearProgress variant="determinate"
                                                className={classes.progressBar}
                                                value={votesOptionB}/>
                                <Typography variant="subtitle1"
                                            color="textSecondary">
                                    {`${question.optionTwo.votes.length} out of ${totalVotes}. (${votesOptionB}%)`}
                                </Typography>
                            </div>
                        </Badge>

                    </CardContent>
                </div>
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
        author: question && users[question.author]
    }
}

export default withRouter(compose(withStyles(styles, {withTheme: true}),
    connect(mapStateToProps),)
(Result));