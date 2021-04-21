type User = {
    money : number;
    name: string;
    picture: string;
    // amount: number;
    email : string;
  };

export const EmptyUser:User = {
  name: '',
  picture: '',
  money: 0,
  email : '',
};

export default User;
  