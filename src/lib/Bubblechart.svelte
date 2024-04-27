<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    // let zipcode = '';
    export let query = "";
  
    let svg;
    let radiusScale; // For bubble sizes
    let width = 960, height = 500;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    async function drawChart(zipcode) {
      // Load data
      const data = await d3.csv("complaints_count_zipcode.csv");
  
      // Fix potential hidden characters in headers
      data.columns = data.columns.map(column => column.trim().replace(/[^\x20-\x7E]+/g, ""));
  
      // Filter data based on the input zipcode
      const filteredData = data.filter(d => {
        if (zipcode) {
          return d["Zip Code"] === zipcode;
        }
        return true;
        });
      
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

        svg.append("text")
            .attr("class", "chart title")
            .attr("x", width / 2)
            .attr("y", 8) // Adjust the chart title position
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .style("font-weight", "bold")
            .text("Complaint Types filed for Condominiums, 2019 to Present");
        console.log("ZIP", zipcode);

  
      // Add bubbles
    const circles = svg.selectAll('circle')
        .data(packedData.slice(1)) // Exclude the root node
        .enter().append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', d => d.r) // Use the packed radius directly
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
  
    //   // Create legend
    //   const legend = d3.select('.legend')
    //     .selectAll('.legend-item')
    //     .data(colorScale.domain())
    //     .enter().append('div')
    //     .classed('legend-item', true);
  
    //   legend.append('div')
    //     .classed('legend-color', true)
    //     .style('background-color', d => colorScale(d));
  
    //   legend.append('div')
    //     .classed('legend-label', true)
    //     .text(d => d);
    }
  
    function updateChart(zipcode) {
        if (zipcode) {
            // Load data
            d3.csv("complaints_count_zipcode.csv").then(data => {
            // Fix potential hidden characters in headers
            data.columns = data.columns.map(column => column.trim().replace(/[^\x20-\x7E]+/g, ""));
            
            // Filter data based on the input zipcode
            const filteredData = data.filter(d => {
              if (zipcode) {
                return d["Zip Code"] === zipcode;
              }
              return true;
            });
            
            // Apply the pack layout to the filtered data
            const root = d3.hierarchy({ children: filteredData })
                .sum(d => +d["Count of Description"]);

            const packedData = d3.pack()
                .size([width - margin.left - margin.right, height - margin.top - margin.bottom])
                .padding(10)(root).descendants();

            // Select existing circles and bind new data
            const circles = svg.selectAll('circle')
                .data(packedData.slice(1)); // Exclude the root node
            
            // Update existing circles
            circles.transition()
                .duration(750)
                .attr('cx', d => d.x)
                .attr('cy', d => d.y)
                .attr('r', d => d.r); // Use the packed radius directly
            
            // Enter new circles
            circles.enter().append('circle')
                .attr('cx', d => d.x)
                .attr('cy', d => d.y)
                .attr('r', d => d.r) // Use the packed radius directly
                .attr('fill', d => colorScale(d.data["Description (group)"]))
                .attr('opacity', 0.7)
                .transition()
                .duration(750)
                .attr('r', d => d.r); // Use the packed radius directly
            
            // Exit old circles
            circles.exit().remove();
            
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

<h1>Complaints by Zipcode</h1>

<blockquote scrolly-container>
  We categorized the complaints into groups to demonstrate the impact of condominium development both on residents and the surrounding neighborhood.
  </blockquote>


<svg id="bubblechart-svg"></svg>

<div class="legend"></div>


<style>
  .legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
  }

  .legend-color {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
</style>
