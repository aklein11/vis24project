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
        currentPage %= 4;
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

We take you through three examples of condo conversion in Greater Boston.

<button on:click={handleClick}>
    {#if currentPage == 0}
    
    Learn about Somerville
    
    {:else if currentPage == 1}
    
    Learn about Back Bay
    
    {:else if currentPage == 2}
    
    Learn about Medford
    
    {:else}
    
    Back to Start
    
    {/if}
    
    </button>

{#if currentPage == 0}

<img src="./images/Boston_Map.png" alt="Image of Boston"/>

{:else if currentPage  == 1}

<blockquote>
    In 2018, <a href="https://www.cambridgeday.com/2018/02/17/renters-at-a-brand-new-somerville-building-surprised-by-news-millbrooks-going-condo/?fbclid=IwAR3Y-EiEl1r1ZK_-NN2MNZzoPoUJDLR5jyG2PFacnB6fe3GGT1VDTIT7J-k"> Berkeley Investments acquired Millbrook Lofts in Somerville </a> to convert into condominiums. Millbrook Lofts Tenants’ Association of the apartment buildings argued that there would be multiple incidental expenses for residents needing to move.
</blockquote>

<img src="./images/Somerville_Map.png" alt="Image of Boston"/>


{:else if currentPage == 2}
<blockquote>
    In 2014, <a href="https://www.gibsonsothebysrealty.com/blog/posts/2014/11/19/back-bay-luxury-real-estate-mandarin-oriental-to-convert-25-units-to-luxury-condos/"> Back Bay’s Mandarin Oriental complex converted 25 apartments into luxury condominium units. </a> The converted units were “predicted to take in some of the highest prices the condo sales market [had] seen”.
</blockquote>

<img src="./images/BackBay_Map.png" alt="Image of Boston"/>


{:else}
<blockquote>
	The 2016 <a href="https://bankerandtradesman.com/multifamily-home-conversions-slowly-picking-medford/"> Banker & Tradesman article </a> discusses the real estate economics of Medford multifamily housing units with the goal of converting the condominiums to make a profit.
</blockquote>

<img src="./images/Medford_Map.png" alt="Image of Boston"/>

{/if}
    


