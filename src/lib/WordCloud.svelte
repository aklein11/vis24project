<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import cloud from 'd3-cloud';

    export let query = "";
    let data = [];
    let svg, layout;
    let filteredData = [];
    let fontSizeScale;

    // const margin = { top: 10, right: 10, bottom: 10, left: 10 },
    //       width = 450 - margin.left - margin.right,
    //       height = 450 - margin.top - margin.bottom;
    // Increase the dimensions to provide more space
    const margin = { top: 10, right: 10, bottom: 10, left: 10 },
          width = 800 - margin.left - margin.right,
          height = 800 - margin.top - margin.bottom;

    async function loadData() {
        data = await d3.csv("complaints_count_zipcode.csv");
        data.columns = data.columns.map(column => column.trim().replace(/[^\x20-\x7E]+/g, ""));
        // updateScale(); // Initialize or update the scale after data is loaded
        drawChart(query);
    }

    function updateScale() {
        const maxSize = d3.max(data, d => +d["Count of Description"]);
        // Define a maximum font size
        // const maxFontSize = 60; // This can be adjusted as per the visualization requirements
        // fontSizeScale = d3.scaleLinear()
        //     .domain([0, maxSize])
        //     .range([10, maxFontSize]); // Mapping the smallest count to a smaller readable font size and the largest to 60
        // Implement a logarithmic scale for better handling of large ranges
        fontSizeScale = d3.scaleLog()
            .domain([1, Math.max(maxSize, 10)]) // Avoid zero in log scale, ensure domain starts at least at 1
            .range([10, 60]); // Mapping to more reasonable font sizes
    }


    function filterData(zipcode) {
        if (zipcode) {
            //   return data.filter(d => d["Zip Code"] === zipcode);
            return data.filter(d => d["Zip Code"] === zipcode)
            .sort((a, b) => b["Count of Description"] - a["Count of Description"]) // Descending order sort
            // .slice(1, 16)
            .map(d => ({
                text: d["Description (group)"],
                size: +d["Count of Description"]
            }));
        } else {
            // Group data by Description and sum counts
            const grouped = d3.groups(data, d => d["Description (group)"])
            .map(group => ({
                "Description (group)": group[0],
                "Count of Description": d3.sum(group[1], d => +d["Count of Description"])
            }));
            // .sort((a, b) => b["Count of Description"] - a["Count of Description"]) // Descending order sort
            // .slice(1, 16);
            const map_grouped = grouped.map(d => ({
                text: d["Description (group)"],
                size: +d["Count of Description"]
            }));
            console.log("mapped grouped", map_grouped);
            return map_grouped;
        }
        // return data.filter(d => d["Zip Code"] === zipcode).map(d => ({
        //     text: d["Description (group)"],
        //     size: +d["Count of Description"]
        // }));
    }

    function setupSVG() {
        if (svg) {
            // Remove the old SVG if it exists
            d3.select("#wordcloud svg").remove();
        }

        // Append a new SVG
        svg = d3.select("#wordcloud").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
    }

    function drawChart(zipcode) {
        filteredData = filterData(zipcode);
        // .sort((a, b) => b["Count of Description"] - a["Count of Description"]) // Descending order sort
        //     .slice(0, 10);
        
        // updateScale();
        setupSVG();

        layout = cloud()
          .size([width, height])
          .words(filteredData)
          .padding(5)
          .rotate(() => ~~(Math.random() * 2) * 90)
        //   .fontSize(d => fontSizeScale(Math.max(d.size, 1))) // Ensure no zero sizes
        //   .fontSize(d => fontSizeScale(d.size)) // Use the scaling function for font size
          .fontSize(d => d.size)
          .on("end", drawWords);
        layout.start();
    }

    function drawWords(words) {
        svg.selectAll("text")
            .data(words)
            .join("text")
            // .style("font-size", d => `${fontSizeScale(Math.max(d.size, 1))}px`) // Apply scaled size
            // .style("font-size", d => `${fontSizeScale(d.size)}px`) // Apply scaled size
            .style("font-size", d => d.size)
            .style("fill", "#69b3a2")
            .attr("text-anchor", "middle")
            .style("font-family", "Impact")
            .attr("transform", d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
            .text(d => d.text);
    //     const textGroup = svg.selectAll("text")
    //     .data(words)
    //     .join("text")
    //     // .style("font-size", d => `${fontSizeScale(Math.max(d.size, 1))}px`)
    //     .style("font-size", d => d.size)
    //     .style("fill", "#69b3a2")
    //     .attr("text-anchor", "middle")
    //     .style("font-family", "Impact")
    //     .attr("transform", d => `translate(${[d.x, d.y]})`)
    //     .selectAll("tspan")
    //     .data(d => {
    //         // Split the text into chunks of up to three words
    //         const words = d.text.split(/\s+/);
    //         return words.map((word, i) => ({
    //             text: word,
    //             index: i,
    //             newLine: i % 3 === 0
    //         }));
    //     })
    //     .join("tspan")
    //     .text(d => d.text)
    //     .attr("x", 0) // Reset X position for each tspan
    //     .attr("dy", d => d.newLine ? "1.2em" : "0em")
    //     .attr("dx", d => d.newLine ? "0em" : "1.9em"); // Small space between words in the same line

    // // Apply the rotation after tsapn positioning
    // svg.selectAll("text").attr("transform", d => `translate(${[d.x, d.y]})rotate(${d.rotate})`);
    }

    $: if (query) {
        drawChart(query);
    }

    onMount(loadData);
</script>

<div id="wordcloud"></div>
