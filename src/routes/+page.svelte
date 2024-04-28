<script>
    import * as d3 from "d3";
	import Scrolly from "svelte-scrolly";
    import { onMount } from "svelte";
    import Bargraph from "$lib/Bargraph.svelte";
	import Bubblechart from "$lib/Bubblechart.svelte";
	import Linechart from "$lib/Linechart.svelte";
	import Piechart from "$lib/Piechart.svelte";
    import Map from "$lib/Mapchoice.svelte";
    import { writable } from 'svelte/store';

	let valueBarGraph, valueBubbleChart, valueLineChart, valuePieChart;
	const bulletpoints = ["demo a", "demo b", "demo c", "demo d", "demo e", "demo f", "demo g", "demo h", "demo i"];
    let colors = d3.scaleOrdinal(d3.schemeTableau10);
    let zipcode = writable(''); 

    let currentPage = 0;

    function handleClick() {
        currentPage += 1;
        currentPage %= 3;
    }

</script>

<svelte:head>
    <title>Condo Conversions in Greater Boston </title>
</svelte:head>

<!-- Separate sections with unique class for each type of chart -->
<style>
    .scrolly-container {
        margin-bottom: 2rem; /* Add space between each Scrolly component */
    }
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
		width: 100px; /* Set the desired width */
		border: 1px solid #ccc; /* Optional: Add a border for visualization */
	}

	.graph-container svg {
		width: 100%; /* Set the width of the graph to 100% of its container */
		height: 100%; /* Set the height of the graph to 100% of its container */
	}
</style>

<blockquote scrolly-container>
<p> <a href="https://www.mapc.org/wp-content/uploads/2021/12/10.-MC2050-Homes-for-Everyone-Brief.pdf">Greater Boston ranks 3rd in the most expensive housing markets in the United States, </a> and <a href="https://homesforprofit.mapc.org/report"> 51% of Boston residents are forced to spend over the recommended income percentage (30%) on rent. </a>
</p>
<p> 
There are many sources of pressure on prices in Boston’s housing market – from zoning restrictions that hinder development of new housing to outside investors who drive up rent. <a href="https://homesforprofit.mapc.org/report"> Affecting renters, residents are often displaced due to price increases when outside investors convert the buildings they live in into condominiums.</a> We refer to this pattern of events as condo conversions.

</p>
</blockquote>

<h2> Animation Code Below </h2>

{#if currentPage == 0}
 <p> overview </p>

{:else if currentPage  == 1}
    <p> somerville </p>

{:else if currentPage == 2}
    <p> bb </p>

{:else}
    <p> medford </p>

{/if}

<button on:click={handleClick}>
    {#if currentPage == 0}
    
    Learn about Somerville
    
    {:else if currentPage == 1}
    
    Learn about Back Bay
    
    {:else if currentPage == 2}
    
    Learn about Medford
    
    {:else}
    
    Overview
    
    {/if}
    
    </button>
    


