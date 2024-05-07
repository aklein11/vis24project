<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    let data = [];
  
    // Dimensions and margins of the graph
    const margin = { top: 110, right: 80, bottom: 225, left: 150 };
    const width = 850 - margin.left - margin.right;
    const height = 850 - margin.top - margin.bottom;
  
    onMount(async () => {
      // Load and process the data
      data = await d3.csv('/heatmap_data.csv');
      createHeatmap();
    });
  
    function createHeatmap() {
  
      const labelDict = {"CM": "Condo Units in Building",
                "R1": "1-Family",
                "R2": "2-Family",
                "R3": "3-Family",
                "R4": "4-6 Units",
                "A": "7+ Units",
                "RL": "Residential Lot",
                "CD": "Condo",
                "CC": "Commercial Condo",
                "C": "Commercial",
                "RC": "Mixed Use",
                "CL": "Commercial Land",
                "CP": "Condo Parking",
                "I": "Industrial",
                "E": "Exempt",
                "EA": "Exempt (A)"};
      const mappedData = data.map(d => ({ 'Count of LU post': +d['Count of LU post'], 'LU prior groups':  labelDict[d['LU prior groups']], 'LU post groups':  labelDict[d['LU post groups']]}));
      // Labels of row and columns
      let categorySums = d3.rollup(mappedData, 
          v => d3.sum(v, d => d['Count of LU post']), // Sum the counts for each category
          d => d['LU prior groups'] // Group by the category field that corresponds to the X-axis
      );

      // Convert the Map to a sorted array
      categorySums = Array.from(categorySums, ([key, value]) => ({ key, value }))
          .sort((a, b) => b.value - a.value); // Sort categories by descending order of their sums

      // Extract the sorted category names for the X-axis domain
      const myGroups = categorySums.map(d => d.key);
      const myVars = Array.from(new Set(mappedData.map(d => d['LU post groups'])));

      let completeData = [];

      myGroups.forEach(group => {
          myVars.forEach(variable => {
              completeData.push({
                  'LU prior groups': group,
                  'LU post groups': variable,
                  'Count of LU post': 0 // Default value for missing data
              });
          });
      });

      mappedData.forEach(data => {
        // Find the corresponding entry in completeData and update it
        let match = completeData.find(d => 
            d['LU prior groups'] === data['LU prior groups'] && 
            d['LU post groups'] === data['LU post groups']
        );

        if (match) {
            match['Count of LU post'] = +data['Count of LU post']; // Update the count
        }
    });


      // Define SVG and its inner grouping element
      const svg = d3.select('#heatmap')
          .append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // Build X scales and axis
      const x = d3.scaleBand()
          .range([0, width])
          .domain(myGroups)
          .padding(0.05);

      // Append the X-axis
      const xAxis = svg.append('g')
          .attr('transform', `translate(0, ${height})`)
          .call(d3.axisBottom(x).tickSize(1))
          .selectAll(".tick text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-90)");

      // Remove the domain line
      xAxis.select('.domain').remove();

      // Append X-axis title separately
      svg.append('text')
          .attr('text-anchor', 'middle')
          .attr('x', width / 2)
          .attr('y', height + margin.bottom - 60)
          .text('Property type before conversion')
          .style('font-size', '14px');
  
      // Build Y scales and axis
      const y = d3.scaleBand()
          .range([height, 0])
          .domain(myVars)
          .padding(0.05);

      // Append the Y-axis
      svg.append('g')
          .call(d3.axisLeft(y).tickSize(0))
          .select('.domain').remove();

      // Append Y-axis title separately
      svg.append('text')
          .attr('text-anchor', 'middle')
          .attr('transform', 'rotate(-90)')
          .attr('y', -margin.left + 20)
          .attr('x', -(height / 2))
          .text('Property type after conversion')
          .style('font-size', '14px');

      // Titles and subtitles for the heatmap
      svg.append('text')
          .attr('x', 0)
          .attr('y', -50)
          .attr('text-anchor', 'left')
          .style('font-size', '22px')
          .text('Conversion of Property Types: Before and After');

      // Build color scale
      // const myColor = d3.scaleSequential()
      //   .interpolator(d3.interpolateInferno)
      //   .domain(d3.extent(mappedData, d => +d['Count of LU post']).reverse());

      // Build color scale using d3.interpolateBlues
      const myColor = d3.scaleSequential(t => d3.interpolateBlues(t * 0.7 + 0.15))
      .domain(d3.extent(mappedData, d => +d['Count of LU post']));


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
    const mousemove = function(event, d) {
        const xPosition = x(d['LU prior groups']) + x.bandwidth(); // Position at the right of the rectangle
        const yPosition = y(d['LU post groups']); // Position at the top of the rectangle

        tooltip
          .html("The exact value of<br>this cell is: " + d['Count of LU post'])
          .style("left", (event.pageX + 10) + "px") // Use pageX for more stable positioning relative to the page, add offset for clarity
          .style("top", (event.pageY - tooltip.node().offsetHeight - 10) + "px"); // Use pageY and adjust for tooltip height
    };
    const mouseleave = function(event,d) {
        tooltip
        .style("opacity", 0)
        d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
    };
  
    // Add the squares
    // Use completeData to draw the heatmap
svg.selectAll('rect')
    .data(completeData, d => d['LU prior groups'] + ':' + d['LU post groups'])
    .join('rect')
      .attr('x', d => x(d['LU prior groups']))
      .attr('y', d => y(d['LU post groups']))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => d['Count of LU post'] === 0 ? 'white' : myColor(d['Count of LU post']))
      .style('stroke-width', 4)
      .style('opacity', 0.8)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);

      // Assuming myColor is defined as your color scale
      const numSwatches = 10;  // Number of swatches in the legend
      const colorRange = myColor.domain();  // Get the domain of your color scale

      // Create legend data from the color scale domain
      const legendData = Array.from({length: numSwatches}, (_, i) => {
          const range = colorRange[1] - colorRange[0];
          const increment = range / numSwatches;
          return colorRange[0] + i * increment;
      });

      const svgWidth = width + margin.left + margin.right;  // Make sure to include margins if they aren't included in 'width'

const legendWidth = 190;  // Set this to the actual width of your legend
const paddingRight = 30;  // Increase padding if the legend still appears too centered

// Update the transform attribute for the legend group
const legend = svg.append('g')
    .attr('transform', `translate(${svgWidth - legendWidth - paddingRight}, 50)`);

// Add legend elements (rectangles and text)
legend.selectAll('rect')
    .data(legendData)
    .enter().append('rect')
        .attr('x', 0)
        .attr('y', (d, i) => i * 20)
        .attr('width', 20)
        .attr('height', 20)
        .style('fill', d => myColor(d));

legend.selectAll('text')
    .data(legendData)
    .enter().append('text')
        .attr('x', 30)
        .attr('y', (d, i) => i * 20 + 15)
        .text(d => Math.round(d));

// Optionally, add a title to your legend
legend.append('text')
    .attr('x', 0)
    .attr('y', -10)
    .text('Count')
    .attr('font-weight', 'bold')
    .style('font-size', '12px');
    }
  </script>
  
  <div id="heatmap"></div>
  
  <style>
    /* .tooltip {
      opacity: 0;
      background-color: white;
      border: solid;
      border-width: 2px;
      border-radius: 5px;
      padding: 5px;
    } */
  </style>
  