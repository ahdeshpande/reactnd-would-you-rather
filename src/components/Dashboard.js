import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import {connect} from "react-redux";
import Question from "./Question";


const styles = theme => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    list: {
        listStyle: 'none',
        margin: '10px auto',
        maxWidth: '60%'
    },
})

class Dashboard extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const {classes, questionIds, self} = this.props;

        return (
            <div>
                <main className={classes.content}>
                    {questionIds.map(id =>(
                        <li key={id} className={classes.list}>
                            <Question questionId={id}/>
                        </li>
                    ))}
                </main>
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users}) {
    console.log(users);
    return {
        authedUser,
        self: Object.keys(users)
            .filter(id => id === authedUser),
        questionIds: Object.keys(questions),
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(Dashboard));