//region seen after scroll btn is pressed
import React, { Fragment, useEffect } from "react";
import scroll from "../../images/scroll.png";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
// The useSelector hook is used to extract the state of a component from the redux store using the selector function. The useDispatch hook is used to update the state of the component and return a new state.
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";
//the reducer functions and actions that are made are usedinside components using use selector and use dispatch

const Home = () => {
  const alert=useAlert();
  const dispatch = useDispatch();
  // products is the state as written in reducer func
  const { loading, error, products,} = useSelector(
    (state) => state.products
  );
  useEffect(() => {

    if(error){
       alert.error(error);
       dispatch(clearErrors());
    }
    //action to get product
    dispatch(getProduct());
  }, [dispatch,error,alert]);

  return (
    //fragments are liked empty tags used to wrap elements
    <Fragment>
      {loading ? (
         <Loader/>
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <p>Welcome to Ecommerce Website </p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <img id="image" src={scroll} alt="Scroll down" />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {/* if products are found then */}
            {products &&
              products.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
