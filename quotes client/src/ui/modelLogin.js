import React,{useState,useEffect} from 'react';
import { Alert } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import classes from './modelLogin.module.css'
import {Redirect} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';
import {login,register} from '../store/actions/authActions';
import Spinner from './spinner/spinner'

 const LoginModal=(props)=>{
  let isAuth=useSelector(state=>state.auth.isAuthenticated)
  let isLoading=useSelector(state=>state.auth.isLoading);
  const errRedux={
    msg:useSelector(state=>state.err.msg),
    status:useSelector(state=>state.err.status)
  }
  const dispatch = useDispatch();
  const [emailState,emailSFn]=useState('');
  const [passwordState,passwordSFn]=useState('');
  const [loginState,loginSFn]=useState(false);
  const [finishState,finishSFn]=useState(false);
  const [spinnerState,spinnerSFn]=useState(null);
  useEffect(()=>{if(isLoading){spinnerSFn(<Spinner className={classes.loding} />)}else{
    spinnerSFn(null)}},[isLoading])

  useEffect(()=>{

    if(isAuth){
      localStorage.setItem("route", "/login");
      finishSFn(<Redirect to='/' />)}
    },[isAuth,finishState])
  
  
  const onChange = (e,kind) => {
   
   if(kind==="email"){emailSFn(e.target.value)}
   if(kind==="pass"){passwordSFn(e.target.value)}
  };
  const onSubmit=(e)=>{
    e.preventDefault();
    if(!loginState){
    dispatch(register("user",emailState,passwordState))}
      else{dispatch(login(emailState,passwordState))}
  }
  const swichHandler=()=>{
    loginSFn((prev)=>!prev)
  }
    return (
 <div className={classes.Box}>
   {finishState}{spinnerState}
<form  className={classes.root} noValidate autoComplete="off">
<Button onClick={swichHandler} style={{width:"50%",marginLeft:"auto",marginRight:"auto",marginBottom:"10px"}} variant="contained">
  switch to  {!loginState?'login':'sign up'}</Button>
  <TextField onChange={(e)=>onChange(e,"email")} type="email" id="filled-basic" label="email" variant="filled" />
  <TextField onChange={(e)=>onChange(e,"pass")} style={{marginTop:"5px"}}
   type="password" id="outlined-basic" label="password" variant="outlined" />
   <Button onClick={onSubmit} style={{marginTop:"30px",width:"50%",marginLeft:"auto",marginRight:"auto"}} variant="contained" color="primary">
  {loginState?"Login":"Sign up"}
</Button>

</form>
{errRedux.msg&&errRedux.msg.msg!=="No token"&&errRedux.status&&errRedux!=401?<Alert
className={classes.alert} severity="error">{`${errRedux.status} ${errRedux.msg.msg}`}</Alert>:null}
</div>
    );
    }


export default LoginModal;