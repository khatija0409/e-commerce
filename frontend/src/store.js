import { createStore, combineReducers, applyMiddleware } from "redux";
// thunk>>middelware that allows us to write actions and returns it as a afunc;used whenever there is a delay in something being done Ex promises, asyncevents
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productReducer,productDetailsReducer } from "./reducers/productReducer";
// reducer>> is a func whic conatians calculation and logic to be performed on the state
// applymiddleware>>used to apply middlewarer
// combine reducer >>combines all reducer func into an obj that can be used to create a store
// a store conatins state of the application
const reducer = combineReducers({
  // reducer func of products
  products:productReducer,
  productDetails:productDetailsReducer,

});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;