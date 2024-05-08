<script>
    import data from '$lib/conversion_data.json';
    import year_built_data from '$lib/converted_year.json';
    import BarChart2023 from '$lib/BarChart2023.svelte';
    import * as d3 from 'd3';
    export let hLevel = 2;
    export let query = "";

    let filteredNarrativeData;
    $: filteredNarrativeData = data.filter(d => {
        // console.log("QUERY", query);
        if (query == "") {
            let values = Object.values(d).join("\n").toLowerCase();
	        return values.includes(query.toLowerCase());
        }
        return true;
    });

    let filteredConversionYearData;
    $: filteredConversionYearData = year_built_data.filter(d => {
        if (query == "") {
            let values = Object.values(d).join("\n").toLowerCase();
            console.log("VALUES", values);
	        return values.includes(query.toLowerCase());
        }
        return true;
    });

    let marginNarr = { top: 20, right: 30, bottom: 70, left: 60 };
	let widthNarr = 960 - marginNarr.left - marginNarr.right;
	// let height = 500 - marginNarr.top - marginNarr.bottom;
    let barChartHeight;
    let pieDataNarr, rolledDataNarr, aggYearBuiltDataNarr, yearBuiltDataArrayNarr, barChartYScale;

    $: { 
        rolledDataNarr = d3.rollups(filteredNarrativeData, v => d3.sum(v, d => d.Count_of_LU_prior), d => d.LU_prior_group);
    	// Process the data to sum up the building counts for each decade
        console.log("QUERY", query);
	    aggYearBuiltDataNarr = filteredConversionYearData.reduce((acc, cur) => {
            Object.keys(cur).forEach(year => {
                if (parseInt(year) <= parseInt(query)) {
                    if (!acc[year]) acc[year] = 0;
                    acc[year] += cur[year];
                }
            });
            return acc;
        }, {});
        console.log("Agg Year Built", aggYearBuiltDataNarr);
        yearBuiltDataArrayNarr = Object.keys(aggYearBuiltDataNarr)
		.map(year => ({ year: parseInt(year), count: aggYearBuiltDataNarr[year] }))
		.sort((a, b) => a.year - b.year);
        console.log("Year Built Data Array ", yearBuiltDataArrayNarr);
    }

    let selectedZipcodeIndex = -1;
    let selectedZipcode, zipcodes, uniqueZipcodes;
    $: selectedZipcode = selectedZipcodeIndex > -1 ? pieDataNarrNarr[selectedZipcodeIndex].label : null;
    
    function combineZipcodes(zipcodes) {
        const groupedZipcodes = {};
        
        zipcodes.forEach(zip => {
            const firstFiveDigits = zip.substring(0, 5);
            if (!groupedZipcodes[firstFiveDigits]) {
                groupedZipcodes[firstFiveDigits] = [];
            }
            groupedZipcodes[firstFiveDigits].push(zip.substring(0, 5));
        });
        return groupedZipcodes;
    }
    
    $: {
        zipcodes = filteredNarrativeData.map(item => item.ZIPCODE);
        uniqueZipcodes = new Set(Object.values(combineZipcodes(zipcodes)).flat());
    }
</script>

<h3>Condo Conversions in Boston and Cambridge, 2015-2023</h3>
<BarChart2023 dataArrayNarr={yearBuiltDataArrayNarr} />

<style>
    .zipcodes {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        flex-direction: column;  /* Arrange items horizontally */
        grid-row-gap: 5px; 
        justify-content: space-between;  /* Distribute items evenly along the main axis */
        align-items: center;  /* Align items vertically */
        max-width: 100%;
    }
</style> 