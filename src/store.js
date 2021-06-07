import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension"
import rootReducer from  "./redux/reducer/rootReducer";
import thunkMiddleware from 'redux-thunk'



const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunkMiddleware)));
export default store;