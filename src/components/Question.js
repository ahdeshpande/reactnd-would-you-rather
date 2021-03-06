import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import Button from "@material-ui/core/Button/Button";
import {Link, Redirect} from "react-router-dom";
import {compose} from "recompose";
import {LOGIN} from "../constants/routes";

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
    pollLink: {
        display: 'block',
        width: '90%',
    },
    pollButton: {
        display: 'inline-block',
        width: '100%',
    }
});

class Question extends Component {

    render() {
        const {classes, question, author, authedUser, location} = this.props;

        if (!authedUser) {
            return <Redirect to={{
                pathname: LOGIN,
                state: {redirectUrl: location.pathname}
            }}/>
        }

        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cover}
                    image={author.avatarURL}
                    title={`Avatar of ${author.name}`}
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h6" variant="h6">
                            {author.name} asks:
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Would you rather . . .
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            {question.optionOne.text} . . .
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>
                        <Link
                            to={`/question/${question.id}`}
                            className={classes.pollLink}>
                            <Button variant="outlined" color="primary"
                                    className={classes.pollButton}>
                                View Poll
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        )
    }
}

Question.propTypes = {
    questionId: PropTypes.string.isRequired,
};

function mapStateToProps({authedUser, questions, users}, {questionId}) {
    const question = questions[questionId];

    return {
        authedUser,
        question,
        author: question ? users[question.author] : undefined
    }
}

export default compose(withStyles(styles, {withTheme: true}),
    connect(mapStateToProps),)(Question);