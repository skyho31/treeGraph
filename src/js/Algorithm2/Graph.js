class Node {
  constructor(name, parent, children){
    this.name = name;
    this.parent = parent;
    this.children = children;
  }
}

class Graph {
  constructor() {
    this.nodeCount = 0;
    this.nodeList = new Map();
  }

  addNode(name){
    this.nodeList.set(name, {
      parents: [],
      children: []
    });
  }

  addPath(src, target){
    this.nodeList.get(src).children.push(target);
    this.nodeList.get(target).parents.push(src);
  }

  printChildren(){
    let get_keys = this.nodeList.keys();

    for(let i of get_keys){
      let get_values = this.nodeList.get(i).children;
      let conc = "";

      for (let j of get_values)
        conc += j + " ";

      console.log(i + " -> " + conc);
    }
  }

  printParents(){
    let get_keys = this.nodeList.keys();

    for(let i of get_keys){
      let get_values = this.nodeList.get(i).parents;
      let conc = "";

      for (let j of get_values)
        conc += j + " ";

      console.log(i + " -> " + conc);
    }
  }

  getTree(){

  }

  _getRoot() {

  }

  _getChlidren() {

  }
}

module.exports = {
  Node: Node,
  Graph: Graph
}
