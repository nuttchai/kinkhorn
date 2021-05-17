import * as actionTypes from './shopping-types';
import axios from 'axios';
import * as apicall from '../../api/apicall';


export type CartItemType = {
  _id: number;
  // category: string;
  name: string;
  description: string;
  price: number;
  image: string;
  qty: number;
};

export const addToCart = (clickedItem: CartItemType, quantity : number) => {
  // console.log('click : ',clickedItem);
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: clickedItem._id,
      qty : quantity,
    },
  };
};

export const refreshCart = () => {
  // console.log('click : ',clickedItem);
  return {
    type: actionTypes.REFRESH_CART,
    payload: {
    },
  };
};


export const removeFromCart = (clickedItem: CartItemType) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: clickedItem._id,
    },
  };
};

export const loadCurrentItem = (clickedItem: CartItemType) => {
  console.log('load : ', clickedItem);
  return {
    type: actionTypes.LOAD_CURRENT_ITEM,
    payload: {
      id: clickedItem,
    },
  };
};

export const loadCurrentKiosk = (clickKiosk: any) => {
  console.log('load kiosk : ', clickKiosk);
  return {
    type: actionTypes.LOAD_CURRENT_KIOSK,
    payload: {
      id: clickKiosk,
    },
  };
};

export const adjustItemQty = (clickedItem: CartItemType, qty: any) => {
  return {
    type: actionTypes.ADJUST_QTY,
    payload: {
      id: clickedItem._id,
      qty,
    },
  };
};

export const fetchKiosks = () => {
  return (dispatch: any) => {
    // axios
    //   .get('http://13.229.160.22:9000/api/shops/customer')
    //   .then((res) => {
    //     // console.log('res : ', res.data.data);
    //     const kiosks = res.data.data;
    //     dispatch(fetchKiosksSuccess(kiosks));
    //   })
    //   .catch((err) => {
    //     const errMsg = err.message;
    //     dispatch(fetchKiosksFailure(errMsg));
    //   });
    apicall.fetchKiosks().then((res) => {
      // console.log('res : ', res.data.data);
      const kiosks = res.data.data;
      dispatch(fetchKiosksSuccess(kiosks));
    })
    .catch((err) => {
      const errMsg = err.message;
      dispatch(fetchKiosksFailure(errMsg));
    });
  };
};

export const fetchKiosksRequest = () => {
  return {
    type: actionTypes.FETCH_KIOSKS_REQUEST,
  };
};

export const fetchKiosksSuccess = (kiosks: any) => {
  return {
    type: actionTypes.FETCH_KIOSKS_SUCCESS,
    payload: kiosks,
  };
};

export const fetchKiosksFailure = (err: any) => {
  return {
    type: actionTypes.FETCH_KIOSKS_SUCCESS,
    payload: err,
  };
};
