const randomColor = () => "hsl(" + Math.random() * 360 + ",100%,50%)";

d3.select("body").style("background-color", "grey");

(() => {
  return;
  // Cambiar de color los párrafos al azar por cada párrafo
  d3.select("body").selectAll("p").style("color", randomColor);

  const dataSet = [3, 5, 6, 8, 10, 30];

  d3.select("body") //  Selecciona el body
    .selectAll("h3") // Seleccionar todos los h3
    .data(dataSet) //   La info con la que d3 trabajará
    .enter() //         Enter es para entrar en el hijo. También agarra lo del dataSet, y crea un h3 por cada elemento
    .append("h3") //   Añade el h3 al html
    .text((d) => `Mi estas la ${d}-a`);
})();

(() => {
  return;
  const paises = [
    { nombre: "mexico", porcentaje: 875, color: "green" },
    { nombre: "colombia", porcentaje: 763, color: "yellow" },
  ];

  d3.select("body")
    .selectAll("div")
    .data(paises)
    .enter()
    .append("div")
    .style("padding", "7px")
    .style("height", "40px")
    .style("background", (d) => d.color)
    .style("width", (d) => `${d.porcentaje}px`)
    .text((d) => `${d.nombre} ${d.porcentaje}`);
})();

// Funciones útiles para arreglos
const datosRandom = [21, 43, 12, 46, 35, 67, 99, 34, 87, 1];

(() => {
  return;
  // Suma todos los datos
  console.log(d3.sum(datosRandom));

  // Elemento máximo (min para mínimo)
  console.log(d3.max(datosRandom));

  // Mínimo y máximo
  console.log(d3.extent(datosRandom));

  // Promedio
  console.log(d3.mean(datosRandom));

  // Crear un rango. El tercer parámetro es el paso
  // Un arreglo con números del 1 al 10
  console.log(d3.range(1, 11));
})();

(() => {
  return;
  const datosRandomProcesados = [
    { name: "Suma", value: d3.sum(datosRandom) },
    { name: "Valor máximo", value: d3.max(datosRandom) },
    { name: "Valor mínimo", value: d3.min(datosRandom) },
    { name: "Promedio", value: d3.mean(datosRandom) },
  ];
  d3.select("body")
    .selectAll("h2")
    .data(datosRandomProcesados)
    .enter()
    .append("h2")
    .text((d) => `${d.name}: ${d.value}`);
})();

(() => {
  return;
  // Cargar un CSV
  // Manera 1
  d3.csv("CausasDeMortalidadDF2013.csv", (d) => {
    // Este cb se llama por cada elemento que lee
    // y es necesario
    return d;
  }).then((result) => {
    // Este then entrega un arreglo con todos los objetos
  });
})();

(() => {
  return;
  // Escalas
  // Tendremos range y domain, o rango y dominio
  // range: Son los valores máximos y mínimos que queremos tener
  // dominio: Son los valores mínimos y máximos que tienen nuestros datos

  const escalarLinear = d3.scaleLinear().range([0, 100]).domain([0, 1000]);

  const escalaOrdinal = d3.scaleOrdinal().range(["purple", "blue"]).domain(["Cosa 1", "Cosa 2"]);

  const escalaDeBanda = d3
    .scaleBand()
    .range([0, 100])
    .domain(["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]); // A cada elemento del arreglo se le asigna un peso, dependiendo del rango
})();

(() => {
  return;
  d3.csv("CausasDeMortalidadDF2013.csv", (d) => ({ nombre: d.Causas, muertes: parseInt(d.Defunciones) }))
    .then((result) => {
      result.sort(({ muertes: a }, { muertes: b }) => b - a);
      const maxMuertes = d3.max(result, (d) => d.muertes);
      const meanMuertes = d3.mean(result, (d) => d.muertes);

      const lineal = d3
        .scaleLinear() //
        .range([0, 95])
        .domain([0, maxMuertes]);

      const colorLineal = d3
        .scaleLinear() //
        .domain([0, meanMuertes, maxMuertes])
        .range(["blue", "yellow", "red"]);

      d3.select("body")
        .selectAll("section")
        .data(result)
        .enter()
        .append("section")
        .style("width", (d) => lineal(d.muertes) + "%")
        .style("background", (d) => colorLineal(d.muertes))
        .style("margin-bottom", "3px")
        .style("color", "white")
        .text((d) => d.muertes);
    })
    .catch((err) => console.log(err));
})();

(() => {
  return;
  const r = 100;
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", "100%")
    .attr("height", r * 2);

  const circles = 3;
  const data = d3.range(1, circles + 1).map((v) => "circulo_" + v);

  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", (_, i) => r * (i + 1) - r / 2) // Círculo x
    .attr("cy", r / 2)
    .attr("r", r / 2)
    .attr("id", (d) => d)
    .style("fill", randomColor);

  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (_, i) => r * (i + 1) - r) // Círculo x
    .attr("y", r)
    .attr("height", r)
    .attr("width", r)
    .style("fill", randomColor);

  // Eventos
  svg.select("#" + data[0]).on("click", (d, i) => {
    console.log(d);
    console.log(i);
  });

  svg
    .select("#" + data[1])
    .on("mouseover", () => svg.select("#" + data[1]).style("fill", randomColor))
    .on("mouseleave", () => svg.select("#" + data[1]).style("fill", "black"));
})();

(() => {
  return;
  d3.csv("planetas.csv", (d) => ({
    planet: d.planeta,
    distance: parseInt(d.kmDistanciaAlSol),
    diameter: parseInt(d.diametroKm),
  }))
    .then((data) => {
      const width = 1700;
      const height = 700;

      const svg = d3.select("body").append("svg").attr("width", width).attr("height", height);
      const maxDistance = d3.max(data, (d) => d.distance);
      const minDistance = d3.min(data, (d) => d.distance);
      const escalaDistancia = d3
        .scaleLinear()
        .range([10, width - 25])
        .domain([minDistance, maxDistance]);

      const maxDiametro = d3.max(data, (d) => d.diameter);
      const escalaDiametro = d3
        .scaleLinear()
        .range([0, width - 25])
        .domain([0, maxDiametro]);

      const color = d3
        .scaleOrdinal()
        .domain(data.map((p) => p.planet))
        .range(["#424E4C", "#7C5531", "#7BBBF0", "#CC522C", "#A67845", "#EBA340", "#75D6F1", "#2C73A9", "#FFFFF"]);

      svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => escalaDistancia(d.distance))
        .attr("cy", height / 2)
        .attr("r", (d) => escalaDiametro(d.diameter / 30))
        .style("fill", (d) => color(d.planet))
        .attr("id", (d) => d.planet);
    })
    .catch((err) => console.log(err));
})();

(() => {
  d3.csv("AutosVendidosFeb2016.csv", (d) => ({
    name: d.GRUPO,
    quantity: parseInt(d.CANTIDAD),
  })).then((data) => {
    data.sort(({ quantity: a }, { quantity: b }) => b - a);

    const charWidth = 1900;
    const charHeight = 600;

    const margin = { top: 20, right: 20, bottom: 40, left: 45 };

    const width = charWidth - margin.right - margin.left;
    const height = charHeight - margin.top - margin.bottom;

    const maxQuantity = d3.max(data, (d) => d.quantity);

    const scalaY = d3
      .scaleLinear() //
      .range([height, 0])
      .domain([0, maxQuantity]);
    const scalaX = d3
      .scaleBand()
      .rangeRound([0, width]) // Esto quita los puntos decimales
      .domain(data.map((d) => d.name))
      .paddingInner(0.2);

    const xAxis = d3.axisBottom(scalaX);
    const yAxis = d3.axisLeft(scalaY);

    const svg = d3
      .select("body")
      .append("svg") //
      .attr("width", charWidth)
      .attr("height", charHeight)
      .append("g") // Esto significa que se añade un grupo
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // Esto mueve las cosas

    svg
      .append("g") //
      .attr("class", "y axis")
      .call(yAxis);

    svg
      .append("g") //
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    const rect = svg
      .selectAll("body")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => scalaX(d.name))
      .attr("width", scalaX.bandwidth()) // Ancho de la barra
      .attr("id", (d) => `rect${d.name.replace(/ /, "_")}`)
      .attr("y", (d) => scalaY(d.quantity))
      .attr("height", (d) => height - scalaY(d.quantity))
      .attr("fill", "yellow");

    const tip = d3
      .tip()
      .attr("class", "d3-tip")
      .html((_, d) => d.name);

    svg.call(tip); // Agrega el tip al svg

    rect
      .on("mouseover.tip", tip.show) //
      .on("mouseout.tip", tip.hide);

    rect
      .on("mouseover", (_, d) => svg.select(`#rect${d.name.replace(/ /g, "_")}`).style("fill", "blue"))
      .on("mouseout", (_, d) => svg.select(`#rect${d.name.replace(/ /g, "_")}`).style("fill", "yellow"));
  });
})();
