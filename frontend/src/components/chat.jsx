import React,{useEffect,useState,useRef} from 'react';
import {io} from 'socket.io-client';

const socket=io('http://localhost:5000');

const Chat=({orderId,currentUser})=>{
    const [message,setmessage]=useState([]);
    const [currmessage,setcurrmessage]=useState("");
    const chatEndRef=useRef(null);
    useEffect(()=>{
        socket.emit('join_room',orderId);
        const handlereceive=(data)=>{
            setmessage((prev)=>[...prev,data]);
        };
        socket.on('receivethemessage',handlereceive);
        return()=>{
            socket.off('receivethemessage',handlereceive);
        }
    },[orderId])


useEffect(()=>{
    chatEndRef.current?.scrollIntoView({behavior:"smooth"});
},[message]);

const sendmessage=()=>{
    if(currmessage.trim()!==""){
        const messageData={
            orderId,senderId:currentUser.id,text:currmessage,time:new Date().toISOString()
        };
        setmessage((prev)=>[...prev,messageData]);
        socket.emit("sendthemessage",messageData);
        setcurrmessage("");
    }
}
return (
  <div className="chat-container">
    <div className="messages">
      {message.map((msg, index) => (
        <div key={index}>
          <strong>
            {msg.senderId === currentUser.id ? "You" : "Other"}:
          </strong>{" "}
          {msg.text}
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>

    <input
      type="text"
      value={currmessage}
      onChange={(e) => setcurrmessage(e.target.value)}
      placeholder="Type a message..."
    />

    <button onClick={sendmessage}>
      Send
    </button>
  </div>
);
}
export default Chat;

