type User = {
    money : number;
    name: string;
    picture: string;
    // amount: number;
    email : string;
    user_id : string;
    roles : string;
  };

export const EmptyUser:User = {
  name: '',
  picture: '',
  money: 0,
  email : '',
  user_id : '',
  role : 'Seller',
  // role : ''

};

export default User;
  