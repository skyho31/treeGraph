// custom module
import Algo from './js/Algorithm';
import { TreeGraph } from './js/Components'

// custom css
import './css/main.css';

// import data
import inputData from '../data/input.json';
// import inputData from '../data/input2.json';


Algo.initialize(inputData);
let graphTree = Algo.execute();

TreeGraph.createTree(graphTree);
