import{useState,useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader"; //for fonts
import React from "react";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile.js"
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import ForgotPassword from "./components/User/ForgotPassword.js";
import ResetPassword from "./components/User/ResetPassword.js";
import Cart from "./components/Cart/Cart.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import Payment from "./components/Cart/Payment.js"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess.js"


function App() {
  const {isAuthenticated,user}=useSelector(state=>state.user)

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }
  
  useEffect(() => {
    //load fonts from google
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    // the user state will be maintained when we return to home screen and if we are already logged in 
store.dispatch(loadUser());

getStripeApiKey();

  }, []);

  return (
    <Router>
      <Header />
      {/* if user is logged in we show that user is logged in by this feature */}
      {isAuthenticated && <UserOptions user={user}/>}
      {/* to get home page */}
      <Route exact path="/" component={Home} />
      {/* to get details of single product */}
      <Route exact path="/product/:id" component={ProductDetails} />
      {/* to get all products */}
      <Route exact path="/products" component={Products} />
      <Route exact path="/search" component={Search} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/login" component={LoginSignUp} />
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
      {/* not protected since this becomes when we arent lpogged in */}
      <Route exact path="/password/forgot" component={ForgotPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <Route exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/shipping" component={Shipping} />
    
      <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
      {/* belongs to stripe component */}
       { stripeApiKey && (<Elements stripe={loadStripe(stripeApiKey)}>
       <ProtectedRoute exact path="/process/payment" component={Payment} />
       
       
       </Elements>)}
       <ProtectedRoute exact path="/success" component={OrderSuccess} />
       
      <Footer />
    </Router>
  );
}

export default App;
