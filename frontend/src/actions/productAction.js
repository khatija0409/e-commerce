// Actions are a plain JavaScript object that contains information. Actions are the only source of information for the store. Actions have a type field that tells what kind of action to perform and all other fields contain information or data
// triggers the reducer function
import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

//this function will be called in dispatch func in home.js
export const getProduct =
  (keyword = "", currentPage = 1, price = [0, 25000],category,ratings=0) =>
  async (dispatch) => {
    try {
      // dispatch is a method of store for updating the state of the store
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      });
      //adding query that is after ? for seearching a prod by keyword
      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      // since deafult category value isnt given

      if(category){
        link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      } 




      // like postman axios is used
      const { data } = await axios.get(link);
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // assign type and payload which will be used in switch ststement in reducer
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data.message,
      });
    }
  };
// for clear all errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

//for get indiv product details

export const getProductDetails = (id) => async (dispatch) => {
  try {
    // dispatch is a method of store for updating the state of the store
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });
    // like postman axios is used
    // used the full http//local host to eliminate proxy error
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/product/${id}`
    );
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    // assign type and payload which will be used in switch ststement in reducer
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
