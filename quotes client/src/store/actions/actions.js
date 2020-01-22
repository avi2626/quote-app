import * as actionType from './actionsType';
import {tokenConfig,userLoading,lodingFinish} from './authActions'
import { errors} from "./errorActions";
import axios from 'axios';
import {store} from '../../index'
const randemColor=["#9b1b30","#0d5b5b",'#1433a9','#da9e00','#c74375',"#4B0082"];

export const getColor=()=>{
return{
    type:actionType.GET_COLOR,
    color:randemColor[Math.floor(Math.random() * Math.floor(6))]
}    
}


export const SaveQuote=(a,b,c)=>{
    return (dispach)=>{
        dispach(userLoading())
        axios.post("https://thawing-badlands-49385.herokuapp.com/api/items",
        {quote:a,author:b,id:store.getState().auth.userId},tokenConfig())
        .then(res=>{
           dispach(lodingFinish())
        c();
        })
        .catch(err=>{console.log(err.response); dispach(lodingFinish());
            if(store.getState().auth.isAuthenticated){dispach(errors(err.response?err.response.data.msg:err.message))}
            else{c()};
        })
    } } 
    export const  storeQoutes=(data)=>{
        return{
            type:actionType.STORE_QUOTES,
            quotes:data
        }
    }

    export const getQuotes=()=>{
        return (dispach)=>{
            dispach(userLoading())
            axios.post("https://thawing-badlands-49385.herokuapp.com/api/items/get",{id:store.getState().auth.userId})
            .then(res=>{
                dispach(storeQoutes(res.data))
                dispach(lodingFinish())
            })
            .catch(err=>{ dispach(lodingFinish());dispach(errors(err.message)) })
        } } 
        export const deleteQuote=(id)=>{
            return(dispach)=>{
                dispach(userLoading())
                axios.delete(`https://thawing-badlands-49385.herokuapp.com/api/items/${id}`,tokenConfig())
                .then(res=>{;
                dispach(deleteQuoteLocal(id))
                dispach(lodingFinish())
            }).catch(err=>{dispach(errors(err.message));
                dispach(lodingFinish())
            })
            }
        }

        export const deleteQuoteLocal=(id)=>{
            return{
                type:actionType.DELETE_QUOTE_LOCOL,
                id:id
            }
        }

        export const updateRate=(id,num)=>{
            return dispach=>{
                axios.put(`https://thawing-badlands-49385.herokuapp.com/api/items/${id}`,{rate:num+''})
              
                .catch(err=>{dispach(errors(err.message));})
            }
        }
