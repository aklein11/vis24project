<script>
    import data from '$lib/conversion_data.json';
    import pie_data from '$lib/pie_data.json';
    import year_build_data from '$lib/year_built_data_v2.json';
    // import Project from "$lib/Project.svelte";
    import Pie from '$lib/Pie.svelte';
    import * as d3 from 'd3';
    export let hLevel = 2;

    let query = "";

    let filteredData;
    $: filteredData = pie_data.filter(d => {
        if (query) {
            let values = Object.values(d).join("\n").toLowerCase();
	        return values.includes(query.toLowerCase());
        }
        return true;
    });

    // let filteredByYear;
    // $: filteredByYear = filteredProjects.filter(project => {
    //     if (selectedYear) {
    //         return project.year === selectedYear;
    //     }
    //     return true; // show all if none is selected
    // });

    let pieData, rolledData;

    $: { 
        pieData = {}
        console.log(filteredData)
        rolledData = d3.rollups(filteredData, v => d3.sum(v, d => d.Count_of_LU_prior), d => d.LU_prior_group);
        console.log("Rolled ", rolledData)

        pieData = rolledData.map(([group, count]) => {
        return { value: count, label: group };
    });
    console.log("pied ", pieData);
    }

    let selectedZipcodeIndex = -1;
    let selectedZipcode;
    $: selectedZipcode = selectedZipcodeIndex > -1 ? pieData[selectedZipcodeIndex].label : null;

</script>

<!-- <svelte:head>
	<title>Projects</title>
</svelte:head> -->

<Pie data={pieData} bind:selectedIndex={selectedZipcodeIndex} />


<input type="search" bind:value={query}
    aria-label="Search projects" placeholder="🔍 Search projects…" 
/>

<!-- <h1>Other { filteredByYear.length }</h1> -->
<div class="about">
    {#each filteredData as f}
        <p>{f.ZIPCODE}</p>
        <!-- <p>{f.post_group}</p> -->
        <!-- <p>{f.count_of_address}</p> -->
        <!-- <p>{f.Latitude_generated}</p> -->
        <!-- <p>{f.longitude_generated}</p> -->
    {/each}
</div>