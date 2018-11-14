import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography/Typography";


const styles = theme => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
})

class Dashboard extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Typography
                        noWrap>{'You think water moves fast? You should see ice.'}</Typography>
                </main>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(Dashboard);