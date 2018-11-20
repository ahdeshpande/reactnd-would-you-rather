import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from "@material-ui/core/Button/Button";
import {connect} from "react-redux";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Typography from "@material-ui/core/Typography/Typography";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import LoginIcon from '@material-ui/icons/Input';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {Avatar, withStyles} from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer/Drawer";
import Divider from "@material-ui/core/Divider/Divider";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {DASHBOARD, LEADERBOARD, LOGIN, NEW_QUESTION} from "../constants/routes";
import {Link, withRouter} from "react-router-dom";
import List from "@material-ui/core/List/List";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

const drawerWidth = 240;

const styles = theme => ({
    grow: {
        flexGrow: 1,
    },
    root: {
        flexGrow: 1,
        height: '100vh',
        zIndex: 10,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'fixed',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        height: `100vh`,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    avatar: {
        padding: 2,
    },
});

class Header extends Component {

    state = {
        anchorEl: null,
        open: false,
    };

    handleDrawerOpen = () => {
        this.props.authedUser && this.setState(() => ({open: true}));
    };

    handleDrawerClose = () => {
        this.setState(() => ({open: false}));
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleLogin = event => {
        event.preventDefault();
        this.props.history.push(LOGIN);
    };

    render() {
        const {onLogout, classes, theme, authedUser, user} = this.props;

        const {anchorEl} = this.state;
        const open = Boolean(anchorEl);

        return (
            <div>
                <AppBar position="fixed"
                        className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar disableGutters={!this.state.open}>
                        <IconButton color="inherit"
                                    aria-label="Open drawer"
                                    onClick={this.handleDrawerOpen}
                                    className={classNames(classes.menuButton, this.state.open && classes.hide)}>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit"
                                    className={classes.grow}>
                            Would you rather?
                        </Typography>
                        {authedUser ? (
                                <div>
                                    <Button
                                        aria-owns={open ? 'menu-appbar' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleMenu}
                                        color="inherit"
                                    >
                                        <Avatar
                                            alt={authedUser}
                                            src={user.avatarURL}
                                            className={classes.avatar}
                                        /> {authedUser}
                                    </Button>
                                    <Menu
                                        id="menu-appbar"
                                        anchorEl={anchorEl}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={open}
                                        onClose={this.handleClose}
                                    >
                                        <MenuItem
                                            onClick={onLogout}>Logout</MenuItem>
                                    </Menu>
                                </div>
                            ) :
                            (
                                <div>
                                    <IconButton
                                        aria-owns={open ? 'menu-appbar' : null}
                                        aria-haspopup="true"
                                        onClick={this.handleLogin}
                                        color="inherit"
                                    >
                                        <LoginIcon/>
                                    </IconButton>
                                </div>
                            )
                        }
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="persistent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> :
                                <ChevronLeftIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <Link to={DASHBOARD} style={{textDecoration: 'none'}}
                          onClick={this.handleDrawerClose}>
                        <MenuItem>
                            <ListItemIcon>
                                <HomeIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Home"/>
                        </MenuItem>
                    </Link>
                    <Link to={NEW_QUESTION} style={{textDecoration: 'none'}}
                          onClick={this.handleDrawerClose}>
                        <MenuItem>
                            <ListItemIcon>
                                <AddIcon/>
                            </ListItemIcon>
                            <ListItemText primary="New Question"/>
                        </MenuItem>
                    </Link>
                    <Link to={LEADERBOARD} style={{textDecoration: 'none'}}
                          onClick={this.handleDrawerClose}>
                        <MenuItem>
                            <ListItemIcon>
                                <DashboardIcon/>
                            </ListItemIcon>
                            <ListItemText primary="Leader Board"/>
                        </MenuItem>
                    </Link>
                </Drawer>
            </div>
        );
    }
}

Header.propTypes = {
    onLogout: PropTypes.func,
};

function mapStateToProps({authedUser, users}) {
    return {
        authedUser,
        user: authedUser ? users[authedUser] : undefined,
    }
}

export default withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps)(Header)));