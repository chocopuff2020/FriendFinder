var _ = require('lodash');
var array = [];
var item;

_.zipWith([1,2,3,4,5],[1,3,4,1,3],(a, b) =>{
      item  = Math.abs(a-b);
      console.log(item);
      // array.push(item);
});

  // console.log(array);