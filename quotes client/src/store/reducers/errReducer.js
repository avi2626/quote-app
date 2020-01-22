import * as actions from '../actions/actionsType';

const initialState={
    msg:{},
    status:null,
    id:null,
    genral:null
  }
const errReducer=(state=initialState,action)=>{
    switch(action.type) {
        case actions.GET_ERRORS:
          return {
            ...state,msg: action.payload.msg,
            status: action.payload.status,
            id: action.payload.id
          };
        case actions.CLEAR_ERRORS:
          return {
            ...state,msg: {},
            status: null,
            id: null
          };
      case actions.ERROR:
        return{
          ...state,
          genral:action.msg
        };
        case actions.ERROR_NULL:
          return{
            ...state,
            genral:null
          }
        default:
          return state;
      }

}

export default errReducer