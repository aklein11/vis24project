<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    export let query = "";
    let data = [];
    let filteredData = [];
  
    let svg;
    let radiusScale; // For bubble sizes
    let width = 500, height = 500;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    async function drawChart(zipcode) {
      // Load data
      // const data = await d3.csv("complaints_count_zipcode.csv");
      data = await d3.csv("complaints_count_zipcode.csv");
  
      // Fix potential hidden characters in headers
      data.columns = data.columns.map(column => column.trim().replace(/[^\x20-\x7E]+/g, ""));
  
      const filterData = () => {
        if (zipcode) {
          return data.filter(d => d["Zip Code"] === zipcode);
        } else {
          // Group data by Description and sum counts
          const grouped = d3.groups(data, d => d["Description (group)"])
            .map(group => ({
              "Description (group)": group[0],
              "Count of Description": d3.sum(group[1], d => +d["Count of Description"])
            }));
          return grouped;
        }
      };

      // // Filter data based on the input zipcode
      // const filteredData = data.filter(d => {
      //   if (zipcode) {
      //     return d["Zip Code"] === zipcode;
      //   }
      //   return true;
      //   });
      filteredData = filterData()
        .sort((a, b) => b["Count of Description"] - a["Count of Description"]) //descending order sort
        .slice(0, 5); // Take only the top 5;

      
      // const validFilteredData = filteredData.filter(d => d["Description (group)"] != null);
      // colorScale.domain(validFilteredData.map(d => d["Description (group)"]));


      // Before you use colorScale to set any colors:
      // colorScale.domain(validFilteredData.map(d => d["Description (group)"]));

      // Before you use colorScale to set any colors:
      // colorScale.domain(filteredData.map(d => d["Description (group)"]));
      
      // Create a pack layout
      const pack = d3.pack()
        .size([width - margin.left - margin.right, height - margin.top - margin.bottom])
        .padding(10); // Adjust padding based on your needs

      // Apply the pack layout to the filtered data
      const root = d3.hierarchy({ children: filteredData })
        .sum(d => +d["Count of Description"]);

      const packedData = pack(root).descendants();

      // Initialize the SVG container
      // svg = d3.select('svg')
      svg = d3.select('#bubblechart-svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

  
      // Add bubbles
    const circles = svg.selectAll('circle')
        .data(packedData.slice(1)) // Exclude the root node
        .enter().append('circle')
        .attr('cx', d => d.x - 40)
        .attr('cy', d => d.y)
        .attr('r', d => 0.6 * d.r) // Use the packed radius directly
        .attr('fill', d => colorScale(d.data["Description (group)"]))
        .attr('opacity', 0.7);

    // Tooltips using mouse events
    circles.on('mouseover', function (event, d) {
        // You can use a tooltip div if you want more styling,
        // but for simplicity, we're using the 'title' element here.
        d3.select(this).append("title")
            .text(d.data["Description (group)"]);
    })
    .on('mouseout', function () {
        d3.select(this).select("title").remove();
    });

    console.log(colorScale.domain());
  
      // Create legend
      const legend = d3.select('.bubble-legend')
        .selectAll('.bubble-legend-item')
        // .data(colorScale.domain())
        .data(packedData, d => d.data["Description (group)"])
        .enter().append('div')
        .classed('bubble-legend-item', true);
  
      legend.append('div')
        .classed('bubble-legend-color', true)
        .style('background-color', d => colorScale(d));

      legend.exit().remove();
  
      // legend.append('div')
      //   .classed('bubble-legend-label', true)
      //   .text(d => d);
    }
  
    function updateChart(zipcode) {
      if (zipcode) {
        // Load data
        d3.csv("complaints_count_zipcode.csv").then(data => {
          // Fix potential hidden characters in headers
          data.columns = data.columns.map(column => column.trim().replace(/[^\x20-\x7E]+/g, ""));

          const filterData = () => {
            if (zipcode) {
              return data.filter(d => d["Zip Code"] === zipcode);
            } else {
              // Group data by Description and sum counts
              const grouped = d3.groups(data, d => d["Description (group)"])
                .map(group => ({
                  "Description (group)": group[0],
                  "Count of Description": d3.sum(group[1], d => +d["Count of Description"])
                }));
              return grouped;
            }
          };

          filteredData = filterData()
            .sort((a, b) => b["Count of Description"] - a["Count of Description"]) // Descending order sort
            .slice(0, 5); // Take only the top 5
          // const validFilteredData = filteredData.filter(d => d["Description (group)"] != null);
          // colorScale.domain(validFilteredData.map(d => d["Description (group)"]));
          // console.log("map", filteredData.map(d => d["Description (group)"]));
          // colorScale.domain(filteredData.map(d => d["Description (group)"]));



          // Before you use colorScale to set any colors:
          // colorScale.domain(validFilteredData.map(d => d["Description (group)"]));
          // console.log("color scale", colorScale.domain());

          // console.log("filtered data", validFilteredData);

          // Apply the pack layout to the filtered data
          const root = d3.hierarchy({ children: filteredData })
            .sum(d => +d["Count of Description"]);

          const pack = d3.pack()
            .size([width - margin.left - margin.right, height - margin.top - margin.bottom])
            .padding(10);

          const packedData = pack(root).descendants().slice(1); // Exclude the root node
          // colorScale.domain(packedData.map(d => d.data["Description (group)"]));

          // Bind new data to existing circles using a key function
          const circles = svg.selectAll('circle')
            .data(packedData, d => d.data["Description (group)"]); // Use the description as a key

          // Exit old circles
          circles.exit()
            .transition()
            .duration(750)
            .attr('r', 0)
            .remove();

          // Update existing circles
          circles.transition()
            .duration(750)
            .attr('cx', d => d.x - 40)
            .attr('cy', d => d.y)
            .attr('r', d => 0.6 * d.r);

          // Enter new circles
          circles.enter().append('circle')
            .attr('cx', d => d.x - 40)
            .attr('cy', d => d.y)
            .attr('r', 0) // Start at 0 radius and transition to the new radius
            .attr('fill', d => colorScale(d.data["Description (group)"]))
            .attr('opacity', 0.7)
            .transition()
            .duration(750)
            .attr('r', d => 0.6* d.r); // Transition to the correct radius

          

          // Update the legend
          console.log('color scale', colorScale.domain());
          const legend = d3.select('.bubble-legend')
            .selectAll('.bubble-legend-item')
            // .data(colorScale.domain());
            .data(packedData, d => d.data["Description (group)"]);

          legend.enter().append('div')
            .classed('bubble-legend-item', true)
            .merge(legend) // Merge enter and update selections
            .select('.bubble-legend-color')
            .style('background-color', d => colorScale(d.data["Description (group)"]));
          
          // Remove any legend items that are no longer in the data
          legend.exit().remove();

          // // After setting the colorScale domain
          // const legendItems = d3.select('.bubble-legend').selectAll('.bubble-legend-item')
          //   .data(filteredData);
          // legendItems.enter()
          //   .append('li')
          //   .classed('bubble-legend-item', true)
          //   .merge(legendItems)
          //   .style('--color', d => colorScale(d["Description (group)"]))
          //   .html(d => `
          //     <span class="swatch" style="background-color: ${colorScale(d["Description (group)"])}"></span>
          //     ${d["Description (group)"]} <em>(${d["Count of Description"]})</em>
          //   `);

          // legendItems.exit().remove();

          // Update tooltips
          svg.selectAll('circle')
            .on('mouseover', function (event, d) {
              d3.select(this).append("title")
                .text(d.data["Description (group)"]);
            })
            .on('mouseout', function () {
              d3.select(this).select("title").remove();
            });
        });
      } else {
        alert('Please enter a zipcode.');
      }
    }

    $: if (query) {
      updateChart(query);
    }
  
    onMount(() => {
      drawChart(query); // Initially draw bubbles for a default zipcode
    });
</script>


<div class="container">
  <svg id="bubblechart-svg"></svg>

  <ul class="bubble-legend">
      {#each filteredData as d, index}
          {console.log("bubble legend filteredata ", filteredData)}
          <li class="bubble-legend-item" style="--color: { colorScale(d['Description (group)']) }">
              <span class="swatch"></span>
              {d["Description (group)"]} <em>({d["Count of Description"]})</em>
          </li>
      {/each}
  </ul>
</div>

<br>

<text scrolly-container>
  We categorized the complaints into groups to demonstrate the impact of condominium development both on residents and the surrounding neighborhood.
</text>


<style>
  /* #bubblechart-svg {
max-width: 20em;
margin-block: 2em;
overflow: visible; /* Do not clip shapes outside the viewBox */
  /* } */

  .container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      align-items: horizontal;
      gap: 1em;
  }

  .bubble-legend {
      list-style: none;
      padding: 1em;
      margin: 1em;
      flex: 1;
      /* display: grid; */
      grid-template-columns: repeat(auto-fill, minmax(9em, 1fr));
      outline: grey solid 3px;
      margin: auto;
      max-width: 700px;
  }

  .bubble-legend li {
      display: flex;
      align-items: center;
      gap: 1em;
  }
  .swatch {
        width: 1em;
        height: 1em;
        background-color: var(--color);
        display:inline-block;
        margin-right: 5px;
        border-radius: 50%;
        /* aspect-ratio: 1 / 1;  */
    }
  .bubble-legend-color {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
</style>
