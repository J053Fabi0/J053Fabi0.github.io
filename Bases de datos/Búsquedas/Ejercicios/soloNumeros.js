function soloNumeros(arr) {
  var newArr = [];
  arr.forEach((elemento) => {
    if (typeof elemento == "string") {
      newArr.push(elemento);
    }
  });
  return newArr;
}

console.log(soloNumeros(["s", "f", "g", "f", 3, 4, 5, 4]));
