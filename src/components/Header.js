import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button/Button";
import {connect} from "react-redux";

class Header extends Component {
    render() {
        const {authedUser, onLogout} = this.props;
        return (
            <header className="app__header">
                <div className="app__header_content">
                    <h2>Would you rather?</h2>
                    <div>
                        {authedUser &&
                        <Button type="button" onClick={onLogout}>
                            Logout
                        </Button>
                        }
                    </div>
                </div>
            </header>
        );
    }
}

Header.propTypes = {
    onLogout: PropTypes.func,
};

function mapStateToProps({authedUser}) {
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(Header);