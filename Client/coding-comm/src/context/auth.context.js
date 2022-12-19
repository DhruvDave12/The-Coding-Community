import React, {createContext, useEffect, useState, useReducer} from 'react';
import axios from 'axios';
import axiosInstance from '../services/axiosInstance';
export const myContext = createContext ({});

const Context = props => {
  const [user, setUser] = useState ();
  const [userData, setUserData] = useState ();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect (() => {
    const getCurrUser = async () => {
      const currUser = await axiosInstance.get('/profile');
      if(currUser?.data?.data?.user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setUser (currUser.data.data.user);
      localStorage.setItem('userID', currUser.data.data.user._id);
    };
    getCurrUser ();
  }, []);

  useEffect (
    () => {
      const getCurrData = async () => {
        const response = await axiosInstance.get('/tell-us-more');
        if (response.data.data) {
          setUserData (response.data.data);
          console.log("response.data.data: ", response.data.data);
          localStorage.setItem('@firstLogin', 'false');
        } else {
          localStorage.setItem('@firstLogin', 'true');
        }
      };
      getCurrData ();
    },
    [user]
  );
  
  useEffect(() => {
    if(localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <myContext.Provider
      value={{user: [user, setUser], data: [userData, setUserData], isLoggedIn,setIsLoggedIn}}
    >
      {props.children}
    </myContext.Provider>
  );
};

export default Context;
