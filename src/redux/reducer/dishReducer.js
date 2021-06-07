const initialState = {
    type:"",
    preparation_time:{
        hour:"",
        minute:"",
        second:""
    }};
const dishReducer = (state= initialState, action)=>{
    const {type,payload} = action;
    switch(type){
        case "SETDISH":
            return payload;
        default:
            return state;
    }
}
export default dishReducer;