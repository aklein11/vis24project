<script>
    import data from '$lib/conversion_data.json';
    import year_built_data from '$lib/multiRes_count.json';
    import BarChart2016 from '$lib/BarGraph2016.svelte';
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

    let margin2018 = { top: 20, right: 30, bottom: 70, left: 60 };
	let width2018 = 960 - margin2018.left - margin2018.right;
	// let height = 500 - marginNarr.top - marginNarr.bottom;
    let barChartHeight;
    let pieDataNarr, rolledData2018, aggYearBuiltData2018, yearBuiltDataArray2018, barChartYScale;

    $: { 
        rolledData2018 = d3.rollups(filteredNarrativeData, v => d3.sum(v, d => d.Count_of_LU_prior), d => d.LU_prior_group);
    	// Process the data to sum up the building counts for each decade
        console.log("QUERY", query);
	    aggYearBuiltData2018 = filteredConversionYearData.reduce((acc, cur) => {
            Object.keys(cur).forEach(year => {
                if (parseInt(year) <= parseInt(query)) {
                    if (!acc[year]) acc[year] = 0;
                    acc[year] += cur[year];
                }
            });
            return acc;
        }, {});
        console.log("Agg Year Built", aggYearBuiltData2018);
        yearBuiltDataArray2018 = Object.keys(aggYearBuiltData2018)
		.map(year => ({ year: year, count: aggYearBuiltData2018[year] }));
        console.log("Year Built Data Array ", yearBuiltDataArray2018);
    }

    let selectedZipcodeIndex = -1;
    let selectedZipcode, zipcodes, uniqueZipcodes;
    $: selectedZipcode = selectedZipcodeIndex > -1 ? pieData2018Narr[selectedZipcodeIndex].label : null;
    
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

<h3>Multifamily Condo Conversions in Boston and Cambridge</h3>
<BarChart2016 dataArray2016={yearBuiltDataArray2018} />

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