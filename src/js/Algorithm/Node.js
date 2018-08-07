export default class Node {
  constructor(id, name, grid, target){
    this.id = id || "";
    this.name = name || "";
    this.grid = grid || 1;
    this.target = target || [];
    this.parents = [];
    this.startPos = 0;
  }
}
