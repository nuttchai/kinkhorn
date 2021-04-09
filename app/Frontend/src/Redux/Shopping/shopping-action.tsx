import * as actionTypes from './shopping-types';

export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
  };

export const addToCart = (clickedItem: CartItemType) => {
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

export const adjustQty = (clickedItem  : CartItemType) => {
    return {
        type : actionTypes.ADJUST_QTY,
        payload : {
            id : clickedItem.id,
            qty : clickedItem.amount,
        },
    };
};
