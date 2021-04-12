import * as actionTypes from './shopping-types';

export type CartItemType = {
    id: number;
    // category: string;
    title: string;
    description: string;
    price: number;
    image: string;
    qty: number;
  };

export const addToCart = (clickedItem: CartItemType) => {
    // console.log('click : ',clickedItem);
    return {
        type : actionTypes.ADD_TO_CART,
        payload : {
            id : clickedItem.id,
        },
    };
};

export const removeFromCart = (clickedItem: CartItemType) => {
    return {
        type : actionTypes.REMOVE_FROM_CART,
        payload : {
            id : clickedItem.id,
        },
    };
};


export const loadCurrentItem = (clickedItem: CartItemType) => {
    return {
        type : actionTypes.LOAD_CURRENT_ITEM,
        payload : {
            id : clickedItem.id,
        },
    };
};

export const adjustItemQty = (clickedItem  : CartItemType, qty : any) => {
    return {
        type : actionTypes.ADJUST_QTY,
        payload : {
            id : clickedItem.id,
            qty,
        },
    };
};
