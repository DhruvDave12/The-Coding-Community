import React, {createContext, useEffect, useState, useReducer} from 'react'
import axios from "axios";

export const myContext = createContext({});

    const Context = (props) => {

    const [user, setUser] = useState();
    const [userData, setUserData] = useState();


    useEffect(() => {
        const getCurrUser = async () => {
            const currUser = await axios.get('https://the-coding-community.herokuapp.com/profile', {
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
            // console.log("Current User Fetched through token: ", currUser.data.data.user);
            setUser(currUser.data.data.user);
        }
        getCurrUser();
    }, [])
  
    useEffect(() => {
        const getCurrData = async () => {
            const response = await axios.get('http://localhost:8080/tell-us-more', {
                headers:{
                    Authorization: localStorage.getItem('token')
                }
            })
        //    console.log(response.data.data);
            if(response.data.data){
                setUserData(response.data.data);
            }
        }
        getCurrData();
        

    }, [user])

    


  return (
      <myContext.Provider value={{ user: [user, setUser], data: [userData, setUserData] }}>{props.children}</myContext.Provider>
  )
}

export default Context;