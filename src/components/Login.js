import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import {userLogin} from "../utils/_DB";
import {DASHBOARD, SIGN_UP} from "../constants/routes";
import {setAuthedUser} from "../actions/authedUser";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
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

        const {email, password} = this.state;
        const {dispatch} = this.props;

        userLogin(email, password)
            .then((res) => {
                dispatch(setAuthedUser(res.user.uid));
                this.props.redirectTo(DASHBOARD);
            })
            .catch(error => {
                alert(error.message);
            });
    };

    render() {

        return (

            <div className="outer__container">
                <form className="form tb__container shadow" autoComplete="off"
                      onSubmit={this.handleSubmit}>

                    <div className="form__inner">
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
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        <br/>
                        <Button color="primary" variant="contained"
                                type="submit">
                            Login
                        </Button>
                        <br/>
                        <br/>
                        Do not have an account? <Link to={SIGN_UP}>
                        Sign up
                    </Link>

                    </div>
                </form>
            </div>

        )

    }
}

Login.propTypes = {
    redirectTo: PropTypes.func.isRequired,
};

export default connect()(Login);