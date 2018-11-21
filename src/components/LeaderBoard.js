import React, {Component} from 'react';
import {Redirect, withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {LOGIN} from "../constants/routes";
import LeaderboardCard from "./LeaderboardCard";
import Typography from "@material-ui/core/Typography/Typography";

class LeaderBoard extends Component {

    render() {

        const {rankings, authedUser, location} = this.props;

        if (!authedUser) {
            return <Redirect to={{
                pathname: LOGIN,
                state: {redirectUrl: location.pathname}
            }}/>
        }

        return (
            <div>
                <Typography variant="display1" align={"center"}>
                    Leader Board
                </Typography>
                {rankings.map((u, rank) => (
                    <LeaderboardCard id={u} key={u} rank={rank + 1}/>
                ))}
            </div>
        )
    }

}

function mapStateToProps({authedUser, users}) {
    return {
        authedUser,
        rankings: Object.keys(users)
            .sort((a, b) => (
                (users[b].answers ? Object.keys(users[b].answers).length : 0) +
                (users[b].questions ? users[b].questions.length : 0)
            ) - (
                (users[a].answers ? Object.keys(users[a].answers).length : 0) +
                (users[a].questions ? users[a].questions.length : 0)))
    }
}

export default withRouter(connect(mapStateToProps)(LeaderBoard));