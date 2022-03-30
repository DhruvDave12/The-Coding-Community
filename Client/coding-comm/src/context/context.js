import React, {createContext, useEffect, useState} from 'react'
import axios from "axios";

   export const myContext = createContext({});

    const Context = (props) => {

    const [user, setUser] = useState();

    useEffect(() => {
        const getCurrUser = async () => {
            const currUser = await axios.get('https://the-coding-community.herokuapp.com/profile', {
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
            setUser(currUser.data.data.user);
        }
     getCurrUser();
    }, [])
  
  
  return (
      <myContext.Provider value={[user,setUser]}>{props.children}</myContext.Provider>
  )
}

export default Context;