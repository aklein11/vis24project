<script>
    import * as d3 from 'd3';

    export let selectedIndex = -1;
    export let data = [];

    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);

    let arcData, arcs;
    let sliceGenerator = d3.pie().value(d => d.value);
    $: arcData = sliceGenerator(data);
    $: arcs = arcData.map(d => arcGenerator(d));

    function chooseColor(index) {
        const colorDict = {"Building broken into condo units": "#558B2F",
                            "1-Family" : "#1565C0",
                            "2-Family": "#1976D2",
                            "3-Family": "#2196F3",
                            "4-6 Units": "#64B5F6",
                            "7+ Units": "#FF8F00",
                            "Residential Lot": "#BBDEFB",
                            "Condo" : "#1B5E20",
                            "Commercial Condo": "#9E9D24",
                            "Commercial" : "#FFEB3B",
                            "Mixed Use": "#FF5722",
                            "Commercial Land": "#FFF176",
                            "Condo Parking": "#AED581",
                            "Industrial": "#FFF59D",
                            "Exempt": "#90A4AE",
                            "Exempt": "#90A4AE"}
        
        return colorDict[data[index].label];
    }

    function toggleWedge (index, event) {
        if (!event.key || event.key === "Enter") {
            selectedIndex = (selectedIndex === index ? -1 : index);
        }
    }

</script>


<div class="container">
    <svg id="piechart-svg" viewBox="-50 -50 100 100">
        {#each data as d, i}
        <path d={arcs[i]} fill={chooseColor(i)} 
            class:selected={selectedIndex === i}
            on:click={e => toggleWedge(i, e)} 
            on:keyup={e => toggleWedge(i, e)}  
            tabindex="0" role="button" aria-label="pie wedge"
            style="--start-angle: { arcData[i]?.startAngle }rad;
                    --end-angle: { arcData[i]?.endAngle }rad;"/>
        {/each}
    </svg>

    <ul class="legend">
        {#each data as d, index}
            <li class="legend-item" class:selected={selectedIndex === index} style="--color: { chooseColor(index) }">
                <span class="swatch"></span>
                {d.label} <em>({d.value})</em>
            </li>
        {/each}
    </ul>
</div>


<style>
    #piechart-svg {
	max-width: 20em;
	margin-block: 2em;
	overflow: visible; /* Do not clip shapes outside the viewBox */
    }

    .container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(15em, 1fr));
        flex-wrap: wrap;
        gap: 10px;
        align-items: horizontal;
        gap: 1em;
        max-width: 500px;
    }

    .legend {
        list-style: none;
        padding: 1em;
        margin: 1em;
        flex: 1;
        grid-template-columns: repeat(auto-fill, minmax(9em, 1fr));
        outline: grey solid 3px;
        margin: auto;
        max-width: 150px;
    }

    .ledgend li {
        display: flex;
        align-items: center;
        gap: 1em;
    }

    .swatch {
        width: 1em;
        height: 1em;
        background-color: var(--color);
        display:inline-block;
        margin-right: 5px;
        border-radius: 50%;
        /* aspect-ratio: 1 / 1;  */
    }

    svg:has(path:hover, path:focus-visible) {
        path:not(:hover, :focus-visible) {
            opacity: 50%;
        }
    }

    path {
        transform: rotate(var(--mid-angle))
	           translateY(0)
	           rotate(calc(-1 * var(--mid-angle)));

        transition: 300ms;
        outline: none;
        --angle: calc(var(--end-angle) - var(--start-angle));
	    --mid-angle: calc(var(--start-angle) + var(--angle) / 2);

        &.selected {
            transform: rotate(var(--mid-angle))
                    translateY(-6px)
                    rotate(calc(-1 * var(--mid-angle)));
       }
    }

    .selected {
        --color: oklch(60% 45% 0) !important;

        &:is(path) {
            fill: var(--color);
        }
    }

</style>