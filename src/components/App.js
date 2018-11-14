import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import Login from "./Login";
import Header from "./Header";
import SignUp from "./SignUp";
import Dashboard from './Dashboard';
import {DASHBOARD, LANDING, LOGIN, SIGN_UP} from "../constants/routes";
import {handleInitialData} from "../actions/shared";
import {connect} from "react-redux";
import {setAuthedUser} from "../actions/authedUser";

class App extends Component {

    constructor(props) {
        super(props);
        // console.log(getCurrentUser());
        // validateUser()
        //     .then(res => console.log(res))
        //     .catch(error => console.log(error))
    };

    componentDidMount() {
        this.props.dispatch(handleInitialData());
        const {authedUser} = this.props;
        if (authedUser) {
            this.redirectTo(DASHBOARD);
        } else {
            this.redirectTo(LOGIN);
        }
    }

    redirectTo = to => {
        this.props.history.push(to);
    };

    logout = () => {
        this.props.dispatch(setAuthedUser(null));
        this.redirectTo(LANDING);
    };

    render() {
        const {authedUser} = this.props;
        return (
            <div>
                <Header user={authedUser} onLogout={this.logout}/>

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

function mapStateToProps({authedUser}) {
    return {
        authedUser,
    }
}

export default withRouter(connect(mapStateToProps)(App));
