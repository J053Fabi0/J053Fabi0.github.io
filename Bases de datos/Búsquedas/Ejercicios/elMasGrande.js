function elMasGrande(arr) {
  var masGrande = arr[0];
  arr.forEach((elemento) => {
    if (elemento >= masGrande) {
      masGrande = elemento;
    }
  });
  return masGrande;
}

function elMasChico(arr) {
  var masChico = arr[0];
  arr.forEach((elemento) => {
    if (elemento <= masChico) {
      masChico = elemento;
    }
  });
  return masChico;
}

console.log(elMasGrande([1, 2, 3, 4, 1, 35, 25, 436, 346, 32]));
console.log(elMasChico([1, 2, 3, 4, 1, 35, 25, -436, 346, 32]));
