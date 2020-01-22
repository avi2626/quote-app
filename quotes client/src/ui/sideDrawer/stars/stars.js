import React,{useEffect} from 'react';
import classes from './stars.module.css';
import {useDispatch,useSelector} from 'react-redux'
import * as actions from '../../../store/actions/actions'
const Stars = (props) => {
let {rate}=props;
    const dispatch=useDispatch();
   const sArr=[];sArr[0]=React.createRef();sArr[1]=React.createRef(); 
   sArr[2]=React.createRef(); sArr[3]=React.createRef(); 
   sArr[4]=React.createRef();
   
   useEffect(()=>{
    sArr.forEach((x,i)=>x.current.onclick=()=>{
        dispatch(actions.updateRate(props.id,i+1));
        sArr.forEach((y,index)=>{
            if(index<=i){y.current.style.color="gold";
            y.current.onmouseout=null}
            else{y.current.style.color="black"}
            rate=i+1;
    })})
    if(rate!="2.5")
    {sArr.forEach((x,i)=>i<rate?x.current.style.color="gold":null)}
    },[])
   
   const rateHandler=(i)=>{
    sArr[i].current.onmouseout=()=>{
        sArr.forEach((x,num)=>{
            if((num<=i&&num>rate-1)||rate=="2.5"){
                x.current.style.color="black"
            }else{if(x.current.style.color==="black"&&num<=rate)
            {x.current.style.color="gold"}}
     })}
    sArr.forEach((x,num)=>{
        if(num<=i){
            x.current.style.color="gold"
        }else{if(x.current.style.color==="gold"){x.current.style.color="black"}}

    })   

}
    
    return (  
<div className={classes.stars}>
<i ref={sArr[0]} onMouseOver={()=>rateHandler(0)} class="fas fa-star"></i>
<i ref={sArr[1]} onMouseOver={()=>rateHandler(1)} class="fas fa-star"></i>
<i ref={sArr[2]} onMouseOver={()=>rateHandler(2)} class="fas fa-star"></i>
<i ref={sArr[3]} onMouseOver={()=>rateHandler(3)} class="fas fa-star"></i>
<i ref={sArr[4]} onMouseOver={()=>rateHandler(4)} class="fas fa-star"></i>
</div>

    )}
 
export default Stars;