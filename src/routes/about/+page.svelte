<!-- <svelte:head>
	<title>Visualisation</title>
</svelte:head> -->
<h1>move or import the following code as needed; \n placed here temporarioly for editing convenience.</h1>

<script>
	import * as d3 from 'd3';
	import {onMount} from 'svelte';

	let name = "Bar Graph";

	const data = [4, 8, 15, 16, 23, 42]

	function scaledWidth(d) {
		return d = 10;
	}

	const xScale = d3.scaleLinear()
		.domain([0, d3.max(data)])
		.range([0, 100])
</script>

{#each data as d}
	<div class="bar" style="width: {d}px">
		{d}
	</div>
{/each}

<style>
	h1 {
		color: blue;
	}

	.bar {
		background: steelblue;
		border: 1px solid white; 
		color: white; 
		text-align: right;
	}
</style>