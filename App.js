import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import { Graphviz }from "graphviz-react";
import { Graph } from "./components/Graph";
import { io } from "socket.io-client";
import { render } from '@testing-library/react';


const url = 'http://localhost:8080';

class App extends React.Component {

  
  state = {
    socket: null,
    isSocketConnected: false,
    cdot: null,
    startPos: -1,
    idx: 0,
    logicalTime: 0,
    numDots: 0
  }


  componentDidMount() {
    this.initSocket();
  }

  initSocket = () => {
    let socket = io(url, {
      cors: {origin: "*"}
    });
    this.setState({ socket });
    socket.on('connect', () => {
      console.log("socket connected");
      this.setState({isSocketConnected: true});
    });

    socket.on('disconnect', () => {
      console.log("socket disconnected");
      this.setState({isSocketConnected: false});
    });

    socket.on('currentCount', async (count) => {
      await this.setState({startPos: count + 1});
      console.log(`start pos: ${this.state.startPos}`)
    });

    socket.on("newDotUpdated", async (count) => {
      console.log(count);
      //console.log(`start pos: ${this.state.startPos}`);
      console.log(this.state.startPos === count);

      await this.setState({numDots: count - this.state.startPos + 1});

      if (this.state.startPos === count){
        socket.emit("requestDot", count);
        await this.setState({idx: 1})    
      }
    });

    socket.on("sendDot", async ({id, logicalTime, dot}) => {
      console.log(`ID: ${id}`);
      console.log(logicalTime);
      await this.setState({logicalTime: logicalTime, cdot: dot, idx: id - this.state.startPos + 1});
    });

  }


  move = (diff) => {
    if (this.state.idx + diff < 1 || this.state.idx + diff > this.state.numDots)  return;
    else this.state.socket.emit("requestDot", this.state.startPos + this.state.idx + diff - 1);
  }


  render()  {

    const isSocketConnected = true;
    return (
      <div className="App">
        <div className='title'>Visualization of Precedence Graph</div>
        <div>
          <b>Connection status: </b> {isSocketConnected ? "connected" : "disconnected"}
        </div>

        <div>
          {this.state.idx}/{this.state.numDots}
        </div>
        <div>
          <button onClick={() => this.move(-1)}>prev</button>
          <button onClick={() => this.move(1)}>next</button>
        </div>
        <div><b>Logical Time : </b>{this.state.logicalTime.seconds} seconds {this.state.logicalTime.nanoseconds} nsecs</div>

        <div>
          {this.state.cdot}
          <Graph dot={this.state.cdot}/>
        </div>
      </div>
    );

  };

  
}

export default App;

// const [cdot, setcdot] = useState(null);
// const [requestDot, setrequestDot] = useState(false);
// const [idx, setidx] = useState(0);
// const [socket, setsocket] = useState(null);
// const [isSocketConnected, setisSocketConnected] = useState(false);
// const [startPos, setstartPos] = useState(-1);


// useEffect(() => {
//   setsocket(io(url, {
//     cors: {origin: "*"}
//   }));
// }, []);

// useEffect(() => {
//   if(!socket) return;

//   socket.on('connect', () => {
//     console.log("socket connected");
//     setisSocketConnected(true);
//   });

  
  
//   socket.on('disconnect', () => {
//     console.log("socket disconnected");
//     setisSocketConnected(false);
//   });


//   socket.on('currentCount', (count) => {
//     console.log(count);
//     setstartPos(count + 1);
//     console.log(`start pos: ${startPos}`);
//   });

//   socket.on("newDotUpdated", (count) => {
//     console.log(count);
//     console.log(`start pos: ${startPos}`);
//     console.log(startPos === count);

//     if (startPos === count){
//       socket.emit("requestDot", count);
      
//       setrequestDot(true);

//     }
//   });

//   socket.on("sendDot", ({logicalTime, dot}) => {
//     console.log(logicalTime);
//     setcdot(dot);

//   });




// }, [socket]);