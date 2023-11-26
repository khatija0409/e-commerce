import React, { Fragment, useEffect,useState} from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js"
import Loader from "../layout/Loader/Loader"
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction.js"; 

//match is req.params.id
const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert=useAlert();
  //extract datat from the store
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    // getting id from the url
    // when we click on a product its url has product id which we are exttracting here
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
  };

  useEffect(() => {
    if(error){
         alert.error(error);
        //  after showing the error clear it
        dispatch(clearErrors());
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id,error,alert]);

  const options = {
    edit: false,
    color: "rgb(20,20,20,0.1)",
    activeColor: " #0a5aa9",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
     <Fragment>
        {loading?(<Loader/>):(
            <Fragment>
              <MetaData title={`${product.name}`} />
            <div className="ProductDetails">
              <div>
                <Carousel>
                  {/* if prod images are present ten map on the images */}
                  {product.images &&
                    product.images.map((item, i) => (
                      <img
                        className="CarouselImage"
                        // item.url
                        key={Math.random().toString()}
                        src={item.url}
                        alt={`${i} Slide`}
                      />
                    ))}
                </Carousel>
              </div>
              {/* deatuls of img next to the image */}
              <div>
                <div className="detailsBlock-1">
                  <h2>{product.name}</h2>
                  <p>Product # {product._id}</p>
                </div>
      
                <div className="detailsBlock-2">
                  <ReactStars {...options} />
                  <span>({product.numOfReviews} Reviews)</span>
                </div>
      
                <div className="detailsBlock-3">
                  <h1>{`₹${product.price}`}</h1>
                  <div className="detailsBlock-3-1">
                    <div className="detailsBlock-3-1-1">
                      <button onClick={decreaseQuantity}>-</button>
                      {/* read only removes the cursor in input field */}
                      <input readOnly value={quantity} type="number" />
                      <button onClick={increaseQuantity}>+</button>
                    </div>
                    <button onClick={addToCartHandler}>Add to Cart</button>
                  </div>
                  <p>
                    Status:
                    <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                      {product.stock < 1 ? "OutOfStock" : "InStock"}
                    </b>
                  </p>
                </div>
                <div className="detailsBlock-4">
                  Description : <p>{product.description}</p>
                </div>
      
                <button className="submitReview">Submit Review</button>
              </div>
            </div>
            <h3 className="reviewsHeading">
              REVIEWS
            </h3>
      {/*  if reviews are there and there is first review elemnt then map through them and hsow the revs */}
      {product.reviews && product.reviews[0] ? (
                  <div className="reviews">
                    {product.reviews &&
                      product.reviews.map((review) => (
                        <ReviewCard key={review._id} review={review} />
                      ))}
                  </div>
                ) : (
                  <p className="noReviews">No Reviews Yet</p>
                )}
      
          </Fragment>
        )
        }
     </Fragment>
  );
};

export default ProductDetails;
