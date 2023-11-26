import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
  } from "../constants/cartConstants";
 export const cartReducer = (
    state = { cartItems: [],shippingInfo:{}},
    action
  ) => {
    switch (action.type) {
      case ADD_TO_CART:
        const item = action.payload;
//   check if item is already int the cart
// .product gives id 
// id's are compared

        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        );
  
        if (isItemExist) {
            // if item exists add count  to the same item or else in other item
          return {
            ...state,
            cartItems: state.cartItems.map((i) =>
              i.product === isItemExist.product ? item : i
            ),
          };
        } else {
          return {
            ...state,
            // if item isnt there in cart adding that item to cart
            // item below is added in cart
            cartItems: [...state.cartItems, item],
          };
        }
  
      case REMOVE_CART_ITEM:

        return {
          // only those produts wose id doesnt match witj the prod id to be removes(action,payload) iskept
          ...state,
          cartItems: state.cartItems.filter((i) => i.product !== action.payload),
        };
  
      case SAVE_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: action.payload,
        };
  
      default:
        return state;
    }
  };