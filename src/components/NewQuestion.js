import React, {Component} from 'react';
import {connect} from "react-redux";
import {handleAddQuestion} from "../actions/questions";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import {DASHBOARD} from "../constants/routes";
import {withRouter} from "react-router-dom";

class NewQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            optionA: '',
            optionB: '',
        };
    }

    handleChange = e => {
        const {name, value} = e.target;
        this.setState(() => ({
            [name]: value,
        }))
    };

    onAddNewQuestion = e => {
        e.preventDefault();
        this.props.dispatch(handleAddQuestion(this.state.optionA,
            this.state.optionB));
        this.props.history.push(DASHBOARD);
    };

    render() {

        const {optionA, optionB} = this.state;

        return (
            <div className="outer__container">
                <form method="post"
                      className="form tb__container shadow" autoComplete="off"
                      onSubmit={this.onAddNewQuestion}>
                    <div className="form__inner">
                        <h3>Create New Question</h3>
                        <hr/>
                        <p>Complete the question:</p>
                        <h4>Would you rather . . .</h4>

                        <TextField
                            id="optionA"
                            label="Option One"
                            type="text"
                            name="optionA"
                            autoComplete="off"
                            margin="normal"
                            variant="outlined"
                            placeholder={"Enter option one text here"}
                            value={this.state.optionA}
                            onChange={this.handleChange}
                        />
                        <h4>OR</h4>
                        <TextField
                            id="optionB"
                            label="Option Two"
                            type="text"
                            name="optionB"
                            autoComplete="off"
                            margin="normal"
                            variant="outlined"
                            placeholder={"Enter option two text here"}
                            value={this.state.optionB}
                            onChange={this.handleChange}
                        />
                        <br/>
                        <Button color="primary" variant="contained"
                                type="submit"
                                disabled={optionA === '' || optionB === ''}>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(connect()(NewQuestion));