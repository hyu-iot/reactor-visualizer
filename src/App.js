import axios from "axios";
import { useEffect, useState } from "react";
import { Graphviz } from "graphviz-react";
import { Graph } from "./components/Graph";
import { io } from "socket.io-client";

import './App.css';




function App() {
  const [dots, setdots] = useState([]);
  const [idx, setidx] = useState(-1);
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [cdot, setcdot] = useState(null);



  useEffect(() => {
    setSocket(io('http://localhost:8080', {
      cors:{origin: "*"}
    }));

  }, []);

  useEffect(() => {
    if(!socket) return;

    socket.on('connect', () => {
      console.log("socket connected");
      setSocketConnected(true);
    });

    socket.on('disconnected', () => {
      console.log("socket disconnected");
      setSocketConnected(false);
    });




  }, [socket]);
  

  useEffect(() => {
    if(!socket) return;

    socket.on('dotInfoUpdate', (msg) => {

      var {logicalTime, newdot} = msg; 
  
      console.log(logicalTime);
      console.log(newdot);
      setcdot(newdot);
      setidx(idx + 1);
      
      //setdots([...dots, {logicalTime, newdot}])
      //console.log(dots);

  });

  });

  const handleSocketConnection = () => {
    if (socketConnected)
        socket.disconnect();
    else
        socket.connect();
  };


  return (
    <div className="App">
      <div className="title">Visualization of Precedence Graph</div>
      <div>
        <b>Connection status: </b> {socketConnected ? "Connected" : "Disconnected"}
      </div>
      <div className="buttons">
        <button onClick={handleSocketConnection}>{socketConnected ? 'Disconnect' : 'Connect'}</button>
      </div>

      
      <div>{idx + 1}<b>/</b>{dots.length}</div>

      <div className="times">
        {dots.length > 0  && (<div><b>Logical Time: </b> {dots[idx].logicalTime }</div>)}
      </div>
      <div className="Graph">
        {cdot}
        {<Graph dot={cdot}/>}
      </div>

    </div>

  );
}

export default App;

// {idx >= 0 && JSON.stringify(dots[idx].dot) }

// {idx >= 0 && <Graphviz 
//  dot={JSON.stringify(dots[idx].dot).replace(/\\"/g,'').replace(/\\n/g,'').replace(/[\/\\]/g,'_').replace(/\[/g,'_').replace(/\]/g,'').replace(/\*/gi, '')}
// />}

// JSON.stringify(dots[idx].dot).replace(/\\"/g,'').replace(/\\n/g,'').replace(/[\/\\]/g,'_').replace(/\[/g,'_').replace(/\]/g,'').replace(/\"/gi,'')

//       <div className="Graph">
// {idx >= 0 && JSON.stringify(dots[idx].dot) }
// {idx >= 0 && <Graph
//     dot={JSON.stringify(dots[idx].dot).replace(/\\"/g,'').replace(/\\n/g,'').replace(/[\/\\]/g,'_').replace(/\[/g,'_').replace(/\]/g,'').replace(/\"/gi,'')} />}
// </div>