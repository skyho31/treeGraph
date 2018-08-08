const { Graph } =  require('./Graph');
const fs = require('fs');

const inputData = JSON.parse(fs.readFileSync('./data/input.json', 'utf8'));


let graph = new Graph();
let cachePath = {};

for (let key in inputData) {
  let {
    name,
    relation
  } = inputData[key];

  graph.addNode(name);
  cachePath[name] = relation;
}

for( let name in cachePath) {
  let targets = cachePath[name];
  for(let id in targets){
    graph.addPath(name, inputData[id].name);
  }
}

graph.printChildren();
graph.printParents();




console.log(graph);
