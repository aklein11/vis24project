<!-- <svelte:head>
	<title>Visualisation</title>
</svelte:head> -->
<!-- <h1>move or import the following code as needed; \n placed here temporarioly for editing convenience.</h1> -->

<!-- <svelte:window on:load={drawAxis}/> -->
<script>
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	import json_data from '$lib/year_built_data_v2.json';

	let margin = { top: 20, right: 30, bottom: 70, left: 60 };
	let width = 960 - margin.left - margin.right;
	let height = 500 - margin.top - margin.bottom;

	// Process the data to sum up the building counts for each decade
	const data = json_data.reduce((acc, cur) => {
		Object.keys(cur).forEach(year => {
			if (year !== 'ZIPCODE') {
				if (!acc[year]) acc[year] = 0;
				acc[year] += cur[year];
			}
		});
		return acc;
	}, {});

	// Convert object to array and sort by year
	const dataArray = Object.keys(data)
		.map(year => ({ year: parseInt(year), count: data[year] }))
		.sort((a, b) => a.year - b.year);

	const xScale = d3.scaleBand()
		.domain(dataArray.map(d => d.year))
		.range([0, width])
		.padding(0.1);

	const yScale = d3.scaleLinear()
		.domain([0, d3.max(dataArray, d => d.count)])
		.range([height, 0]);

	// const colorScale = d3.scaleOrdinal(d3.schemeTableau10)
	// 	.domain(dataArray.map(d => d.year));

	// Axis generators
	const xAxis = d3.axisBottom(xScale)
		.tickFormat(d3.format('d')); // Remove comma from years

	const yAxis = d3.axisLeft(yScale)
		.ticks(5); // Adjust tick marks as needed

	// Function to draw the axes
	function drawAxis() {
		d3.select('.x-axis').call(xAxis);
		d3.select('.y-axis').call(yAxis);

	
		// // Add X axis label:
		// d3.select('.x-axis').append('text')
		// 	.attr('text-anchor', 'end')
		// 	.attr('x', width/2 + margin.left)
		// 	.attr('y', margin.bottom - 5)
		// 	.text('Year Built');

		// // Y axis label:
		// d3.select('.y-axis').append('text')
		// 	.attr('text-anchor', 'end')
		// 	.attr('transform', 'rotate(-90)')
		// 	.attr('y', -margin.left + 20)
		// 	.attr('x', -margin.top - height/2 + 20)
		// 	.text('Number of Buildings');
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
		<!-- <g transform={`translate(0, ${height})`} class="x-axis" />
		<g class="y-axis" /> -->
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

<!-- {#if typeof document !== 'undefined'}
	<svelte:window on:load={drawAxis}/>
{/if} -->
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
</style>

