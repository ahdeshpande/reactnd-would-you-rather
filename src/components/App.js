import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import Login from "./Login";
import Header from "./Header";
import SignUp from "./SignUp";
import Dashboard from './Dashboard';
import {
    getCurrentUser,
    setAuthListener,
    userSignOut,
    validateUser
} from "../utils/_DB";
import {DASHBOARD, LANDING, LOGIN, SIGN_UP} from "../constants/routes";

class App extends Component {

    constructor(props) {
        super(props);
        // console.log(getCurrentUser());
        // validateUser()
        //     .then(res => console.log(res))
        //     .catch(error => console.log(error))
    };

    componentDidMount = () => {
        // console.log(setAuthListener());
        if (setAuthListener()) {
            this.redirectTo(DASHBOARD);
        } else {
            this.redirectTo(LOGIN);
        }
    };

    redirectTo = to => {
        this.props.history.push(to);
    };

    logout = () => {
        if (!userSignOut()) {
            this.redirectTo(LANDING);
        } else {
            alert('Logout failed. Try again.');
        }
    };

    render() {
        return (
            <div>
                <Header user={getCurrentUser()} onLogout={this.logout}/>
                <div className="app__header__padding"/>
                <Route exact path={LOGIN} render={() => (
                    <Login redirectTo={this.redirectTo}/>
                )}/>
                <Route exact path={SIGN_UP} render={() => (
                    <SignUp/>
                )}/>
                <Route exact path={DASHBOARD} render={() => (
                    <Dashboard/>
                )}/>
            </div>
        );
    }
}

export default withRouter(App);
