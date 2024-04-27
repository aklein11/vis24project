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

    const cambridgeZip = ["02140", "02139", "02142", "02141"];
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

    .hide-graph {
        visibility: none;
    }

</style>

<blockquote scrolly-container>
    <p>Boston has passed protections on condo conversions of older buildings; specifically, the <a href="https://www.boston.gov/condominium-and-cooperative-conversion-ordinance"> Condominium and Cooperative Conversion Ordinance (c.a. 1999, amended 2021) </a> provides rights to tenants of buildings constructed pre-1983 with 4+ rental units. 
        <a href="https://www.boston.gov/sites/default/files/file/2022/08/Conversion%20Ordinance%20Summary%2C%20English.pdf"> Specifically, the ordinance specifies a required notification period, a set relocation payment, and the requirement that tenants have the right to purchase their unit, among other protections. </a>
    </p>

    <p>
    Legal ordinances communities in greater Boston have to protect tenants are detailed on Mass Legal Help's website <a href="https://www.masslegalhelp.org/housing-apartments-shelter/rooming-houses-mobile-homes-condos/local-protections-tenants-facing"> here </a>.
    </p>

    <p>
    That being said, protections for tenants facing condo conversions is still lacking. The Metropolitan Area Planning Council (MAPC) writes in their <a href="https://homesforprofit.mapc.org/report"> report </a> on investor activity in Greater Boston from 2000-2022 that Investor purchases account for 21% of transactions, contributing to housing unaffordability and price increases. For more information on proposed policies, including proposed bills to help residents find short-term emergency housing and increase funds for affordable housing, view the Policy Recommendations section of the <a href="https://homesforprofit.mapc.org/report"> MAPC report </a>.
    </p>    

    <p>    
    Thank you to the Metropolitan Area Planning Council for guidance on our project!
    </p>
    </blockquote>
