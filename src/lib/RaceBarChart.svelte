<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import data from '$lib/complaints_data.json';

  let index = 0; // This will track the current date index for the animation

  onMount(() => {
    const margin = { top: 20, right: 20, bottom: 100, left: 250 };
    const width = 1000 - margin.left - margin.right;
    const height = 700 - margin.top - margin.bottom;

    const svg = d3.select('#chart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Set up the scales
    const xScale = d3.scaleLinear()
      .range([0, width]);
    const yScale = d3.scaleBand()
      .rangeRound([0, height])
      .padding(0.1);

    // Define the axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Append the axes to the svg
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')');

    svg.append('g')
      .attr('class', 'y axis');

      const updateBars = () => {
  const currentDateData = data[index];

  let categories = Object.entries(currentDateData).slice(1); // Skip the 'Date' entry

  // Sort the categories by value in descending order
  categories.sort((a, b) => b[1] - a[1]);

  // Slice the categories array to contain only the top 15 entries
  categories = categories.slice(0, 20);
  // Update scales
  xScale.domain([0, d3.max(categories, d => d[1])]);
  yScale.domain(categories.map(d => d[0]));

  // Define a color scale
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10)
    .domain(categories.map(d => d[0]));

  // Update the axes
  svg.select('.x.axis').transition().duration(250).call(xAxis);
  svg.select('.y.axis').transition().duration(250).call(yAxis);

  // Select bars in SVG and bind current date data to the bars
  const bars = svg.selectAll('.bar')
    .data(categories, d => d[0]);

  bars.enter()
    .append('rect')
    .attr('class', 'bar')
    .merge(bars)
    .transition()
    .duration(500)
    .attr('x', 0)
    .attr('y', d => yScale(d[0]))
    .attr('width', d => xScale(d[1]))
    .attr('height', yScale.bandwidth())
    .attr('fill', d => colorScale(d[0])); // Set bar color based on category

  bars.exit().remove();

  // Update index to the current date for the next round of data
  const currentDate = new Date();
  const currentDateIndex = data.findIndex(entry => entry.Date === currentDate);
  index = currentDateIndex !== -1 ? currentDateIndex : index + 1;

  // Display current date data within the chart area
  svg.select('.current-date-text').remove(); // Remove existing text
  svg.append('text')
    .attr('class', 'current-date-text')
    .attr('x', width / 2)
    .attr('y', height + margin.top + 20)
    .attr('text-anchor', 'middle')
    .text('Current Date Data: ' + currentDateData.Date);

  if (index < data.length) setTimeout(updateBars, 250); // Schedule next update
};

    updateBars();
  });
</script>

<div id="chart"></div>
