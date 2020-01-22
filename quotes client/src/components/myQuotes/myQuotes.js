import React,{useState,useEffect} from 'react';
import classes from './myQuotes.module.css';
import {useSelector,useDispatch} from 'react-redux';
import * as actions from '../../store/actions/actions';
import Spinner from '../../ui/spinner/spinner'
import {Redirect} from 'react-router-dom';
import Card from './card/card';

const MyQuotes=(props)=>{
    const [spinnerState,spinnerSFn]=useState(null);
    const [redirectState,redirectSFn]=useState(null);

    const dispatch = useDispatch();  
    const reduxS={
        quotes:useSelector(state=>state.quote.quotes),
    isLoading:useSelector(state=>state.auth.isLoading),
    userId:useSelector(state=>state.auth.userId)
    }
    useEffect(()=>{
        dispatch(actions.getQuotes())
        if(!localStorage.getItem("token")){redirectSFn(<Redirect to='/' />)}
    },[dispatch,reduxS.userId])

    useEffect(()=>{if(reduxS.isLoading){spinnerSFn(<Spinner className={classes.loding} />)}else{
        spinnerSFn(null)}},[reduxS.isLoading])
    let cards=reduxS.quotes?reduxS.quotes.map((x,i)=><Card  spinner={spinnerState}
    id={x._id} quote={x.quote}
    author={x.author} colorNum={i} rate={x.rate}  />):null;
    if(cards.length===0){cards=<p style={{fontSize:'30px'}}>
        save to see here your quotes</p>}
        if(spinnerState){cards=<br />}
       if(Array.isArray(cards)){cards.sort((a,b)=>b.props.rate-a.props.rate)}
    return(
    <div className={classes.quoteBox}>
       {spinnerState} {redirectState}
        {cards?cards:<Card />}
    </div>
)
}
export default MyQuotes;
