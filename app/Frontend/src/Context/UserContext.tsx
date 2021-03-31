import axios from 'axios';
import React, { useEffect, useState } from 'react';
import User, { EmptyUser } from '../Types/User.d';

type Props = {
  children: React.ReactChild
}

type Input = {
  name: string,
  picture: string,
  amount: number,
}

type UserContextType = {
  user: User;
  isSignedIn: boolean;
  [key: string]: any;
}

export const UserContext = React.createContext<UserContextType>({
  user: EmptyUser,
  isSignedIn: false,
  // token: DummyToken,
  setCurrentUser: (user: User) => {},
  signOut: () => {},
});

const UserContextProvider = (props: Props) => {
  const [user, setUser] = useState<User>(EmptyUser);
  const [isSignedIn, setSignedIn] = useState(false);

  const setCurrentUser = (user: User) => {
    
    setUser(user);
    if (user.name) {
      setSignedIn(true);
    } 
    // else {
      //   setSignedIn(false);
      // }
      
    console.log(user.name);
  };

  const signOut = () => {
    setSignedIn(false);
    setCurrentUser(EmptyUser);
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
