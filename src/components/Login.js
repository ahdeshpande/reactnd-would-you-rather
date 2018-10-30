import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import {GoogleLogin} from "react-google-login";
import FacebookLogin from "react-facebook-login";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
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

        // TODO: Authenticate User

    };

    render() {
        const responseGoogle = (response) => {
            console.log(response);
        };

        const responseFacebook = (response) => {
            console.log(response);
        }

        return (

            <div className="outer__container">
                <form className="form tb__container shadow" autoComplete="off"
                      onSubmit={this.hadnleSubmit}>
                    {/*<h3>Login</h3>*/}
                    <div className="form__inner">
                        <TextField
                            required
                            id="outlined-required"
                            label="Username"
                            margin="normal"
                            variant="outlined"
                            name="username"
                            value={this.state.username}
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
                        <Button color="primary" variant="contained">
                            Login
                        </Button>
                        <h3>OR</h3>
                        <GoogleLogin
                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                        />
                        <br/>
                        <FacebookLogin
                            appId="1088597931155576"
                            autoLoad={true}
                            fields="name,email,picture"
                            onClick={() => {
                            }}
                            callback={responseFacebook}/>
                    </div>
                </form>
            </div>

        )

    }
}

Login.propTypes = {};

export default Login;