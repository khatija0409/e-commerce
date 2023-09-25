// function that manages all calculatons to be done on any state of a product
// used to change state
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";
export const productReducer = (state = { products: [] }, action) => {
  // state has empty array of products
  // action.type refers to ALL_PRODUCT_FAIL,.....

  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        // during product req loading is true
        loading: true,
        products: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        // during product success loading is false
        loading: false,
        // get all products
        products: action.payload.products,
        // since productCount is used in backend product controller dont change
        productsCount: action.payload.productCount,
        resultPerPage:action.payload.resultsPerPage,
      };
    case ALL_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//reducer func for getting details of products

export const productDetailsReducer = (state = { product: [] }, action) => {
  // state has empty array of individual product detail that we have sent in backend in prod controller
  // action.type refers to ALL_PRODUCT_FAIL,.....

  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        // during product req loading is true
        loading: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        // during product success loading is false
        loading: false,
        // get all products
        product: action.payload,
       
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
