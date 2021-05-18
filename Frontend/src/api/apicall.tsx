import axiosInstance from './axiosinstance';
import { AxiosResponse } from 'axios';

export interface IplaceOrderRequest {
    shopId : string;
    userId : string;
    orderList : any[];
}

//FIXME : Add interface
export interface IplaceOrderResponse {
    Data : string;
}


export interface ICreateStoreRequest {
    shop: string;
    ownerId: string;
    area: string;
    status: string;
    menuImage : any[];
    file : string;
    menuFiled : {
        id: string;
        name: string;
        price: number;
        description: string;
        category: string;
        img : string;
    }[]
}

export interface ICreateStoreResponse {
    Data : string;
}

export const placeOrder = async(json : IplaceOrderRequest) : Promise<AxiosResponse<IplaceOrderResponse>> => {
    const res = await axiosInstance.post('/api/orders/customer', json);
    return res;
};

export const fetchKiosks = async() : Promise<any> => {
    const res = await axiosInstance.get('/api/shops/customer');
    // console.log(res);
    return res;
};


export const createStore = async (store : ICreateStoreRequest) : Promise<AxiosResponse<ICreateStoreResponse>> => {
    const formData = new FormData();
    store.menuImage.forEach((file : any) => formData.append('files[]',file));
    formData.append("image",store.file);
    formData.append("shop",store.shop);
    formData.append("ownerId", store.ownerId);
    formData.append("area", store.area);
    formData.append("menu",JSON.stringify(store.menuFiled));
    // const finalData = {...data, menu : menuFields};
    const response = await axiosInstance.post('/api/shops/upload',formData)
    
    return response;
}
