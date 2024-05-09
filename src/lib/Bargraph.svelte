<script>
    import data from '$lib/conversion_data.json';
    import year_built_data from '$lib/year_built_data_v2.json';
    import BarChart from '$lib/BarChart.svelte';
    import * as d3 from 'd3';
    export let query = "";

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

    let aggYearBuiltData, yearBuiltDataArray;

    $: { 
        // rolledData = d3.rollups(filteredConversionData, v => d3.sum(v, d => d.Count_of_LU_prior), d => d.LU_prior_group);
        // console.log("Rolled ", rolledData)
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
        return groupedZipcodes;
    }
    
    $: {
        zipcodes = filteredConversionData.map(item => item.ZIPCODE);
        uniqueZipcodes = new Set(Object.values(combineZipcodes(zipcodes)).flat());
    }
</script>


<link rel="stylesheet" href="style.css"> 

<h3 class="graph-title">Year Converted Property was Built</h3>
<BarChart dataArray={yearBuiltDataArray} />

<blockquote>
    <a href="https://homesforprofit.mapc.org/report"> Investors upgrading residential properties into condos can displace residents due to subsequent rent increases. </a> 
    Here, we display the number of condo conversions against the year the building was built. While imperfect, we use how early a building was constructed as a proxy for 
    how likely the condo conversion upgraded the property.
</blockquote>

