type User = {
    money : number;
    name: string;
    picture: string;
    // amount: number;
    email : string;
    user_id : string;
  };

export const EmptyUser:User = {
  name: '',
  picture: '',
  money: 0,
  email : '',
  user_id : ''
};

export default User;
  