import React, { useState } from 'react';
import User, { EmptyUser } from '../Types/User.d';

type Props = {
  children: React.ReactChild
}

type Input = {
  name: string,
  picture: string,
  amount: number,
  email : string;
  user_id : string,
}

type UserContextType = {
  user: User;
  isSignedIn: boolean;
  [key: string]: any;
}

export const UserContext = React.createContext<UserContextType>({
  user: EmptyUser,
  isSignedIn: false,
  setCurrentUser: (user: User) => {},
  signOut: () => {},
});

const UserContextProvider = (props: Props) => {
  const [user, setUser] = useState<User>(EmptyUser);
  // const [isSignedIn, setSignedIn] = useState(false);
  // FIXME : DELETE MOCKUP
  const [isSignedIn, setSignedIn] = useState(true);
  const setCurrentUser = (user: any,money : number,user_id : string) => {
    // const amount = user.money;
    // const userData = data.user
    const userWithMoney = {...user, money : money, user_id : user_id}
    // console.log('userWithMoney : ',userWithMoney);
    setUser(userWithMoney);
    if (user.name) {
      setSignedIn(true);
    } 
    else {
      setSignedIn(false);
    }
    // console.log('user email : ', user.email);
  };

  const signOut = () => {
    setSignedIn(false);
    setCurrentUser(EmptyUser,0,'');
  };

  return (
    <UserContext.Provider value={{
      user,
      isSignedIn,
      setCurrentUser,
      signOut,
    }}>
      {props.children}
    </UserContext.Provider>

  );
};

export default UserContextProvider;
