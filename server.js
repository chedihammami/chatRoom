require('dotenv').config(); 
const express = require('express') ;
const app = express() ; 
const fs = require('fs'); 
const WebSocket = require('ws');
const path = require('path');  
const PORT = process.env.PORT || 8112 ; 


const server = app.listen(PORT , () => 
{
     console.log(`Server Running on PORT ${PORT} `); 
})

app.use(express.static('views')); 
app.use(express.static('utils'));



const wsServer = new WebSocket.Server({server: server}); 
wsServer.on('connection', (socket) => {
    
    broadcast("New User", "Joined the chat", socket)
     socket.on('message', (data) => 
     {
          
          let mes = JSON.parse(data); 
          broadcast(mes.name,mes.message,socket); 
     })
})


function broadcast(namme, messsage , socketToOmit) {
    wsServer.clients.forEach((connectedClients) =>
    {
       if ( connectedClients.readyState === WebSocket.OPEN && socketToOmit !== connectedClients)
       {
            connectedClients.send(JSON.stringify({name: namme , message: messsage})); 
       }
    });
  }







