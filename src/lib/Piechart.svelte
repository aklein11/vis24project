<script>
    import pie_data from '$lib/pie_data.json';
    import year_built_data from '$lib/year_built_data_v2.json';
    import Pie from '$lib/Pie.svelte';
    import * as d3 from 'd3';
    let query = "";

    let filteredPieData;
    $: filteredPieData = pie_data.filter(d => {
        if (query) {
            let values = Object.values(d).join("\n").toLowerCase();
	        return values.includes(query.toLowerCase());
        }
        return true;
    });
    let filteredYearBuiltData;
    $: filteredYearBuiltData = year_built_data.filter(d => {
        if (query) {
            let values = Object.values(d).join("\n").toLowerCase();
	        return values.includes(query.toLowerCase());
        }
        return true;
    });


    let margin = { top: 20, right: 30, bottom: 70, left: 60 };
	let width = 960 - margin.left - margin.right;
    let pieData, rolledData, aggYearBuiltData, yearBuiltDataArray;

    $: { 
        pieData = {}
        console.log(filteredPieData)
        rolledData = d3.rollups(filteredPieData, v => d3.sum(v, d => d.Count_of_LU_prior), d => d.LU_prior_group);
        console.log("Rolled ", rolledData)
    	// Process the data to sum up the building counts for each decade
	    aggYearBuiltData = filteredYearBuiltData.reduce((acc, cur) => {
            Object.keys(cur).forEach(year => {
                if (year !== 'ZIPCODE') {
                    if (!acc[year]) acc[year] = 0;
                    acc[year] += cur[year];
                }
            });
            return acc;
        }, {});
        console.log("Agg Year Built", aggYearBuiltData);
        yearBuiltDataArray = Object.keys(aggYearBuiltData)
		.map(year => ({ year: parseInt(year), count: aggYearBuiltData[year] }))
		.sort((a, b) => a.year - b.year);
        console.log("Year Built Data Array ", yearBuiltDataArray);


        pieData = rolledData.map(([group, count]) => {
            return { value: count, label: group };
        });
        console.log("pied ", pieData);
    }

    let selectedZipcodeIndex = -1;
    let selectedZipcode;
    $: selectedZipcode = selectedZipcodeIndex > -1 ? pieData[selectedZipcodeIndex].label : null;

    let zipcodes, uniqueZipcodes;
    $: {
        zipcodes = filteredPieData.map(item => item.ZIPCODE);
        uniqueZipcodes = [...new Set(zipcodes)];
        console.log("uniqueZipcodes", uniqueZipcodes);
    }
</script>

<h1>Types of Properties Converted to Condos</h1>

<Pie data={pieData} bind:selectedIndex={selectedZipcodeIndex} />

<input type="search" bind:value={query}
    aria-label="Search projects" placeholder="🔍Enter zipcode…" 
/>

<!-- <h1>Other { filteredByYear.length }</h1> -->
<div class="about">
    {#each uniqueZipcodes as z}
        <p>{z}</p>
    {/each}
</div>