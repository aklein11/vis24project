<script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	export let dataArrayNarr = [];

	let margin = { top: 20, right: 30, bottom: 70, left: 80 };
	let width = 960 - margin.left - margin.right;
	let height = 500 - margin.top - margin.bottom;

	// Initialize scales outside of onMount to make them reactive
	let xScale = d3.scaleBand()
		.range([0, width])
		.padding(0.1);
	let yScale = d3.scaleLinear()
		.range([height, 0]);

	let xAxisNarr, yAxisNarr;

	onMount(() => {
		xAxisNarr = d3.axisBottom(xScale).tickFormat(d3.format('d'));
		yAxisNarr = d3.axisLeft(yScale).ticks(5);
		updateScales(); // Initial update on mount
	});

	// Function to update scales and redraw the axes
	function updateScales() {
		d3.select('.x-axisNarr').call(xAxisNarr);
		d3.select('.y-axisNarr').call(yAxisNarr);
	}

	// Reactive statement for handling changes in dataArray
	$: if (dataArrayNarr.length > 0) {
		xScale.domain(dataArrayNarr.map(d => d.year));
		yScale.domain([0, d3.max(dataArrayNarr, d => d.count)]);
		if (xAxisNarr && yAxisNarr) { // Check if axes are initialized
			updateScales();
		}
	}
</script>

<svg id="barchart-svg" width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
	<g transform={`translate(${margin.left},${margin.top})`}>
		{#each dataArrayNarr as d, i (d.year)}
			<rect class="bar"
						x={xScale(d.year)}
						y={yScale(d.count)}
						width={xScale.bandwidth()}
						height={height - yScale(d.count)}
						fill="#558B2F" />
		{/each}
		<!-- TODO: format the following line such that the years are at a 45 degree angle so that we can srink the bar chart and still read them -->
		<g transform={`translate(0, ${height})`} class="x-axisNarr">
			<!-- X axis will be drawn here by D3 -->
			<text x={width / 2} y={40} text-anchor="middle" style="font-size: 18px">Year Built</text>
		</g>
		<g class="y-axisNarr">
			<!-- Y axis will be drawn here by D3 -->
			<text x={-height / 2} y={-50} transform="rotate(-90)" text-anchor="middle" style="font-size: 18px" >Number of Buildings</text>
		</g>
	</g>
</svg>

<style>
	.bar {
		stroke: white; 
	}
	
	.x-axisNarr text {
		fill: black;
		font-weight: normal;
		font-size: 18px;
		/* stroke: black; */
	}

	.y-axisNarr text {
		fill: black;
		font-weight: normal;
		font-size: 200px;
		/* stroke: black; */
	}

</style>