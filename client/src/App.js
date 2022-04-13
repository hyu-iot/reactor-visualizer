import './App.css';

import React from 'react';
import { io } from "socket.io-client";
import { graphviz } from 'd3-graphviz';



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

    const script = document.createElement('script');

    script.src = "https://unpkg.com/@hpcc-js/wasm/dist/index.min.js";
    script.type = "javascript/worker"

    document.body.appendChild(script);

    this.initSocket();
    this.renderGraph();
  }

  componentDidUpdate() {
    this.renderGraph();    
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

  renderGraph() {
    //graphviz(`#graph`).renderDot(this.state.cdot);
    graphviz(`#graph`).renderDot(`${this.state.cdot}`);
  }


  render()  {

    return (
      <div className="App">
        <div className='title'>Visualization of Precedence Graph</div>
        <div>
          <b>Connection status: </b> {this.state.isSocketConnected ? "connected" : "disconnected"}
        </div>

        <div>
          {this.state.idx}/{this.state.numDots}
        </div>
        <div>
          <button onClick={() => this.move(-1)}>prev</button>
          <button onClick={() => this.move(1)}>next</button>
        </div>
        <div><b>Logical Time : </b>{this.state.logicalTime.seconds} seconds {this.state.logicalTime.nanoseconds} nsecs</div>
        <div id='graph'></div>
      </div>
    );

  };

  
}

export default App;


