<script>
    import * as d3 from "d3";
	import Scrolly from "svelte-scrolly";
    import { onMount } from "svelte";
    import Bargraph from "$lib/Bargraph.svelte";
	import Bubblechart from "$lib/Bubblechart.svelte";
	import Linechart from "$lib/Linechart.svelte";
	import Piechart from "$lib/Piechart.svelte";

	let value;
	const bulletpoints = ["demo a", "demo b", "demo c", "demo d", "demo e", "demo f", "demo g", "demo h", "demo i"];
    let colors = d3.scaleOrdinal(d3.schemeTableau10);

</script>

<svelte:head>
	<title>Visualisation</title>
</svelte:head>

<!-- BARGRAPH -->
<Scrolly bind:progress={ value }>

	{#each bulletpoints as text, i}
		<div class="step" class:active={value === i}>
			<p>
				{text} here is where we put information about the Bargraph content. the bar graph should stay static on one side of the pages 
				and on the other there will be text or other interactives that can be put in this scrolly block. This is just filler text so that 
				we can see what the scrolly telling aspect will feel like.
			</p>
		</div>
	{/each}

	<svelte:fragment slot="viz">
		<div>
			<Bargraph class="graph-container"/>
		</div>

		<p>
			this is the Static text or animation or interactive. we should probably put the bargraph here, as is suggested by the commented out line above.
		</p>

	</svelte:fragment>

</Scrolly>

<!-- BUBBLE CHART -->
<Scrolly bind:progress={ value }>

	{#each bulletpoints as text, i}
		<div class="step" class:active={value === i}>
			<p>
				{text} here is where we put information about the Bargraph content. the bar graph should stay static on one side of the pages 
				and on the other there will be text or other interactives that can be put in this scrolly block. This is just filler text so that 
				we can see what the scrolly telling aspect will feel like.
			</p>
		</div>
	{/each}

	<svelte:fragment slot="viz">
		<!-- <Bubblechart/> -->
		<p>
			this is the Static text or animation or interactive. we should probably put the bargraph here, as is suggested by the commented out line above.
		</p>

	</svelte:fragment>

</Scrolly>

<!-- LINE CHART -->
<Scrolly bind:progress={ value }>

	{#each bulletpoints as text, i}
		<div class="step" class:active={value === i}>
			<p>
				{text} here is where we put information about the Bargraph content. the bar graph should stay static on one side of the pages 
				and on the other there will be text or other interactives that can be put in this scrolly block. This is just filler text so that 
				we can see what the scrolly telling aspect will feel like.
			</p>
		</div>
	{/each}

	<svelte:fragment slot="viz">
		<!-- <Linechart/> -->
		<p>
			this is the Static text or animation or interactive. we should probably put the bargraph here, as is suggested by the commented out line above.
		</p>

	</svelte:fragment>

</Scrolly>


<!-- PIECHART -->
<Scrolly bind:progress={ value }>

	{#each bulletpoints as text, i}
		<div class="step" class:active={value === i}>
			<p>
				{text} here is where we put information about the Bargraph content. the bar graph should stay static on one side of the pages 
				and on the other there will be text or other interactives that can be put in this scrolly block. This is just filler text so that 
				we can see what the scrolly telling aspect will feel like.
			</p>
		</div>
	{/each}

	<svelte:fragment slot="viz">
		<!-- <Piechart/> -->
		<p>
			this is the Static text or animation or interactive. we should probably put the bargraph here, as is suggested by the commented out line above.
		</p>

	</svelte:fragment>

</Scrolly>


<style>

    :global(body) {
        max-width: min(120ch, 80vw);
    }

   .stats {
        display: grid;  
        /* grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); */
        flex-direction: column;  /* Arrange items horizontally */
        justify-content: space-between;  /* Distribute items evenly along the main axis */
        align-items: center;  /* Align items vertically */
    }

    .stats dt {
        margin-right: 10px;  /* Add some margin between dt and dd */
        grid-row: 1;  /* Place dt in the first row */
        /* display: inline-block; */
    }

    .stats dd {
        grid-row: 2;  /* Place dd in the second row */
    }

	/* CSS file */
	.graph-container {
		width: 400px; /* Set the desired width */
		height: 300px; /* Set the desired height */
		border: 1px solid #ccc; /* Optional: Add a border for visualization */
	}

	.graph-container svg {
		width: 100%; /* Set the width of the graph to 100% of its container */
		height: 100%; /* Set the height of the graph to 100% of its container */
	}


</style>
