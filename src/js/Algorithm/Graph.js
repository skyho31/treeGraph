
///////////////////////////////////
//  define class
//////////////////////////////////
export default class Graph {
  constructor(){
    this.root = 0;
    this.nodes = {};
    this.maxLevel = 0;
    this.maxWidth = 0;
    this.levelTree = {};
    this.gridTree = {};
    this.endCount = 1;
  }

  addNode(node){
    let key = node.id;
    this.nodes[key] = node;
  }

  getRoots(){
    let cacheNodes = Object.assign({}, this.nodes);
    
    for(let key in this.nodes){
      let target = this.nodes[key].target;
      for(let idx = 0; idx < target.length; idx++){
        let tKey = target[idx];
        delete cacheNodes[tKey];
      }
    }

    return Object.keys(cacheNodes);
  }


  execute(){
    // root 구하기
    let roots = this.getRoots();
    for(var idx = 0; idx < roots.length; idx++){
      let rootNode = this.nodes[roots[idx]];
      this.setGrid(rootNode, 0);
    }

    let maxGrid = this.gridTree['0'];
    for(let count in this.gridTree){
      if(this.gridTree[count] < maxGrid){
        let resGrid =  maxGrid - this.gridTree[count];
        this.levelTree[count].push({
          name: null,
          grid: resGrid,
          target: []
        });
        this.gridTree[count] += resGrid;
      }
    }

    let answer = [];
    for(let level in this.levelTree){
      answer.push(this.levelTree[level]);
    }

    return answer;
  }
  

  setGrid(node, level){
    let { target } = node;
    if(node.checked) return;

    let grid = 0; 
    this.gridTree[level] = this.gridTree[level] || 0;

    for(let idx = 0; idx < target.length; idx++){
      grid += this.setGrid(this.nodes[target[idx]], level+1);
    }

    node.grid = grid ? grid : 1;
    this.levelTree[level] = this.levelTree[level] || [];
    
    this.gridTree[level] += node.grid;
    
    // // null 추가
    if(target.length == 0 && level > 0 && this.gridTree[level] !== 0){
      
      if(this.endCount > 1 && this.endCount !== this.gridTree[level]){
        let emptyGrid = this.endCount - this.gridTree[level];
        this.levelTree[level].push({
          name: null,
          grid: emptyGrid,
          target: []
        });
        this.gridTree[level] += emptyGrid;
      }

      this.endCount += 1;
    }

    this.levelTree[level].push(node);
    node.checked = true;
  
    return node.grid;
  }
}
