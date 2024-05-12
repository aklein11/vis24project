<script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	export let dataArray = [];

	let margin = { top: 10, right: 20, bottom: 50, left: 60 };
	let containerWidth = 700;
	let width = 700 - margin.left - margin.right;
	$: width = containerWidth - margin.left - margin.right;
	let height = 400 - margin.top - margin.bottom;

	// Initialize scales outside of onMount to make them reactive
	let xScale;
	$: xScale = d3.scaleBand()
		.range([0, width])
		.padding(0.1);
	let yScale = d3.scaleLinear()
		.range([height, 0]);

	let xAxis, yAxis;

	onMount(() => {
		containerWidth = document ? parseInt(d3.select('.bargraph-container').style('width'), 10) : 700;
		
		xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
	 	yAxis = d3.axisLeft(yScale).ticks(5);
		window.addEventListener('resize', () => {
			containerWidth = parseInt(d3.select('.bargraph-container').style('width'), 10); 
			updateScales();
		})
		updateScales(); // Initial update on mount
	});

	// Function to update scales and redraw the axes
	function updateScales() {
		xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
	 	yAxis = d3.axisLeft(yScale).ticks(5);
		d3.select('.x-axis').call(xAxis).selectAll('text').style('text-anchor', 'end').attr('dx', '-.8em').attr('dy', '.15em').attr("transform", "rotate(-45)");
		d3.select('.y-axis').call(yAxis);
	}

	// Reactive statement for handling changes in dataArray
	$: if (dataArray.length > 0) {
		xScale.domain(dataArray.map(d => d.year));
		yScale.domain([0, d3.max(dataArray, d => d.count)]);
		if (xAxis && yAxis) { // Check if axes are initialized
			updateScales();
		}
	}
</script>

<svg id="barchart-svg" width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
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
			<!-- X axis is drawn here by D3 -- do not delete -->
		</g>
		<g transform={`translate(0, ${height})`} class="x-axis-label">
			<text x={width / 2} y={50} text-anchor="middle" style="font-size: 18px">
				Year Built
			</text>
		</g>
		<g class="y-axis text">
			<!-- Y axis will be drawn here by D3 -->
			<text x={-height / 2} y={-45} transform="rotate(-90)" text-anchor="middle" style="font-size: 18px">Number of Buildings</text>
		</g>
	</g>
</svg>

<style>

	.bar {
		stroke: white; 
	}

	.x-axis-label text {
		fill: orange;
		font-weight: bold;
		font-size: 18px;
		/* stroke: black; */
	}

	.y-axis text {
		fill: orange;
		font-weight: bold;
		font-size: 18px;
		/* stroke: black; */
	}


</style>