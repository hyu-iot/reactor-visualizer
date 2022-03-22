import axios from "axios";
import { useEffect, useState } from "react";
import { Graphviz } from "graphviz-react"
import { Graph } from "./components/Graph"
import './App.css';

function App() {
  const [dots, setdots] = useState([]);
  const [idx, setidx] = useState(-1);
  const [show, setShow] = useState(false);


  const fetchDots = async () => {
    try {
      setdots([]);
      setidx(-1);
      setShow(false);

      const response = await axios.get('http://localhost:8080/api/get/all');
      setdots(response.data);
    } catch(e) {

    }
  };


  const getDots = (e) => {
    e.preventDefault();
    axios.get('http://localhost:8080/api/get/all')
      .then(response => {setdots(response.data)})
      .then(()=>{setidx(dots.length - 1)})
      .then(()=>{console.log(dots[idx]);});

    dots.forEach((element) => {
      element.dot = element.dot.replace(/\\"/g,'').replace(/\\n/g,'').replace(/[\/\\]/g,'_').replace(/\[/g,'_').replace(/\]/g,'').replace(/\"/gi,'');
    });
  };

  const clearDots = (e) => {
    e.preventDefault();
    setidx(-1);
    axios.get('http://localhost:8080/api/clear')
      .then(() => {console.log('clear dots')})
      .then(()=>{setShow(false)});
  };


  useEffect(() => {
    fetchDots();
  }, []);

  
  return (
    <div className="App">
      <div className="title">Visualization of Precedence Graph</div>
      <div className="buttons">
        <button onClick={getDots}>reload</button>
        <button onClick={clearDots}>clear</button>
      </div>
      <div className="Graph">
      {idx >= 0 && JSON.stringify(dots[idx].dot) }
      {idx >= 0 && <Graph dot={JSON.stringify(dots[idx].dot).replace(/\\"/g,'').replace(/\\n/g,'').replace(/[\/\\]/g,'_').replace(/\[/g,'_').replace(/\]/g,'').replace(/\"/gi,'')}/>}

      </div>
    </div>

  );
}

export default App;

//{idx >= 0 && <Graphviz 
//  dot={JSON.stringify(dots[idx].dot).replace(/\\"/g,'').replace(/\\n/g,'').replace(/[\/\\]/g,'_').replace(/\[/g,'_').replace(/\]/g,'').replace(/\*/gi, '')}
///>}

// JSON.stringify(dots[idx].dot).replace(/\\"/g,'').replace(/\\n/g,'').replace(/[\/\\]/g,'_').replace(/\[/g,'_').replace(/\]/g,'').replace(/\"/gi,'')