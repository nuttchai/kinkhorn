import axiosInstance from './axiosinstance';
import axios, { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import User from '../Types/User';

export interface IPlaceOrderRequest {
  shopId: string;
  userId: string;
  orderList: any[];
}

export interface IGetQueueRequest {
  id: string;
}

export interface IGetHistoryRequest {
  id: string;
}

//FIXME : Add interface
export interface IplaceOrderResponse {
  Data: string;
}

export interface ICreateStoreRequest {
  shop: string;
  ownerId: string;
  area: string;
  status: string;
  menuImage: any[];
  file: any;
  menu: {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    img: string;
  }[];
}

export interface ItopUpRequest {
  amount : string;
}

export interface IgetMyStoreRequest {
  id : string;
}

export interface ICreateStoreResponse {
  Data: string;
}

export interface IGetQueueResponse {
  Data: string;
}

export interface IGetQueueSellerResponse {
  Data: string;
}

export interface ItopUpResponse {
  Data : string;
}



export interface IGetUserInfoResponse {
  money : number;
  name: string;
  picture: string;
  email : string;
  user_id : string;
  roles : string;
}

export interface IgetMyStoreResponse {
  data : Imystore[];
  // {status : string;
  //   _id : string;
  //   area : string;
  //   menu : any;
  //   ownerId : string;
  //   shop : string;}
}

export interface IUpdateMyStoreResponse {
  data : string;
}

export interface Imystore {
  _id : string;
  area : string;
  menu : any;
  ownerId : string;
  shop : string;
  status : string;
  name : string;
}

export const placeOrder = async (
  json: IPlaceOrderRequest
): Promise<AxiosResponse<IplaceOrderResponse>> => {
  const res = await axiosInstance.post('/api/orders/customer', json);
  return res;
};

export const fetchKiosks = async (): Promise<any> => {
  const res = await axiosInstance.get(
    '/api/shops/customer'
  );
  // console.log(res);
  return res;
};

export const createStore = async (
  store: ICreateStoreRequest
): Promise<AxiosResponse<ICreateStoreResponse>> => {
  // const formData = new FormData();
  // store.menuImage.forEach((file: any) => formData.append('files[]', file));
  // formData.append('image', store.file);
  // formData.append('shop', store.shop);
  // formData.append('ownerId', store.ownerId);
  // formData.append('area', store.area);
  // formData.append('menu', JSON.stringify(store.menuFiled));
  // const finalData = {...data, menu : menuFields};
  console.log('Store : ',store)
  const response = await axiosInstance.post('/api/shops/frontstore', store);

  return response;
};

export const getQueueCustomer = async (
  params: IGetQueueRequest
): Promise<AxiosResponse<IGetQueueResponse>> => {
  const res = await axiosInstance.get('/api/orders/queue/customer', { params });
  return res;
};

export const getQueueSeller = async ( params : IGetQueueRequest ): Promise<AxiosResponse<IGetQueueSellerResponse>> => {
  const res = await axiosInstance.get('/api/orders/queue/frontstore', { params });
  return res;
}
// FIXME : tmr will do
// export const getHistory = async ( params : IGetHistoryRequest) : Prmoise<AxiosResponse<>> => {
//   const res = await axiosInstance.get('/api/orders/record/'+)
// }

export const getUserInfo = async (): Promise<AxiosResponse<IGetUserInfoResponse>> => {
  // const res = await axios.get(
  //   '/oauth/user/info'
  // );
  const res = await axiosInstance.get(
    '/oauth/user/info'
  );
  return res;
};

export const topUp = async (amount : string) : Promise<AxiosResponse<ItopUpResponse>> => {
  const path = '/oauth/topup/' + amount
  console.log(path);
  const res = await axiosInstance.put(path)
  return res;
}

export const getMyStore = async (id : string): Promise<AxiosResponse<IgetMyStoreResponse[]>> => {
  // console.log(id);
  const path = '/api/shops/frontstore/' + id ;
  // console.log(path);
  const res = await axiosInstance.get(path)
  return res.data;
}

export const updateMyStore = async ( newkiosk : Imystore )  : Promise<AxiosResponse<IUpdateMyStoreResponse>> => {
  const path = '/api/shops/frontstore' 
  const res = await axiosInstance.put(path,newkiosk)
  return res;
}

