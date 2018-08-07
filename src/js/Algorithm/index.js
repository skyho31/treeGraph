import Graph from './Graph';
import Node from './Node';
import Util from '../Util';

export default (function(){
  let graph = new Graph();

  return {
    initialize: function(inputData){
      for (let key in inputData) {
        let {
          id,
          name,
          relation
        } = inputData[key],
        target = Util.getTarget(relation);
        graph.addNode(new Node(id, name, 1, target))
      }
    },
    execute: function(){
      return graph.execute();
    }
  }
}());
