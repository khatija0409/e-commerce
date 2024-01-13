import { createStore, combineReducers, applyMiddleware } from "redux";
// thunk>>middelware that allows us to write actions and returns it as a afunc;used whenever there is a delay in something being done Ex promises, asyncevents
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";
// reducer>> is a func whic conatians calculation and logic to be performed on the state
// applymiddleware>>used to apply middlewarer
// combine reducer >>combines all reducer func into an obj that can be used to create a store
// a store conatins state of the application
const reducer = combineReducers({
  // reducer func of products
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers:allUsersReducer,
  userDetails:userDetailsReducer,
  productReviews:productReviewsReducer,
  review:reviewReducer,
  
});

let initialState = {
  // initial state for cart
  // if somehting is in cart show that else empty
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
