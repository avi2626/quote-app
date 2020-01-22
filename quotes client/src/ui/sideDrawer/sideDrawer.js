import React from 'react';
import classes from './sideDrawer.module.css';
import { icon } from '../../icons';
import {NavLink} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {logout} from '../../store/actions/authActions';
const SideDrawer=(props)=>{
let togole=[classes.Close,classes.SideDrawer];
if(props.OpenNav){togole=[classes.Open,classes.SideDrawer]}
const reduxS={isAuthenticated:useSelector(state=>state.auth.isAuthenticated)}
const dispatch = useDispatch();  
const logoutH=()=>{
    dispatch(logout())
    props.togoleFn()
}

return(
        <div className={togole.join(' ')}>
        <div onClick={props.togoleFn}
        className={classes.esc}>{icon.close}</div>   
        <ul className={classes.ul}>
        <li onClick={props.togoleFn} className={classes.navLi}><NavLink exact
        activeClassName={classes.active} to='/'>quotes</NavLink></li>
        {reduxS.isAuthenticated?<li onClick={props.togoleFn} className={classes.navLi}><NavLink 
        activeClassName={classes.active} to='/myquotes'>my quotes</NavLink></li>:null}
       {!reduxS.isAuthenticated?<li onClick={props.togoleFn} className={classes.navLi}><NavLink 
        activeClassName={classes.active} to='/login'>login</NavLink></li>:null}
        {reduxS.isAuthenticated?<li  onClick={logoutH} className={classes.navLi}>logout</li>:null}
        </ul>
        </div>
    )
} 

export default SideDrawer;