<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
  
    let zipcode = '';
   

    let svg; // Make the SVG element accessible outside of the drawChart function.
    let x, y; // Declare scales globally to update them later.


    function initChart() {

        const outerWidth = 1000;

        // Increase the right margin to provide enough space for the legend
        const margin = {top: 50, right: 250, bottom: 80, left: 70},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        // Append the svg object to the body of the page
        svg = d3.select("#linechart-svg")
            .attr("viewBox", `0 0 ${outerWidth} ${height + margin.top + margin.bottom}`)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X scale and axis initialization
        x = d3.scaleBand()
            .range([0, width])
            .padding(0.2);
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`);

        // Add X axis label
        svg.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + 40) // Push the x-axis label further down
            .text("Year");
        
        // Y scale and axis initialization
        y = d3.scaleLinear()
            .range([height, 0]);
        svg.append("g")
            .attr("class", "y-axis");

        // Add Y axis label
        svg.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("y", -50) // Push the y-axis label further to the left
            .attr("x", -height / 2)
            .text("Number of Distinct Buildings or Complaints in a Year");

        // Add Chart Title
        svg.append("text")
            .attr("class", "chart title")
            .attr("x", width / 2)
            .attr("y", -20) // Adjust the chart title position
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("font-weight", "bold")
            .text("Complaints Filed about Condominium Buildings in the Boston and Cambridge Area");

            // Create a legend to the right of the chart within the margin space
        const legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", `translate(${width + 50}, ${20})`);
    
        const legendData = [
            {color: "steelblue", label: "# of Complaints Filed Per Year"},
            {color: "red", label: "# of Distinct Buildings the Complaints are Filed About"}
        ];
    
        // Determine the width of the legend box based on text length
        let legendWidth = 0;
        legendData.forEach(item => {
            const textLength = item.label.length * 8; // Approximate width of a character is 8 pixels
            legendWidth = Math.max(legendWidth, textLength);
        });
        legendWidth += 40; // Add some padding to the legend width
    
        // Add a bounding box for the legend
        legend.append("rect")
        .attr("class", "legend-box")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", legendWidth)
        .attr("height", legendData.length * 20 + 10)
        .attr("fill", "none")
        .attr("stroke", "black");

        // Add legend entries
        legendData.forEach((item, index) => {
            const legendRow = legend.append("g")
                .attr("transform", `translate(0, ${index * 20 + 10})`);

            legendRow.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr("width", 10)
                .attr("height", 10)
                .attr("fill", item.color);

            legendRow.append("text")
                .attr("x", 20)
                .attr("y", 9)
                .attr("font-size", "10px")  // Set the font size smaller
                .text(item.label);
        });
    }

    // async function aggregateAndDrawInitialChart() {
    //     // Load the entire dataset
    //     const data = await d3.csv("complaints_year_zipcode.csv");

    //     // Clean up any hidden characters in the headers
    //     data.columns = data.columns.map(column => column.trim().replace(/[^\x20-\x7E]+/g, ""));

    //     // Aggregate data for all zip codes
    //     let aggregateYearlyData = {};

    //     data.forEach(d => {
    //         const year = d['Date (Years)']; // Or parse as needed
    //         if (!aggregateYearlyData[year]) {
    //             aggregateYearlyData[year] = { count: 0, discounted: 0 };
    //         }
    //         aggregateYearlyData[year].count += +d['Number of Complaints Filed Per Year'];
    //         aggregateYearlyData[year].discounted += +d['Number of Distinct Condominium Buildings the Complaints are Filed About'];
    //     });

    //     // Convert the aggregated data into an array suitable for D3.js
    //     let plotData = Object.keys(aggregateYearlyData).map(year => ({
    //         year: year,
    //         count: aggregateYearlyData[year].count,
    //         discounted: aggregateYearlyData[year].discounted
    //     }));

    //     // Now draw the chart with the aggregated data
    //     drawChartInital(plotData);
    // }

    // async function drawChartInital(plotData) {

    //     // Define the lines using the D3 line generator
    //     const lineCount = d3.line()
    //     .x(d => x(d.year) + x.bandwidth() / 2)
    //     .y(d => y(d.count));

    //     const lineDiscounted = d3.line()
    //     .x(d => x(d.year) + x.bandwidth() / 2)
    //     .y(d => y(d.discounted));

    //     // Update X axis
    //     x.domain(plotData.map(d => d.year));
    //     svg.select(".x-axis") // Select the existing x-axis
    //       .transition()
    //       .duration(750)
    //       .call(d3.axisBottom(x))
    //       .selectAll("text")
    //       .attr("transform", "translate(-10,0)rotate(-45)")
    //       .style("text-anchor", "end");

    //     // Update Y axis
    //     y.domain([0, d3.max(plotData, d => Math.max(d.count, d.discounted))]);
    //     svg.select(".y-axis") // Select the existing y-axis
    //       .transition()
    //       .duration(750)
    //       .call(d3.axisLeft(y));


    //     // Select the paths for count and discounted lines
    //     let pathCount = svg.selectAll(".line-count").data([plotData], d => d.year);
    //     let pathDiscounted = svg.selectAll(".line-discounted").data([plotData], d => d.year);

    //     // Update the paths with a transition
    //     pathCount.transition()
    //         .duration(750)
    //         .attr("d", lineCount(plotData)); // Pass the new data to the line generator

    //     pathDiscounted.transition()
    //         .duration(750)
    //         .attr("d", lineDiscounted(plotData)); // Pass the new data to the line generator

    //     // If the pathCount or pathDiscounted selections are empty, it means we don't have any paths yet. We need to create them:
    //     if (pathCount.empty()) {
    //         svg.append("path")
    //             .data([plotData])
    //             .attr("class", "line-count")
    //             .attr("fill", "none")
    //             .attr("stroke", "steelblue")
    //             .attr("stroke-width", 1.5)
    //             .attr("d", lineCount);
    //     }

    //     if (pathDiscounted.empty()) {
    //         svg.append("path")
    //             .data([plotData])
    //             .attr("class", "line-discounted")
    //             .attr("fill", "none")
    //             .attr("stroke", "red")
    //             .attr("stroke-width", 1.5)
    //             .attr("d", lineDiscounted);
    //     }

    // }


    async function drawChart(zipcode) {
        // Load data
        const data = await d3.csv("complaints_year_zipcode.csv");

        // Fix potential hidden characters in headers
        data.columns = data.columns.map(column => column.trim().replace(/[^\x20-\x7E]+/g, ""));

        // Filter data based on the input zipcode
        const filteredData = data.filter(d => d['Zip Code'] === zipcode);

        // Process data to get yearly counts
        let yearlyData = {};
        filteredData.forEach(d => {
            const year = d['Date (Years)']; // Or parse the year if needed
            if (!yearlyData[year]) {
                yearlyData[year] = { count: 0, discounted: 0 };
            }
            yearlyData[year].count += +d['Number of Complaints Filed Per Year'];
            yearlyData[year].discounted += +d['Number of Distinct Condominum Buildings the Complaints are Filed About'];
        });

        // Convert the processed object into an array suitable for D3.js
        let plotData = Object.keys(yearlyData).map(year => ({
            year: year,
            count: yearlyData[year].count,
            discounted: yearlyData[year].discounted
        }));

        // Define the lines using the D3 line generator
        const lineCount = d3.line()
        .x(d => x(d.year) + x.bandwidth() / 2)
        .y(d => y(d.count));

        const lineDiscounted = d3.line()
        .x(d => x(d.year) + x.bandwidth() / 2)
        .y(d => y(d.discounted));

        // Update X axis
        x.domain(plotData.map(d => d.year));
        svg.select(".x-axis") // Select the existing x-axis
        .transition()
        .duration(750)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

        // Update Y axis
        y.domain([0, d3.max(plotData, d => Math.max(d.count, d.discounted))]);
        svg.select(".y-axis") // Select the existing y-axis
        .transition()
        .duration(750)
        .call(d3.axisLeft(y));


        // Select the paths for count and discounted lines
        let pathCount = svg.selectAll(".line-count").data([plotData], d => d.year);
        let pathDiscounted = svg.selectAll(".line-discounted").data([plotData], d => d.year);

        // Update the paths with a transition
        pathCount.transition()
            .duration(750)
            .attr("d", lineCount(plotData)); // Pass the new data to the line generator

        pathDiscounted.transition()
            .duration(750)
            .attr("d", lineDiscounted(plotData)); // Pass the new data to the line generator

        // If the pathCount or pathDiscounted selections are empty, it means we don't have any paths yet. We need to create them:
        if (pathCount.empty()) {
            svg.append("path")
                .data([plotData])
                .attr("class", "line-count")
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", lineCount);
        }

        if (pathDiscounted.empty()) {
            svg.append("path")
                .data([plotData])
                .attr("class", "line-discounted")
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("stroke-width", 1.5)
                .attr("d", lineDiscounted);
        }

    }

    // aggregateAndDrawInitialChart();

    // Then call drawChart when needed (e.g., on zipcode input)
    function updateChart() {
        // No need to get the zipcode from the DOM, use the Svelte bound variable directly
        if (zipcode) {
            drawChart(zipcode);
        } else {
            alert("Please enter a zipcode.");
        }
    }

    onMount(() => {
    // Initial setup of the chart, equivalent to the window.onload or $(document).ready in jQuery
    initChart();
  });
</script>

<input type="text" bind:value={zipcode} placeholder="Enter Zipcode">
<button on:click={updateChart}>Update Chart</button>
<svg id="linechart-svg" width="960" height="500"></svg>