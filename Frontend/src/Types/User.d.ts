export interface User {
    money : number;
    name: string;
    picture: string;
    email : string;
    _id : string;
    role : string;
  };

export const EmptyUser:User = {
  name: '',
  picture: '',
  money: 0,
  email : '',
  _id : '',
  role : '',

};

export default User;
  