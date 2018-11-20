import React, {Component} from 'react';
import {Redirect, withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {LOGIN} from "../constants/routes";
import LeaderboardCard from "./LeaderboardCard";
import Typography from "@material-ui/core/Typography/Typography";

class LeaderBoard extends Component {

    render() {

        const {rankings, authedUser} = this.props;

        if (!authedUser) {
            return <Redirect to={LOGIN}/>
        }

        return (
            <div>
                <Typography variant="display1" align={"center"}>
                    Leader Board
                </Typography>
                {rankings.map((u, rank) => (
                    <LeaderboardCard id={u} key={u} rank={rank+1}/>
                ))}
            </div>
        )
    }

}

function mapStateToProps({authedUser, users}) {
    return {
        authedUser,
        rankings: Object.keys(users)
            .sort((a, b) => (Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length))
    }
}

export default withRouter(connect(mapStateToProps)(LeaderBoard));