import React from 'react';
import {useSelector} from 'react-redux' 
import classes from "./spinner.module.css";

const Spinner=(props)=>{

    return(<div style={{    position:"absolute",left: "50%",top:"50%",
    transform:"translate(-50%,-50%)"}} className={classes.loader}>Loading...</div>)
}
export default Spinner