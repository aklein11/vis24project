<script>
    import data from '$lib/conversion_data.json';
    import year_built_data from '$lib/year_built_data_v2.json';
    import BarChart from '$lib/BarChart.svelte';
    import * as d3 from 'd3';
    export let hLevel = 2;

    let query = "";

    let filteredConversionData;
    $: filteredConversionData = data.filter(d => {
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
	// let height = 500 - margin.top - margin.bottom;
    let barChartHeight;
    let pieData, rolledData, aggYearBuiltData, yearBuiltDataArray, barChartYScale;

    $: { 
        rolledData = d3.rollups(filteredConversionData, v => d3.sum(v, d => d.Count_of_LU_prior), d => d.LU_prior_group);
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

    }

    let selectedZipcodeIndex = -1;
    let selectedZipcode;
    $: selectedZipcode = selectedZipcodeIndex > -1 ? pieData[selectedZipcodeIndex].label : null;

    let zipcodes, uniqueZipcodes;
    
    function combineZipcodes(zipcodes) {
        const groupedZipcodes = {};
        
        zipcodes.forEach(zip => {
            const firstFiveDigits = zip.substring(0, 5);
            if (!groupedZipcodes[firstFiveDigits]) {
                groupedZipcodes[firstFiveDigits] = [];
            }
            groupedZipcodes[firstFiveDigits].push(zip.substring(0, 5));
        });
        // console.log("in combineZipcodes", groupedZipcodes);
        return groupedZipcodes;
    }
    
    $: {
        zipcodes = filteredConversionData.map(item => item.ZIPCODE);
        uniqueZipcodes = new Set(Object.values(combineZipcodes(zipcodes)).flat());
        // console.log("uniqueZipcodes", uniqueZipcodes);
    }
</script>

<h1>Year Converted Property was Built</h1>
<BarChart dataArray={yearBuiltDataArray} />


<input type="search" bind:value={query}
    aria-label="Search projects" placeholder="🔍 Enter Zipcode…" 
/>

<div class="about">
    {#each uniqueZipcodes as z}
        <p>{z}</p>
    {/each}
</div>

<style>
    .about {
        display: grid;  
        /* grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); */
        flex-direction: column;  /* Arrange items horizontally */
        justify-content: space-between;  /* Distribute items evenly along the main axis */
        align-items: center;  /* Align items vertically */
    }
</style>