async function main() {
  console.log("1");

  console.log(
    forLargo(() => {
      for (var i = 0; i < 3999999999; i++) {}
      return "for";
    })
  );

  setTimeout(() => {
    console.log("3");
  }, 1000);

  console.log("4");
}

function forLargo(x) {
  return x();
}

main();
