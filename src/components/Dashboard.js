import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import Question from "./Question";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel
    from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import FormControl from "@material-ui/core/FormControl/FormControl";
import {Redirect} from "react-router-dom";
import {LOGIN} from "../constants/routes";


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

        if (!self) {
            return <Redirect to={LOGIN}/>
        }

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
        self: authedUser ? users[authedUser] : undefined,
        questions,
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(Dashboard));