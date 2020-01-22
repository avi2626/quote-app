import React from 'react';
import classes from './saveValid.module.css'    
import { icon } from '../../../icons';
import {useSelector} from 'react-redux';

const SaveValid=(props)=>{
const reduxS={isAuth:useSelector(state=>state.auth.isAuthenticated)}

let display={color:props.themeState};    
let togele=[classes.saveValid,classes.close];
if(props.display){togele=[classes.saveValid,classes.open]}
return(
<div style={display} className={togele.join(' ')}>
    <p className={classes.text}><i className="fas fa-exclamation-circle">
        </i>{reduxS.isAuth?"saved":"Login to save"}<span onClick={props.closeValidHandler}
    className={classes.esc}>{icon.close}</span></p>
    
</div>
)
}
export default SaveValid;