const Util = {
  getTarget: relation => {
    let target = [];
    for(let rKey in relation){
      let type = relation[rKey].type;
      if(type !== 'custom'){
        target.push(rKey);
      }
    }

    return target;
  }
}


export default Util;
