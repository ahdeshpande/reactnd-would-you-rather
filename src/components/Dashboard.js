import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {setAuthListener} from "../utils/_DB";

class Dashboard extends Component {

    constructor(props){
        super(props);

        console.log(setAuthListener());
    }

    render() {
        return (
            <div>
                <h1>Dashboard</h1>
            </div>
        )
    }
}

export default Dashboard;