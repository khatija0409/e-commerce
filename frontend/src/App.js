import "./App.css";
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader"; //for fonts
import React from "react";
import Footer from "./components/layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
function App() {
  React.useEffect(() => {
    //load fonts from google
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      {/* to get home page */}
      <Route exact path="/" component={Home} />
      {/* to get details of single product */}
      <Route exact path="/product/:id" component={ProductDetails} />
      {/* to get all products */}
      <Route exact path="/products" component={Products} />
      <Route exact path="/search" component={Search} />
      <Route path="/products/:keyword" component={Products} />

      <Footer />
    </Router>
  );
}

export default App;
