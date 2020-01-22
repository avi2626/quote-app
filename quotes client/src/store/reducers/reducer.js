import * as actionType from '../actions/actionsType'

const initialState={
    color:"#0d5b5b",
    isAuth:true,
    quotes:[]
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
case actionType.GET_COLOR:return{...state,color:action.color}
case actionType.STORE_QUOTES:
    return{...state,quotes:action.quotes}
case actionType.DELETE_QUOTE_LOCOL:return{
    ...state,quotes:[...state.quotes.filter((x)=>x._id!==action.id)]
}    
    default:
        return state
}}
export default reducer