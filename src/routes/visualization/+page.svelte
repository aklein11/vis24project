<script>
    import data from '$lib/conversion_data.json';
    // import Project from "$lib/Project.svelte";
    import Pie from '$lib/Pie.svelte';
    import * as d3 from 'd3';
    export let hLevel = 2;

    let query = "";

    let filteredData, filteredByYear;
    $: filteredData = data.filter(d => {
        if (query) {
            let values = Object.values(d).join("\n").toLowerCase();
	        return values.includes(query.toLowerCase());
        }
        return true;
    });

    // $: filteredByYear = filteredProjects.filter(project => {
    //     if (selectedYear) {
    //         return project.year === selectedYear;
    //     }
    //     return true; // show all if none is selected
    // });

    // let pieData, rolledData;

    // $: { 
    //     pieData = {}
    //     rolledData = d3.rollups(filteredProjects, v => v.length, d => d.year);

    //     pieData = rolledData.map(([year, count]) => {
    //     return { value: count, label: year };
    // });
    // }

    // let selectedYearIndex = -1;
    // let selectedYear;
    // $: selectedYear = selectedYearIndex > -1 ? pieData[selectedYearIndex].label : null;

</script>

<!-- <svelte:head>
	<title>Projects</title>
</svelte:head> -->

<!-- <Pie data={pieData} bind:selectedIndex={selectedYearIndex} /> -->


<input type="search" bind:value={query}
    aria-label="Search projects" placeholder="🔍 Search projects…" 
/>

<!-- <h1>Other { filteredByYear.length }</h1> -->
<div class="about">
    {#each filteredData as p}
        <p>{p.ZIPCODE}</p>
        <!-- <p>{p.post_group}</p> -->
        <!-- <p>{p.count_of_address}</p> -->
        <!-- <p>{p.Latitude_generated}</p> -->
        <!-- <p>{p.longitude_generated}</p> -->
    {/each}
</div>