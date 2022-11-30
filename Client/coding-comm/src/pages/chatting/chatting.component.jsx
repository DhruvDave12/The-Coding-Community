import React, { useState, useEffect } from "react";
import io from "socket.io-client";
// import Context from "../../context/context";
import { useContext } from "react";
import { myContext } from "../../context/context";

const socket = io.connect("http://localhost:8080");

const ChatPage = () => {
  const { user } = useContext(myContext);
  const [userValue, setUserValue] = user;
  const [offlineUsers, setOfflineUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  socket.on("USERS_LIST", (data) => {
    console.log("DATA: ", data);
    setOfflineUsers(data.offlineUsers);
    setOnlineUsers(data.onlineUsers);
  });

  return (
    <div>
      <h1>THIS IS A PRIVATE MESSAGING WINDOW</h1>
      <h2>OFFLINE USERS</h2>
      {offlineUsers.length > 0 ? (
        <div>
          {offlineUsers.map((user) => (
            <div>{user.username}</div>
          ))}
        </div>
      ) : (
        <div>NO OFFLINE USERS</div>
      )}

      <h2>ONLINE USERS</h2>
      {onlineUsers.length > 0 ? (
        <div>
          {onlineUsers.map((user) => (
            <div>{user.username}</div>
          ))}
        </div>
      ) : (
        <div>NO OFFLINE USERS</div>
      )}
      {/* <input onChange={e => setMessage(e.target.value)} type="text" placeholder="Messages..."/>
            <button onClick={sendMessage}>Send Message</button> */}
    </div>
  );
};

export default ChatPage;
