const express=require('express');
const http=require('http');
const {Server}=require('socket.io');

const app=express();
const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:5173",methods:["GET","POST"]
    }
});

io.on('connection',(socket)=>{
    console.log("user is connected",socket.id);

    socket.on('join_room',(orderid)=>{
        socket.join(orderid);
        console.log("user joined room");
    })

    socket.on('sendthemessage',async (messagedata)=>{
        const {orderId,senderId,text,time}=messagedata;
        socket.to(orderId).emit('receivethemessage',messagedata);
    })
    socket.on('disconnect',()=>{
        console.log("userdisconnected",socket.id);
    })
})
server.listen(5000,()=>console.log("server is running on port 5000"))
