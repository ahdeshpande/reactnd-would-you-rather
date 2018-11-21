import React from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import CardMedia from "@material-ui/core/CardMedia/CardMedia";
import CardContent from "@material-ui/core/CardContent/CardContent";
import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card/Card";
import {withStyles} from "@material-ui/core";
import {Warning} from "@material-ui/icons";
import {DASHBOARD} from "../constants/routes";

const styles = () => ({
    card: {
        display: 'flex',
        margin: '20px auto',
        maxWidth: '80%',
        padding: 15,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 20,
        width: '100%',
    },
    content: {
        flex: '1 0 auto',
        padding: 0,
        alignItems: 'left',
    },
    cover: {
        width: 128,
        backgroundSize: 'contain',
        margin: 'auto 0',
        fontSize: '128px',
    },
});

const PageNotFound = ({classes}) => {
    return (
        <div className="outer__container">
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cover}
                >
                    <Warning className={classes.cover} fontSize={"large"}/>
                </CardMedia>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5">
                            Hey There!
                        </Typography>
                        <Typography variant="h6" color="textSecondary">
                            Q 404: Would you rather . . .
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            <Link to={DASHBOARD}>
                                search for a different question?
                            </Link>
                        </Typography>
                        <Typography variant="subtitle2" color="textSecondary">
                            OR
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            stay here?
                        </Typography>
                    </CardContent>
                </div>
            </Card>

        </div>
    )
};

export default withStyles(styles, {withTheme: true})(PageNotFound);