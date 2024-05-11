<script>
    import pie_data from '$lib/pie_data.json';
    import Pie from '$lib/Pie.svelte';
    import * as d3 from 'd3';
    export let query = "";

    let filteredData;
    $: filteredData = pie_data.filter(d => {
        if (query) {
            let values = Object.values(d).join("\n").toLowerCase();
	        return values.includes(query.toLowerCase());
        }
        return true;
    });

    const labelDict = {"CM": "Building broken into condo units",
                    "R1": "1-Family",
                    "R2": "2-Family",
                    "R3": "3-Family",
                    "R4": "4-6 Units",
                    "A": "7+ Units",
                    "RL": "Residential Lot",
                "CD": "Condo",
                "CC": "Commercial Condo",
            "C": "Commercial",
        "RC": "Mixed Use",
        "CL": "Commercial Land",
        "CP": "Condo Parking",
        "I": "Industrial",
        "E": "Exempt",
        "EA": "Exempt"}

    let pieData, rolledData;

    $: { 
        pieData = {}
        console.log(filteredData)
        rolledData = d3.rollups(filteredData, v => d3.sum(v, d => d["Count of LU prior"]), d => d["LU prior groups"]);
        console.log("Rolled ", rolledData)

        pieData = rolledData.map(([group, count]) => {
        return { value: count, label: labelDict[group] };
    });
    console.log("pied ", pieData);
    }

    let selectedZipcodeIndex = -1;
    let selectedZipcode;
    $: selectedZipcode = selectedZipcodeIndex > -1 ? pieData[selectedZipcodeIndex].label : null;
</script>


<Pie data={pieData} bind:selectedIndex={selectedZipcodeIndex} />

<blockquote scrolly-container>    
    Families and renters can be displaced when their homes are converted into luxury condos. This effect is especially prevalent when multi-family housing is converted into condos. To estimate the impact of condo conversions on families, we display the most common building types converted into condos.
    <p> Note: Legend adapted from <a href="https://www.cityofboston.gov/images_documents/land_use_codes%5B1%5D_tcm3-8867.pdf"> City of Boston LAND USE CODES </a>   </p>
</blockquote>
