//region seen after scroll btn is pressed
import React, { Fragment, useEffect } from "react";
import scroll from "../../images/scroll.png";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";

const Home = () => {
  const alert=useAlert();
  const dispatch = useDispatch();
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
    //fragments are empty tags used to wrap elements
    <Fragment>
      {loading ? (
         <Loader/>
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />
          <div className="banner">
            <p className="text">Welcome to Ecommerce Website </p>
            <h1 className="heading">FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll <img id="image" src={scroll} alt="Scroll down" />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {/* if products are found */}
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
