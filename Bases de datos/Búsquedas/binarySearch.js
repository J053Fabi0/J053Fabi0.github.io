const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function buscarElemento(array, elemento) {
  var index = Math.floor(array.length / 2);
  var 
  while (array[index] != elemento) {
    console.log(index);
    if (array[index] < elemento) {
      index += Math.floor(index / 2);
    } else {
      index -= Math.floor(index / 2) == 0 ? 1 : Math.floor(index / 2);
    }
    if (index == 10) {
      return null;
    }
  }
  return index;
}

function buscarElemento2(array, elemento) {
  var min = 0;
  var max = array.length
  var aux
  while (min <= max) {
    aux = Math.floor((max + min) / 2)
    if(array[aux] == elemento) {
      return aux
    }
    if (array[aux] < elemento) {
      min = aux + 1
    } else {
      max = aux - 1
    }
  }
  return -1
}

// console.log(buscarElemento(myArray, 1));
// console.log(buscarElemento(myArray, 2));
// console.log(buscarElemento(myArray, 3));
// console.log(buscarElemento(myArray, 4));
// console.log(buscarElemento(myArray, 5));
// console.log(buscarElemento(myArray, 6));
// console.log(buscarElemento(myArray, 7));
// console.log(buscarElemento(myArray, 8));
// console.log(buscarElemento(myArray, 9));
// console.log(buscarElemento(myArray, 10));
// console.log(buscarElemento(myArray, 11));
