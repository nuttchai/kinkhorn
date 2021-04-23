import * as actionTypes from './shopping-types';
import { CartItemType } from './shopping-action';

interface TYPE_INITIAL_STATE {
  kiosks: any;
  products: any; // {id, title, descr, price, img}
  cart: CartItemType[]; // {id, title ,descr, price, img, qty}
  currentItem: any;
  currentKiosk: any;
  error: string;
  loading: boolean;
}

const INITIAL_STATE: TYPE_INITIAL_STATE = {
  kiosks: [],
  products: [
    {
      id: 1,
      title: 'This is the COOLEST Cube Ever',
      description:
        'This cube will keep you busy the entire day and it is very fun to play with',
      price: 15.0,
      image:
        'https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    },
    {
      id: 2,
      title: 'Large Coffee Cup',
      description:
        'Get a big cup of coffee every morning before the day starts',
      price: 20.0,
      image:
        'https://images.unsplash.com/photo-1572119865084-43c285814d63?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    },
  ], // {id, title, descr, price, img}
  cart: [], // {id, title ,descr, price, img, qty}
  currentItem: [],
  currentKiosk: [],
  error: '',
  loading: false,
};

const shopReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      // console.log('action.payload : ', action.payload);
      // Set the items data from the products array
      // console.log(state.currentKiosk);
      const item = state.currentKiosk.id.menu.find(
        (prod: any) => prod._id === action.payload.id
      );
      // console.log('state.cart : ', state.cart);

      // Check if Item is in cart already
      const inCart = state.cart.find(
        (item: any) => (item._id === action.payload.id ? true : false)
        // console.log(item)
      );
      console.log('inCart : ', inCart);
      // console.log(state.products);
      // console.log(action);
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item: any) =>
              item._id === action.payload.id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, { ...item, qty: action.payload.qty }],
      };
    case actionTypes.REFRESH_CART:
      console.log('REFRESH_CART');
      return {
        ...state,
        cart: [],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item: any) => item._id !== action.payload.id),
      };
    case actionTypes.ADJUST_QTY:
      return {
        ...state,
        cart: state.cart.map((item: any) =>
          item._id === action.payload.id
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    case actionTypes.LOAD_CURRENT_KIOSK:
      return {
        ...state,
        currentKiosk: action.payload,
        // cart : [],
      };
    case actionTypes.FETCH_KIOSKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_KIOSKS_SUCCESS:
      return {
        ...state,
        loading: false,
        kiosks: action.payload,
        error: '',
      };
    case actionTypes.FETCH_KIOSKS_FAIL:
      return {
        ...state,
        loading: false,
        kiosks: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
