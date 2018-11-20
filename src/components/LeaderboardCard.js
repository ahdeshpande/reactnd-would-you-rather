import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect, withRouter} from "react-router-dom";
import {LOGIN} from "../constants/routes";
import Card from "@material-ui/core/Card/Card";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import {connect} from "react-redux";
import {compose} from "recompose";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    card: {
        display: 'flex',
        margin: '20px auto',
        maxWidth: '80%',
        padding: 15,
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
    score: {
        display: 'flex',
        flexDirection: 'column',
        margin: '5px 10px',
        width: '30%',
        textAlign: 'center',
        border: '1px solid #838383',
        borderRadius: 3,
    },
    faded: {
        opacity: 0.3,
    },
    scoreHeader: {
       padding: 10,
    },
    scoreValue: {
        margin: 'auto 0',
    }
});

class LeaderboardCard extends Component {

    render() {
        const {classes, user, rank} = this.props;


        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cover}
                    image={user.avatarURL}
                    title={`Avatar of ${user.name}`}
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h4" variant="h4">
                            #{rank} - {user.name}
                        </Typography>
                        <br/>
                        <Typography variant="body1">
                            Answered
                            Questions: {Object.keys(user.answers).length}
                        </Typography>
                        <hr className={classes.faded}/>
                        <Typography variant="body1">
                            Created Questions: {user.questions.length}
                        </Typography>
                    </CardContent>
                </div>
                <div className={classes.score}>
                    <CardContent className={classes.content}>
                        <Typography variant="body1"
                                    className={classes.scoreHeader}>
                            Score
                        </Typography>
                        <hr/>
                        <Typography variant="title"
                                    className={classes.scoreValue}>
                            {Object.keys(user.answers).length + user.questions.length}
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        )
    }
}

LeaderboardCard.propTypes = {
    id: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
};

function mapStateToProps({users}, {id}) {
    const user = users[id];
    return {
        user,
    }
}

export default withRouter(compose(withStyles(styles, {withTheme: true}),
    connect(mapStateToProps),)
(LeaderboardCard));