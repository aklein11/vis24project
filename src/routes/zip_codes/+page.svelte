<script>
	import Scrolly from "svelte-scrolly";
    import Bargraph from "$lib/Bargraph.svelte";
	import Bubblechart from "$lib/Bubblechart.svelte";
	import Linechart from "$lib/Linechart.svelte";
	import Piechart from "$lib/Piechart.svelte";
    import Map from "$lib/Mapchoice.svelte";
    import { writable } from 'svelte/store';

    let zipcode = writable(''); 

    const cambridgeZip = ["02140", "02139", "02142", "02141", "02138"];
</script>

<svelte:head>
    <title>Condo Conversions in Greater Boston </title>
</svelte:head>

<!-- Separate sections with unique class for each type of chart -->
<style>
   

   .scrolly-container {
        border: 10px solid #ff3e3e; 
        max-width: 100%;
    }
    /* .scrolly {
        max-width: 50%;
    } */
    .parent-container {
    margin: 0 auto; /* Center the container horizontally */
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

	.graph-container svg {
		width: 100%; /* Set the width of the graph to 100% of its container */
		height: 100%; /* Set the height of the graph to 100% of its container */
	}

    .hide-graph {
        visibility: none;
    }

    .test {
        font-size: 64px;
        font-weight: bold;
    }

</style>

<blockquote>
    Through our interactive visualization, we invite you to explore the impact of condo conversions on your community.<br>
    <newline></newline>
    On the map, click a greater Boston zip code to see the locations of condo conversions (starting from 2015) in the region:
</blockquote>

<div class="parent-container">
    
    <Map bind:zipcode={ $zipcode }/>

    <Scrolly>
        <p class="test">Here is where the text that accompanies the map visualization would go. The CSS needs to be updated minimally in each of the chart/graph.svelte files. That said, now Caroline can put in the verbal content into the code here so that she does not need to wait for a place to be set aside.</p>
        <svelte:fragment slot="viz">
            <div class="scrolly-container">
                <Bargraph query={ $zipcode }/>
            </div>
        </svelte:fragment>
    </Scrolly>
    
    <Scrolly>
        <p class="test">Here is where the text that accompanies the map visualization would go. The CSS needs to be updated minimally in each of the chart/graph.svelte files. That said, now Caroline can put in the verbal content into the code here so that she does not need to wait for a place to be set aside.</p>
        <svelte:fragment slot="viz">
            <div class="scrolly-container">
                <Piechart query={ $zipcode }/> 
            </div>
        </svelte:fragment>
    </Scrolly>
</div>





{#if $zipcode !== '' && cambridgeZip.indexOf($zipcode) !== -1}
    <h1> Condo Complaints </h1>
    <blockquote>
        For Cambridge, we did not have data on condominium complaints.
    </blockquote>
{:else}
    <Scrolly>
        <p class="test">Here is where the text that accompanies the map visualization would go. The CSS needs to be updated minimally in each of the chart/graph.svelte files. That said, now Caroline can put in the verbal content into the code here so that she does not need to wait for a place to be set aside.</p>
        <svelte:fragment slot="viz">
            <div class="scrolly-container">
                <Linechart query={ $zipcode }/>
            </div>
        </svelte:fragment>
    </Scrolly>

    <Scrolly>
        <p class="test">Here is where the text that accompanies the map visualization would go. The CSS needs to be updated minimally in each of the chart/graph.svelte files. That said, now Caroline can put in the verbal content into the code here so that she does not need to wait for a place to be set aside.</p>
        <svelte:fragment slot="viz">
            <div class="scrolly-container">
                <Bubblechart query={ $zipcode }/>
            </div>
        </svelte:fragment>
    </Scrolly>
{/if}