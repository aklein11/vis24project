<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import { writable } from 'svelte/store';

    export let query = "";
    
    let svg;
    let x, y;
    let margin = { top: 10, right: 20, bottom: 50, left: 60 };

    // Reactive container width based on actual SVG element width
    let containerWidth = writable(500); // Default width
    let width, height = 400 - margin.top - margin.bottom;

    // Update width reactively
    $: width = $containerWidth - margin.left - margin.right;

    onMount(() => {
        // Set containerWidth based on the actual width of the element
        containerWidth.set(document.getElementById('linechart-svg').clientWidth);

        // Re-render chart on window resize to make it responsive
        window.addEventListener('resize', () => {
            containerWidth.set(document.getElementById('linechart-svg').clientWidth);
        });

        initChart();
    });

    function initChart() {
        svg = d3.select("#linechart-svg")
            .attr("viewBox", `0 0 ${$containerWidth} ${height + margin.top + margin.bottom}`)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        // Append the svg object to the body of the page
        svg = d3.select("#linechart-svg")
            .attr("viewBox", `0 0 ${containerWidth} ${height + margin.top + margin.bottom}`)
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
            .attr("y", height + 50) // Push the x-axis label further down
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
            .attr("y", -40) // Push the y-axis label further to the left
            .attr("x", -height / 2-15)
            .text("Complaints (Hundreds)");
            
            // Create a legend to the right of the chart within the margin space
        const legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", `translate(${width + 50}, ${20})`);
    
        const legendData = [
            {color: "steelblue", label: "# of Complaints Filed Per Year"},
            {color: "red", label: "# of Distinct Buildings"}
        ];
    
        // Determine the width of the legend box based on text length
        let legendWidth = 0;
        legendData.forEach(item => {
            const textLength = item.label.length * 8; // Approximate width of a character is 8 pixels
            legendWidth = Math.max(legendWidth, textLength);
        });
        legendWidth += 10; // Add some padding to the legend width
    
        // Add a bounding box for the legend
        legend.append("rect")
        .attr("class", "legend-box")
        .attr("x", -300)
        .attr("y", 250)
        .attr("width", legendWidth)
        .attr("height", legendData.length * 20 + 10)
        .attr("fill", "none")
        .attr("stroke", "black");

        // Add legend entries
        legendData.forEach((item, index) => {
            const legendRow = legend.append("g")
                .attr("transform", `translate(0, ${index * 20 + 10})`);

            legendRow.append("rect")
                .attr("x", -285)
                .attr("y", 250)
                .attr("width", 10)
                .attr("height", 10)
                .attr("fill", item.color);

            legendRow.append("text")
                .attr("x", -270)
                .attr("y", 260)
                .attr("font-size", "15px")  // Set the font size smaller
                .text(item.label);
        });

        drawChart(query);
    }


    async function drawChart(zipcode) {
        // Load data
        const data = await d3.csv("complaints_year_zipcode.csv");

        // Fix potential hidden characters in headers
        data.columns = data.columns.map(column => column.trim().replace(/[^\x20-\x7E]+/g, ""));

        // Filter data based on the input zipcode
        const filteredData = data.filter(d => {
            if(zipcode) {
                return d['Zip Code'] === zipcode
            }
            return true;
            });

        // Process data to get yearly counts
        let yearlyData = {};
        filteredData.forEach(d => {
            const year = d['Date (Years)']; // Or parse the year if needed
            if (!yearlyData[year]) {
                yearlyData[year] = { count: 0, discounted: 0 };
            }
            yearlyData[year].count += +d['Number of Complaints Filed Per Year']/100;
            yearlyData[year].discounted += +d['Number of Distinct Condominum Buildings the Complaints are Filed About']/100;
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
        .style('font-size', '12px')
        .style("text-anchor", "end");

        // Update Y axis
        y.domain([0, d3.max(plotData, d => Math.max(d.count, d.discounted))]);
        svg.select(".y-axis") // Select the existing y-axis
        .transition()
        .style('font-size', '12px')
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

    $: if (query) {
        drawChart(query);
    }

    onMount(() => {
    // Initial setup of the chart, equivalent to the window.onload or $(document).ready in jQuery
    initChart();
  });
</script>

<style>
        a {
        font-weight:normal;
        text-decoration: underline;
        color:black;
    }

    text{
        font-size: 20px;
    }

</style>

<svg id="linechart-svg" width="960" height="500"></svg>

<text>
    Shown above is the number of complaints as compared to the number of distinct buildings involved in the complaints. 
    <p>
    For all of Boston, from 2019 to 2023 we see an increase in the # of complaints over time and a slight increase in the # of distinct buildings involved in the complaints.  
    </p>
    Data sourced from the RentSmart dataset.
</text>
