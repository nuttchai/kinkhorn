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
    } else {
      setSignedIn(false);
    }
  };

  const signOut = () => {
    setSignedIn(false);
    setCurrentUser(EmptyUser);
  };

  // FIXME: for debugging purpose only
  // useEffect(() => {
  // eslint-disable-next-line max-len
  //   const DummyToken = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpc2FydXQudEBjbWtsLmFjLnRoIiwibmFtZSI6IlZpc2FydXQgVGVjaGF0YW5hY2hhaSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHamRpeEJ2SVFodkhPZ2R3NmdXelIzeGcwWlNWaXdnZGlmTjFYREY9czk2LWMiLCJleHAiOjE2MTE3MzI2MjcsImp0aSI6IjEwNTU0NTc5MzI0NjE4OTQ5MjU5MSJ9.uVFKoHiT_M-JcoNnhm2FTEW9Mm_BNzaKT5wJGLpheQk';
  //   setCurrentUser({
  //     name: 'test',
  //     picture: 'test.jpg',
  //   }, DummyToken);
  // }, []);

  return (
    <UserContext.Provider value={{
      user,
      isSignedIn,
      // token,
      setCurrentUser,
      signOut,
    }}>
      {props.children}
    </UserContext.Provider>

  );
};

export default UserContextProvider;
