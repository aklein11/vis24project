<script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	export let dataArray2016 = [];

	let margin = { top: 20, right: 30, bottom: 70, left: 80 };
	let width = 960 - margin.left - margin.right;
	let height = 500 - margin.top - margin.bottom;

	// Initialize scales outside of onMount to make them reactive
	let xScale = d3.scaleBand()
		.range([0, width])
		.padding(0.1);
	let yScale = d3.scaleLinear()
		.range([height, 0]);

	let xAxis2016, yAxis2016;

	onMount(() => {
		xAxis2016 = d3.axisBottom(xScale).tickFormat(d3.format('d'));
		yAxis2016 = d3.axisLeft(yScale).ticks(5);
		updateScales(); // Initial update on mount
	});

	// Function to update scales and redraw the axes
	function updateScales() {
		d3.select('.x-axis2016').call(xAxis2016);
		d3.select('.y-axis2016').call(yAxis2016);
	}

	// Reactive statement for handling changes in dataArray
	$: if (dataArray2016.length > 0) {
		xScale.domain(dataArray2016.map(d => d.year));
		yScale.domain([0, d3.max(dataArray2016, d => d.count)]);
		if (xAxis2016 && yAxis2016) { // Check if axes are initialized
			updateScales();
		}
	}
    console.log("ARR IN", dataArray2016);
    console.log("INT", xScale(1995));
</script>

<svg id="barchart-svg" width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
	<g transform={`translate(${margin.left},${margin.top})`}>
		{#each dataArray2016 as d, i (d.year)}
			<rect class="bar"
						x={xScale(d.year)}
						y={yScale(d.count)}
						width={xScale.bandwidth()}
						height={height - yScale(d.count)}
						fill="orange" />
		{/each}
		<!-- TODO: format the following line such that the years are at a 45 degree angle so that we can srink the bar chart and still read them -->
		<g transform={`translate(0, ${height})`} class="x-axis2016">
			<!-- X axis will be drawn here by D3 -->
			<text x={width / 2} y={40} text-anchor="middle" style="font-size: 16px">Building Type Converted</text>
		</g>
		<g class="y-axis2016">
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

	.x-axis2016 text {
		fill: orange;
		font-weight: bold;
		/* stroke: black; */
	}

	.y-axis2016 text {
		fill: orange;
		font-weight: bold;
		/* stroke: black; */
	}

	.x-axis-2016-text {
        text-anchor: end;
        transform: rotate(-45deg);
        transform-origin: end;
        white-space: nowrap; /* Prevent text wrapping */
    }
</style>