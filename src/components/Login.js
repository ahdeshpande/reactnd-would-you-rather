import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import {getCurrentUser, setAuthListener, userLogin} from "../utils/_DB";
import {Link} from "react-router-dom";

class Login extends Component {
    constructor(props) {
        super(props);

        console.log(setAuthListener());

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

        userLogin(email, password)
            .then((res) => {
                res.user.getIdToken().then(token => {
                    localStorage.setItem("user", JSON.stringify(token));
                });
                if(getCurrentUser()) {
                    this.props.redirectTo('/dashboard');
                }
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
                        Do not have an account? <Link to='/signup'>
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

export default Login;