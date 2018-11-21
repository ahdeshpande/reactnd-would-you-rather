import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";

import {addUser, userSignUp} from "../utils/_DB";
import {Link, withRouter} from "react-router-dom";
import {LOGIN} from "../constants/routes";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            confirm: '',
        }
    }

    handleChange = e => {
        const {name, value} = e.target;

        this.setState(() => ({
            [name]: value,
        }));
    };

    handleSubmit = e => {
        e.preventDefault();

        const {name, email, password, confirm} = this.state;

        if (password === confirm) {
            userSignUp(email, password)
                .then(res => {
                    console.log(res);
                    const uid = res.user.uid;
                    addUser(name, email, uid);
                    this.props.history.push(LOGIN);
                })
                .catch(error => {
                    alert(error.message);
                });
        } else {
            alert('Passwords do not match.');
        }
    };

    render() {

        return (

            <div className="outer__container">
                <form className="form tb__container shadow" autoComplete="off"
                      onSubmit={this.handleSubmit}>
                    <div className="form__inner">
                        <TextField
                            required
                            id="name"
                            label="Name"
                            margin="normal"
                            variant="outlined"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            margin="normal"
                            variant="outlined"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        <TextField
                            required
                            id="password"
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <TextField
                            required
                            id="confirm"
                            label="Confirm Password"
                            type="password"
                            name="confirm"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            value={this.state.confirm}
                            onChange={this.handleChange}
                        />
                        <br/>
                        <Button color="primary" variant="contained"
                                type="submit">
                            Sign Up
                        </Button>
                        <br/>
                        <br/>
                        Already have an account? <Link to={LOGIN}>
                        Login
                    </Link>
                    </div>
                </form>
            </div>

        )

    }
}

export default withRouter(SignUp);