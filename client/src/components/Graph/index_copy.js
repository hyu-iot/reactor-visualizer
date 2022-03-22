import * as React from 'react';
import { graphviz } from 'd3-graphviz';
import * as d3 from 'd3';

class Graph extends React.Component {
    dotIndex = 0;


    constructor(props) {
        super(props);
        this.render = () => {
            const { className } = this.props;
            return (React.createElement("div", { className: className, id: this.id }));
        };

        this.componentDidMount = () => {
            this.dotIndex = 0;
            this.renderGraph();
        };

        this.componentDidUpdate = () => {
            this.dotIndex = 0;
            this.renderGraph();
        }

        this.renderGraph = () => {
            const { dot, options } = this.props;
            if(Array.isArray(dot)){
                graphviz(`#${this.id}`)
                    .transition(this.transition)
                    .options(Object.assign(Object.assign({}, Graph.defaultOptions), options || {}))
                    .renderDot(dot[this.dotIndex])
                    .on("end", () => {
                        this.dotIndex = (this.dotIndex + 1) % dot.length;
                        this.renderGraph();
                    });
            }
            else {
                graphviz(`#${this.id}`)
                    .renderDot(dot)
                    .options(Object.assign(Object.assign({}, Graph.defaultOptions), options || {}));
            }

            
        };

        this.transition = () => {
            return d3.transition("main")
                        .ease(d3.easeLinear)
                        .delay(500)
                        .duration(1500);
        };
        


        this.id = `graphviz${Graph.count}`;
        Graph.count += 1;
    }

}

Graph.count = 0;
Graph.dotIndex = 0;
Graph.defaultOptions = {
    fit: true,
    width: window.innerWidth || document.body.clientWidth
};


export { Graph };
export default Graph;