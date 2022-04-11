import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react';
import { Graphviz }from "graphviz-react";
import { io } from "socket.io-client";


const url = 'http://localhost:8080';

function App() {
  const [cdot, setcdot] = useState(null);
  const [requestDot, setrequestDot] = useState(false);
  const [idx, setidx] = useState(0);
  const [socket, setsocket] = useState(null);
  const [isSocketConnected, setisSocketConnected] = useState(false);
  const [startPos, setstartPos] = useState(-1);


  useEffect(() => {
    setsocket(io(url, {
      cors: {origin: "*"}
    }));
  }, []);

  useEffect(() => {
    if(!socket) return;

    socket.on('connect', () => {
      console.log("socket connected");
      setisSocketConnected(true);
    });

    
    
    socket.on('disconnect', () => {
      console.log("socket disconnected");
      setisSocketConnected(false);
    });


    socket.on('currentCount', (count) => {
      console.log(count);
      setstartPos(count + 1);
      console.log(`start pos: ${startPos}`);
    });

    socket.on("newDotUpdated", (count) => {
      console.log(count);
      console.log(`start pos: ${startPos}`);
      //console.log(startPos === count);

      if (startPos === count){
        socket.emit("requestDot", count);
        
        setrequestDot(true);

      }
    });

    socket.on("sendDot", ({logicalTime, dot}) => {
      console.log(logicalTime);
      setcdot(dot);

    });




  }, [socket]);


  return (
    <div className="App">
      <div className='title'>Visualization of Precedence Graph</div>
      <div>
        <b>Connection status: </b> {isSocketConnected ? "connected" : "disconnected"}
      </div>

      <div></div>

    </div>
  );
}

export default App;
