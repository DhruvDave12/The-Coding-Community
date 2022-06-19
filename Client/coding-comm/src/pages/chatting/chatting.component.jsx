import React, {useState, useEffect} from "react";
import io from "socket.io-client";

const socket = io.connect('http://localhost:8080');

const ChatPage = () => {
    console.log("SOCKET STATUS: ", socket.status);
    
    const sendMessage = () => {
        socket.emit('SEND_MESSAGE', {message: "HELLO BACKEND!!"})
    }
    
    return (
        <div>
            <h1>WELCOME TO CHAT PAGE</h1>
            <input type="text" placeholder="Messages..."/>
            <button onClick={sendMessage}>Send Message</button>
        </div>
    )
}

export default ChatPage;