export interface User {
    money : number;
    name: string;
    picture: string;
    email : string;
    user_id : string;
    role : string;
  };

export const EmptyUser:User = {
  name: '',
  picture: '',
  money: 0,
  email : '',
  user_id : '',
  role : '',

};

export default User;
  