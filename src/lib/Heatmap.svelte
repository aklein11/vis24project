<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    let data = [];
  
    // Dimensions and margins of the graph
    const margin = { top: 110, right: 25, bottom: 30, left: 40 };
    const width = 450 - margin.left - margin.right;
    const height = 450 - margin.top - margin.bottom;
  
    onMount(async () => {
      // Load and process the data
      data = await d3.csv('/heatmap_data.csv');
      createHeatmap();
    });
  
    function createHeatmap() {
      const svg = d3.select('#heatmap')
        .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
      // Labels of row and columns
      const myGroups = Array.from(new Set(data.map(d => d['LU prior groups'])));
      const myVars = Array.from(new Set(data.map(d => d['LU post groups'])));
  
      // Build X scales and axis
      const x = d3.scaleBand()
        .range([0, width])
        .domain(myGroups)
        .padding(0.05);
      svg.append('g')
        .style('font-size', 15)
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSize(0))
        .select('.domain').remove();
        // // X-axis title
        // .append('text')
        // .attr('text-anchor', 'middle')
        // .attr('x', width / 2)
        // .attr('y', 40) // Adjust the position as needed
        // .text('Property type before conversion')
        // .style('font-size', '14px');
  
      // Build Y scales and axis
      const y = d3.scaleBand()
        .range([height, 0])
        .domain(myVars)
        .padding(0.05);
      svg.append('g')
        .style('font-size', 15)
        .call(d3.axisLeft(y).tickSize(0))
        .select('.domain').remove();
        // // Y-axis title
        // .append('text')
        // .attr('text-anchor', 'middle')
        // .attr('transform', 'rotate(-90)')
        // .attr('y', -50) // Adjust the position leftward as needed
        // .attr('x', -height / 2)
        // .text('Property type after conversion')
        // .style('font-size', '14px');
  
      // Build color scale
      const myColor = d3.scaleSequential()
        .interpolator(d3.interpolateInferno)
        .domain(d3.extent(data, d => +d['Count of LU post']));

    // create a tooltip
    const tooltip = d3.select("#heatmap")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function(event,d) {
        tooltip
        .style("opacity", 1)
        d3.select(this)
        .style("stroke", "black")
        .style("opacity", 1)
    };
    const mousemove = function(event,d) {
        tooltip
        .html("The exact value of<br>this cell is: " + d['Count of LU post'])
        .style("left", (event.x)/2 + "px")
        .style("top", (event.y)/2 + "px")
    };
    const mouseleave = function(event,d) {
        tooltip
        .style("opacity", 0)
        d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    };
  
      // Add the squares
      svg.selectAll()
        .data(data, d => d['LU prior groups'] + ':' + d['LU post groups'])
        .join('rect')
          .attr('x', d => x(d['LU prior groups']))
          .attr('y', d => y(d['LU post groups']))
          .attr('rx', 4)
          .attr('ry', 4)
          .attr('width', x.bandwidth())
          .attr('height', y.bandwidth())
          .style('fill', d => myColor(+d['Count of LU post']))
          .style('stroke-width', 4)
          .style('stroke', 'none')
          .style('opacity', 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);
  
      // Add title and subtitle
      svg.append('text')
        .attr('x', 0)
        .attr('y', -50)
        .attr('text-anchor', 'left')
        .style('font-size', '22px')
        .text('Number of Property Conversions');
  
      svg.append('text')
        .attr('x', 0)
        .attr('y', -20)
        .attr('text-anchor', 'left')
        .style('font-size', '14px')
        .style('fill', 'grey')
        .text('Shows the property type that was converted on the X-axis')
        .append('tspan')
        .attr('x', 0)
        .attr('dy', '1.2em')
        .text('and the property it was converted to on the Y-axis.');
    }
  </script>
  
  <div id="heatmap"></div>
  
  <style>
    .tooltip {
      opacity: 0;
      background-color: white;
      border: solid;
      border-width: 2px;
      border-radius: 5px;
      padding: 5px;
    }
  </style>
  