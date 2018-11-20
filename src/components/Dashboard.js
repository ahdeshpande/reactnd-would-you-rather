import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";
import {connect} from "react-redux";
import Question from "./Question";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel
    from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import FormControl from "@material-ui/core/FormControl/FormControl";


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
    formControl: {
        display: 'block',
        margin: `${theme.spacing.unit * 3}px auto`,
        maxWidth: '60%',
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
        flexDirection: 'row',
    },
    questionTypeLabels: {
        width: '50%',
        margin: 0,
    }
});

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: 'UQ',
        };

    }

    handleChange = event => {
        this.setState({answer: event.target.value});
    };

    render() {
        const {classes, questions, self} = this.props;

        const filteredQuestions = Object.keys(questions).filter(id => {
            if (this.state.answer === 'AQ') {
                if (self.answers[id] !== undefined) {
                    return id;
                }
                return null;
            } else {
                if (self.answers[id] === undefined) {
                    return id;
                }
                return null;
            }
        });

        return (
            <div>
                <main className={classes.content}>
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
                                className={classes.questionTypeLabels}
                                value="UQ"
                                control={<Radio color="primary"/>}
                                label="Unanswered Questions"
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                className={classes.questionTypeLabels}
                                value="AQ"
                                control={<Radio color="primary"/>}
                                label="Answered Questions"
                                labelPlacement="end"
                            />
                        </RadioGroup>
                    </FormControl>

                    {filteredQuestions
                        .sort((a, b) => (questions[b].timestamp - questions[a].timestamp))
                        .map(id => (
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
    return {
        authedUser,
        self: users[authedUser],
        questions,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(Dashboard));