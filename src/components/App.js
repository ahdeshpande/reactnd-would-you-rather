import React, {Component} from 'react';
import {Redirect, Route, withRouter} from 'react-router-dom';
import Login from "./Login";
import Header from "./Header";
import SignUp from "./SignUp";
import Dashboard from './Dashboard';
import {
    DASHBOARD,
    LANDING, LEADERBOARD,
    LOGIN,
    NEW_QUESTION,
    SIGN_UP
} from "../constants/routes";
import {handleInitialData} from "../actions/shared";
import {connect} from "react-redux";
import {setAuthedUser} from "../actions/authedUser";
import NewQuestion from "./NewQuestion";
import Answer from "./Answer";
import Result from "./Result";
import LeaderBoard from "./LeaderBoard";
import LoadingBar from "react-redux-loading-bar";

class App extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData());
        const {authedUser} = this.props;
        if (authedUser) {
            this.redirectTo(DASHBOARD);
        } else {
            return <Redirect to={{
                pathname: LOGIN,
                state: {redirectUrl: this.props.match.pathname}
            }}/>
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
        const {authedUser, loadingBar} = this.props;
        return (
            <div>
                <LoadingBar loading={1} style={{
                    backgroundColor: '#ff2f39',
                    height: '3px',
                    opacity: '1',
                    zIndex: '100000'
                }}/>
                {loadingBar.default ? <div className="overlay"/> : null}
                <Header user={authedUser} onLogout={this.logout}/>
                <div className="container">
                    <Route exact path={LOGIN} render={() => (
                        <Login redirectTo={this.redirectTo}/>
                    )}/>
                    <Route exact path={SIGN_UP} render={() => (
                        <SignUp/>
                    )}/>
                    <Route exact path={DASHBOARD} render={() => (
                        <Dashboard/>
                    )}/>
                    <Route exact path={NEW_QUESTION} render={() => (
                        <NewQuestion/>
                    )}/>
                    <Route exact path={LEADERBOARD} render={() => (
                        <LeaderBoard/>
                    )}/>
                    <Route path="/question/:questionId" component={Answer}/>
                    <Route path="/result/:questionId" component={Result}/>
                </div>

            </div>
        );
    }
}

function mapStateToProps({authedUser, loadingBar}) {
    return {
        authedUser,
        loadingBar
    }
}

export default withRouter(connect(mapStateToProps)(App));
