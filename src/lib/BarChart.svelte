<script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	// import json_data from '$lib/year_built_data_v2.json';
    export let dataArray = [];
    // export let height;
    // export let yScale;

	let margin = { top: 20, right: 30, bottom: 70, left: 60 };
	// TODO: make the width and height reactive
	let width = 960 - margin.left - margin.right;
	let height = 500 - margin.top - margin.bottom;

	const xScale = d3.scaleBand()
		.domain(dataArray.map(d => d.year))
		.range([0, width])
		.padding(0.1);

    const yScale = d3.scaleLinear()
		.domain([0, d3.max(dataArray, d => d.count)])
		.range([height, 0]);

	// Axis generators
	const xAxis = d3.axisBottom(xScale)
		.tickFormat(d3.format('d')) // Remove comma from years

	const yAxis = d3.axisLeft(yScale)
		.ticks(5); // Adjust tick marks as needed

	// Function to draw the axes
	function drawAxis() {
		d3.select('.x-axis').call(xAxis);
		d3.select('.y-axis').call(yAxis);
	}

	onMount(() => {
		drawAxis();
	});
</script>

<svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
	<g transform={`translate(${margin.left},${margin.top})`}>
		{#each dataArray as d, i (d.year)}
			<rect class="bar"
						x={xScale(d.year)}
						y={yScale(d.count)}
						width={xScale.bandwidth()}
						height={height - yScale(d.count)}
						fill="orange" />
		{/each}
		<!-- TODO: format the following line such that the years are at a 45 degree angle so that we can srink the bar chart and still read them -->
		<g transform={`translate(0, ${height})`} class="x-axis">
			<!-- X axis will be drawn here by D3 -->
			<text x={width / 2} y={40} text-anchor="middle" style="font-size: 16px">Year Built</text>
		</g>
		<g class="y-axis">
			<!-- Y axis will be drawn here by D3 -->
			<text x={-height / 2} y={-50} transform="rotate(-90)" text-anchor="middle" style="font-size: 16px">Number of Buildings</text>
		</g>
	</g>
</svg>

<style>
	.bar {
		stroke: white; 
	}
	
	.axis path,
	.axis line {
		fill: none;
		stroke: black;
		shape-rendering: crispEdges;
	}

	.x-axis text {
		fill: orange;
		font-weight: bold;
		/* stroke: black; */
	}

	.y-axis text {
		fill: orange;
		font-weight: bold;
		/* stroke: black; */
	}

	.x-axis-text {
        text-anchor: end;
        transform: rotate(-45deg);
        transform-origin: end;
        white-space: nowrap; /* Prevent text wrapping */
    }
</style>