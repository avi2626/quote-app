import React,{useEffect,useState} from 'react';
import classes from './App.module.css';
import SideDrawer from "./ui/sideDrawer/sideDrawer";
import SaveValid from './ui/sideDrawer/SaveValid/saveValid';
import { icon } from './icons';
import {useSelector,useDispatch} from 'react-redux';
import {Route,Switch} from 'react-router-dom';
import QuoteBox from './components/quoteBox/quoteBox';
import MyQuotes from './components/myQuotes/myQuotes'
import {loadUser} from './store/actions/authActions'
import { errorNull } from "./store/actions/errorActions";
import LoginModule from './ui/modelLogin'
import Modal from '@material-ui/core/Modal';
import Alert from '@material-ui/lab/Alert';
const App=()=> {
  const dispatch = useDispatch(); 
  
  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch])
 

  const reduxS={colorTheme:useSelector(state=>state.quote.color),
    errModal:useSelector(state=>state.err.genral)}

  const [navOpenState,navOpenSFn]=useState(false);
  const [saveValidState,saveValidSFn]=useState(false);
  

 

const navOpenHandler=()=>{navOpenSFn(prev=>!prev);}
const saveValidHndler=()=>{saveValidSFn(true);}
const closeValidHandler=()=>{saveValidSFn(false);}


 

let route;
route=
<Switch>
<Route path='/myquotes' component={MyQuotes} />
<Route path='/login' component={LoginModule} />
<Route path='/' render={(props)=><QuoteBox {...props} saveValidHndler={saveValidHndler} />}    />
</Switch>

return (
    <div style={{backgroundColor:reduxS.colorTheme}} className={classes.App}>
     <Modal onClose={()=>dispatch(errorNull())}  open={reduxS.errModal}>
     <Alert className={classes.alert} severity="error">{reduxS.errModal}</Alert>
     </Modal>
      <SideDrawer togoleFn={navOpenHandler} OpenNav={navOpenState} />
      <div className={classes.hamberger} 
       onClick={navOpenHandler}>{icon.hamberger}</div>
      <SaveValid themeState={reduxS.colorTheme}
       closeValidHandler={closeValidHandler} display={saveValidState} />
    {route}
    </div>
  );
}
export default App;
