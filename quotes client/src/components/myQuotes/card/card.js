import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import myClasses from "./card.module.css";
import {useDispatch} from 'react-redux';
import * as actions from '../../../store/actions/actions'
import Stars from '../../../ui/sideDrawer/stars/stars'
import Fab from '@material-ui/core/Fab';
import TwitterIcon from '@material-ui/icons/Twitter';
const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
export default function SimpleCard(props) {
  const AvatarColors=['orange','purple',"red","blue"];
const AvatarColor=AvatarColors[props.colorNum<3?props.colorNum:
  ((props.colorNum+1)%3)-1];
  const classes = useStyles();
  const dispatch = useDispatch();  

  return (
    <Card style={{overflow:"unset",marginBottom:'20px'}}
     className={myClasses.card}>
       {props.spinner}
      <CardContent className={myClasses.CardContent}>
        <div className={myClasses.avtarFlex}>
  <Avatar style={{backgroundColor:AvatarColor}}>
    {props.author?props.author[0]:null}</Avatar>
      <Typography className={myClasses.avatrText} color="textPrimary">
          {props.author}
        </Typography>
        </div>
        <Typography className={myClasses.quote} variant="h5" component="h2">
          {`"${props.quote}"`}
        </Typography>
      </CardContent>
      <CardActions className={myClasses.cardActions}>
        <Stars rate={props.rate} id={props.id} />
        <Fab href={`https://twitter.com/intent/tweet?text=${props.quote}%20${props.author}`} color="primary" size="small" aria-label="add"><TwitterIcon /></Fab>
        <Button onClick={()=>dispatch(actions.deleteQuote(props.id))} 
        style={{marginLeft:"auto"}} 
        color="secondary" variant="contained"  size="small">Deleate</Button>
      </CardActions>
    </Card>
  );
}
