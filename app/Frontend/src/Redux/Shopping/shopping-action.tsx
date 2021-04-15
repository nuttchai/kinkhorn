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
    console.log('load : ',clickedItem);
    return {
        type : actionTypes.LOAD_CURRENT_ITEM,
        payload : {
            id : clickedItem,
        },
    };
};

export const loadCurrentKiosk = (clickKiosk: any) => {
    console.log('load kiosk : ',clickKiosk);
    return {
        type : actionTypes.LOAD_CURRENT_KIOSK,
        payload : {
            id : clickKiosk,
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
