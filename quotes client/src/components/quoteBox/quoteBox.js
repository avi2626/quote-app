import React,{useState,useEffect} from 'react';
import classes from './quoteBox.module.css';
import axios from 'axios';
import {icon} from '../../icons';
import {useSelector,useDispatch} from 'react-redux';
import * as actions from '../../store/actions/actions'
import Spinner from '../../ui/spinner/spinner'
import { lodingFinish,userLoading} from "../../store/actions/authActions";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
const QuotBox=React.memo((props)=>{

    const reduxS={colorTheme:useSelector(state=>state.quote.color),
    isLoading:useSelector(state=>state.auth.isLoading)}
    const dispatch = useDispatch();  

    const [quoteState,quoteSFn]=useState('');
    const [sourceState,sourceSFn]=useState(''); 
    const [refreshState,refreshSFn]=useState(true);
    const [spinnerState,spinnerSFn]=useState(null);

    const {saveValidHndler}=props;

    const savebuttenFn=(a,b)=>{
    dispatch(actions.SaveQuote(a,b,saveValidHndler))
    }

    useEffect(()=>{
        dispatch(userLoading());    
    axios.get("https://type.fit/api/quotes").then(resp=>{        
         dispatch(lodingFinish());   
    const randomNum=Math.floor(Math.random() * Math.floor(1643));
    quoteSFn(resp.data[randomNum].text)
    sourceSFn(resp.data[randomNum].author?resp.data[randomNum].author:"not Known")
    
})},[refreshState]);
useEffect(()=>{if(reduxS.isLoading){spinnerSFn(<Spinner />)}else{spinnerSFn(null)}},[reduxS.isLoading])
const newQuoteFn=()=>{refreshSFn((prev)=>!prev)
    dispatch(actions.getColor())}

return(
    <div className={classes.quoteBox}>
       {spinnerState} 
               <Button  onClick={()=>savebuttenFn(quoteState,sourceState)}
         className={classes.icon}
        variant="contained"
        color="primary"
        size="large"
        style={{backgroundColor:reduxS.colorTheme,transition: 'background-color 1.5s linear'}}
        className={classes.button}
        startIcon={<SaveIcon />}
      ></Button>
    <h1 className={classes.quote} 
        style={{color:reduxS.colorTheme}} >{`"${quoteState}"`}</h1>
    <h1 className={classes.source} 
        style={{color:reduxS.colorTheme}}><span style={{fontFamily:"auto"}}>-</span>
        {sourceState}</h1>
    <div className={classes.buttonFlexbox}>
    <a href={`https://twitter.com/intent/tweet?text=${quoteState}%20${sourceState}`} style={{backgroundColor:reduxS.colorTheme}} 
        className={classes.button}><TwitterIcon /></a>
         <Button style={{backgroundColor:reduxS.colorTheme,color:"white",marginLeft:'auto'
         ,transition: 'background-color 1.5s linear'}}
         className={classes.newQuote} onClick={newQuoteFn}
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<CloudDownloadIcon />}
      >new quote</Button>
    </div>
    </div>
)
})
export default QuotBox;