import React, { useEffect } from "react";
import * as d3 from "d3"; // Importa todo de d3 y llámalo d3

function Bar() {
  const dataSet = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13];
  const width = 960;
  const height = 200;

  useEffect(() => {
    const svg = d3
      .select("body") //
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    svg
      .selectAll("rect") //
      .data(dataSet)
      .enter()
      .append("rect")
      .attr("width", 50)
      .attr("height", (d) => d)
      .attr("x", (_, i) => (i + 1) * (width / dataSet.length))
      .attr("y", (d) => height - d)
      .attr("fill", "black");
  }, []);

  return (
    //
    <div>Aquí está el Bar</div>
  );
}

export default Bar;
