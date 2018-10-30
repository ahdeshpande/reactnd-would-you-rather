import React from 'react';
import PropTypes from 'prop-types';

const Header = props => {
    return (
        <header className="app__header">
            <div className="app__header_content">
                <h2>Would you rather?</h2>
            </div>
        </header>
    )
};

Header.propTypes = {};

export default Header;