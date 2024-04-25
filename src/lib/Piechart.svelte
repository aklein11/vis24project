<script>
    import pie_data from '$lib/pie_data.json';
    import Pie from '$lib/Pie.svelte';
    import * as d3 from 'd3';
    let query = "";

    let filteredData;
    $: filteredData = pie_data.filter(d => {
        if (query) {
            let values = Object.values(d).join("\n").toLowerCase();
	        return values.includes(query.toLowerCase());
        }
        return true;
    });

    let pieData, rolledData;

    $: { 
        pieData = {}
        console.log(filteredData)
        rolledData = d3.rollups(filteredData, v => d3.sum(v, d => d["Count of LU prior"]), d => d["LU prior groups"]);
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

<Pie data={pieData} bind:selectedIndex={selectedZipcodeIndex} />


<input type="search" bind:value={query}
    aria-label="Search projects" placeholder="🔍 Search projects…" 
/>

<div class="about">
    {#each filteredData as f}
        <p>{f["ZIPCODE post (group)"]}</p>
    {/each}
</div>