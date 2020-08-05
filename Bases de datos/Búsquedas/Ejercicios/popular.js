function masPopular(arr) {
  var cosas = {};
  var mejor;
  var maximoActual = 0;

  arr.forEach((elemento) => {
    if (cosas[elemento]) {
      cosas[elemento]++;
    } else {
      cosas[elemento] = 1;
    }
    if (cosas[elemento] >= maximoActual) {
      mejor = elemento;
      maximoActual = cosas[elemento];
    }
  });

  return mejor;
}

console.log(masPopular([1, 2, 3, 1, 1, 1, 1, 2, 3]));
