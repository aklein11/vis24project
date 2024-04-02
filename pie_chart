<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
    import Pie from '$lib/Pie.svelte';
    import * as d3 from 'd3';
    export let hLevel = 2;

    let query = "";

    let filteredProjects, filteredByYear;
    $: filteredProjects = projects.filter(project => {
        if (query) {
            let values = Object.values(project).join("\n").toLowerCase();
	        return values.includes(query.toLowerCase());
        }
        
        return true;
    });

    $: filteredByYear = filteredProjects.filter(project => {
        if (selectedYear) {
            return project.year === selectedYear;
        }
        return true; // show all if none is selected
    });

    let pieData, rolledData;

    $: { 
        pieData = {}
        rolledData = d3.rollups(filteredProjects, v => v.length, d => d.year);

        pieData = rolledData.map(([year, count]) => {
        return { value: count, label: year };
    });
    }

    let selectedYearIndex = -1;
    let selectedYear;
    $: selectedYear = selectedYearIndex > -1 ? pieData[selectedYearIndex].label : null;

</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<Pie data={pieData} bind:selectedIndex={selectedYearIndex} />


<input type="search" bind:value={query}
    aria-label="Search projects" placeholder="🔍 Search projects…" 
/>


<h1>MIT</h1>
<p>Robot in 2.S007, Labs in 6.009, Paper in 9.66</p>
<h1>Internships</h1>
<p>Google in Cambridge, Google in NY, Amazon in Seattle</p>

<h1>Other { filteredByYear.length }</h1>
<div class="projects">
    {#each filteredByYear as p}
        <Project info={p} />
    {/each}
</div>