function busquedaSecuencial(array, element) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] == element) {
      return i;
    }
  }

  return -1;
}

const arr = [3, 4, 5, 2, 35, 2, 64];

console.log(busquedaSecuencial(arr, 64));
