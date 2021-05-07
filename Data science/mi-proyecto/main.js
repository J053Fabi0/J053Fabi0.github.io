/**
 * It adds commas to any number. 1000 -> 1,000.
 *
 * @return: String
 */
const numberWithCommas = (x) => x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

const randomColor = () => "hsl(" + Math.random() * 360 + ",100%,50%)";
const getCSV = (nameCSV, cb = (d) => d) =>
  new Promise((resolve, rej) => {
    d3.csv(nameCSV, cb)
      .then((r) => resolve(r))
      .catch((e) => rej(e));
  });

(async () => {
  const data = await getCSV("android-games.csv", (d) => ({
    title: d.title,
    category: d.category,
    price: parseFloat(d.price),
    total_ratings: parseInt(d["total ratings"]),
    average_rating: parseFloat(d["average rating"]),
    installs:
      d.installs.split(" ")[1] === "M"
        ? parseInt(d.installs.split(" ")[0]) * 1_000_000
        : parseInt(d.installs.split(" ")[0]) * 1_000,
  }));

  firstQuieston([...data]);
  secondQuiston([...data]);
  thirdQuieston([...data]);
})();

function firstQuieston(data) {
  // Get the data of the first question
  const dataFirstQuieston = ((data) => {
    // Add the rates it has for each 1,000 downloads
    for (let i = 0; i < data.length; i++)
      data[i].rates_per_installs = (data[i].total_ratings / data[i].installs) * 1_000;

    // Sort it by the rates_per_installs. The one with more, at the begining
    data.sort(({ rates_per_installs: a }, { rates_per_installs: b }) => b - a);

    // Only return the title and rates_per_installs for every object in the array
    return data.map((d) => ({ title: d.title, rates_per_installs: d.rates_per_installs }));
  })(data).slice(0, 30); // Only get the first 30

  const margin = { top: 30, right: 30, bottom: 200, left: 60 },
    width = (window.screen.width - margin.left - margin.right) * 0.98,
    height = (window.screen.height - margin.top - margin.bottom) * 0.65;

  var svg = d3
    .select("#graph_1")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // X axis
  var xScale = d3
    .scaleBand()
    .range([0, width])
    .domain(dataFirstQuieston.map((d) => d.title))
    .padding(0.2);

  // Add the text
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")
    .style("font-weight", "bold");

  // Add Y axis
  var yScale = d3
    .scaleLinear()
    .domain([0, Math.max(...data.map((d) => d.rates_per_installs))])
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(yScale));

  // Add the bars
  const rect = svg
    .selectAll("mybar")
    .data(dataFirstQuieston)
    .enter()
    .append("rect")
    .attr("x", (d) => xScale(d.title))
    .attr("y", (d) => yScale(d.rates_per_installs))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - yScale(d.rates_per_installs))
    .attr("fill", "#69b3a2")
    .on("mouseover", function () {
      this.style.fill = "#3b645a";
    })
    .on("mouseout", function () {
      this.style.fill = "#69b3a2";
    });

  const tip = d3
    .tip()
    .attr("class", "d3-tip")
    .html((_, d) => d.rates_per_installs.toFixed(3));
  svg.call(tip); // Agrega el tip al svg
  rect
    .on("mouseover.tip", tip.show) //
    .on("mouseout.tip", tip.hide);
}

function secondQuiston(data) {
  const dataToUse = ((data) => {
    const { installs, category, ...hello } = data
      .map((d) => ({ category: d.category, installs: d.installs }))
      .reduce((p = {}, d) => {
        if (p[d.category]) p[d.category] += d.installs;
        else p[d.category] = d.installs;

        return p;
      });

    return Object.entries(hello)
      .map(([category, installs]) => ({ category, installs }))
      .sort(({ installs: a }, { installs: b }) => b - a);
  })(data);

  const margin = { top: 30, right: 30, bottom: 100, left: 90 },
    width = (window.screen.width - margin.left - margin.right) * 0.98,
    height = (window.screen.height - margin.top - margin.bottom) * 0.7;

  var svg = d3
    .select("#graph_2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // X axis
  var xScale = d3
    .scaleBand()
    .range([0, width])
    .domain(dataToUse.map((d) => d.category))
    .padding(1);

  // Add the text
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end")
    .style("font-weight", "bold");

  // Add Y axis
  var yScale = d3
    .scaleLinear()
    .domain([0, Math.max(...dataToUse.map((d) => d.installs))])
    .range([height, 0]);
  svg.append("g").call(d3.axisLeft(yScale));

  // Lines
  const rect = svg
    .selectAll("myline")
    .data(dataToUse)
    .enter()
    .append("line")
    .attr("x1", (d) => xScale(d.category))
    .attr("x2", (d) => xScale(d.category))
    .attr("y1", (d) => yScale(d.installs))
    .attr("y2", yScale(0))
    .attr("stroke", "grey");

  // Circles
  const circle = svg
    .selectAll("mycircle")
    .data(dataToUse)
    .enter()
    .append("circle")
    .attr("cx", (d) => xScale(d.category))
    .attr("cy", (d) => yScale(d.installs))
    .attr("r", "4")
    .style("fill", "#69b3a2")
    .attr("stroke", "black")
    .on("mouseover", function () {
      this.style.fill = "#3b645a";
    })
    .on("mouseout", function () {
      this.style.fill = "#69b3a2";
    });

  const tip = d3
    .tip()
    .attr("class", "d3-tip")
    .html((_, d) => numberWithCommas(d.installs));
  svg.call(tip); // Agrega el tip al svg

  rect
    .on("mouseover.tip", tip.show) //
    .on("mouseout.tip", tip.hide);
  circle
    .on("mouseover.tip", tip.show) //
    .on("mouseout.tip", tip.hide);
}

function thirdQuieston(data) {
  const dataToUse = ((data) => {
    const { price, category, installs, ...gruped } = data
      .filter(({ price }) => price > 0)
      .map((d) => ({ category: d.category, price: d.price, installs: d.installs }))
      .reduce((p = {}, d) => {
        if (p[d.category]) p[d.category] += d.price * d.installs;
        else p[d.category] = d.price * d.installs;

        return p;
      });

    return Object.entries(gruped)
      .map(([category, earnings]) => ({ earnings, category }))
      .sort(({ earnings: a }, { earnings: b }) => b - a);
  })(data);

  var margin = { top: 30, right: 120, bottom: 30, left: 50 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  var svg = d3
    .select("#graph_3")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var pie = d3
    .pie()
    .sort(null)
    .value((d) => d.earnings);

  var arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - 1)
    .cornerRadius(15);
  const arcs = pie(dataToUse);

  svg
    .append("g")
    .attr("stroke", "white")
    .selectAll("path")
    .data(arcs)
    .enter()
    .append("path")
    .attr("fill", randomColor)
    .attr("d", arc)
    .append("title")
    .text((d) => `${d.data.category}: $${numberWithCommas(d.data.earnings)}`);
}
