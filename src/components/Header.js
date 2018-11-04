import React from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button/Button";

const Header = props => {
    return (
        <header className="app__header">
            <div className="app__header_content">
                <h2>Would you rather?</h2>
                <div>
                    {props.user &&
                    <Button type="button" onClick={props.onLogout}>
                        Logout
                    </Button>
                    }
                </div>
            </div>
        </header>
    )
};

Header.propTypes = {
    user: PropTypes.object,
    onLogout: PropTypes.func,
};

export default Header;