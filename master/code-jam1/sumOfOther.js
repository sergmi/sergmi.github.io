let sumOfOther = function(massive){
	let res = [];
	let sum = massive.reduce((a,b) => a + b);	
	massive.forEach(function(item,i,arr){res[i] = sum - item;})
	return res;
}