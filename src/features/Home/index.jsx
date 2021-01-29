import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    text: {
        margin: "10rem 0 0 0",
    }
}));
export default function HomePage() {
    const classes = useStyles();
    
    return(
        <h1 className={classes.text}>Home</h1>
    );
}