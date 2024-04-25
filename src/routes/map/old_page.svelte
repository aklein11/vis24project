<style>

    div {
		width: 100%;
		height: 100%;
	}


    body {
        font: 100%/1.5 system-ui, sans-serif;
        display: flex;
        flex-flow: column;
        max-width: 80em;
        min-height: 100vh;
        box-sizing: border-box;
        margin: auto;
        padding: 1em;
    }

    .marker {
        border-radius: 50%;
        color: red;
    }

    #map {
        flex: 1;
        position: relative;
    }

    #map svg {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        pointer-events: none;
        fill-opacity: 60%;
        stroke: white;
    }

    #map circle, .legend > div {
        --color-departures: steelblue;
        --color-arrivals: darkorange;
        --color: color-mix(
            in oklch,
            var(--color-departures) calc(100% * var(--departure-ratio)),
            var(--color-arrivals)
        );
    }

    #map circle {
        pointer-events: auto;
        fill: var(--color);
    }

    .legend {
        display: flex;
        justify-content: space-between;
        margin-block: 20px;
    }

    .legend > div {
        flex-grow: 1;
        text-align: center;
        padding: 5px 10px;
        color: white; /* Ensures text is visible on all backgrounds */
        background-color: var(--color);
    }

    label {
        margin-left: auto;
        display: block;
        width: 80%;
    }

    /* Ensuring that all child elements of the label are displayed as block */
    label > * {
        display: block; /* This makes each child (input, time, em) a block, stacking them vertically */
        width: 100%; /* Optional: ensures they take up full width of the label */
        margin-top: 5px; /* Adds a little space between each element */
    }

    header {
        display: flex;
        gap: 1em;
        align-items: baseline;
    }

    /* label {
        margin-left: auto;
        display: block;
    } */

</style>

<script>
    import * as d3 from "d3";
    import { onMount } from 'svelte';
    import mapbox from "mapbox-gl";

    mapbox.accessToken = "pk.eyJ1Ijoic2VqYWxnIiwiYSI6ImNsdmN0Y21yZTBubmgydmxmNDlmbHVuMXAifQ.G5QWdSQskLQRC0Dw0nYLVw";

    let map;
    let locations = []; // This will store data from CSV
    let markers = [];   // This will store the current markers on the map for easy removal

    onMount(async () => {
        map = new mapbox.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v9",
            zoom: 12,
            center: [-71.0947291506178, 42.35850643315339],
        });

        // Load data from the CSV file
        locations = await d3.csv("lat_long_address.csv");

        console.log(locations)

        // Process the data
        locations.forEach(location => {
            location.Latitude = +location["Latitude"];
            location.Longitude = +location["Longitude"];
        });

        console.log(locations)

        // Optionally, add initial markers or wait for ZIP code filter selection
        updateMarkers();
    });

    $: map?.on("move", evt => mapViewChanged++);
    let zipFilter = ''; // Default or all ZIP codes

    function updateMarkers() {
    // Remove existing markers
    markers.forEach(marker => marker.remove());
    markers = [];

    // Filter locations based on ZIP code and add new markers
    const filteredLocations = zipFilter ? locations.filter(location => location['ZIPCODE post (group)'] === zipFilter) : locations;

    console.log(filteredLocations); // Debugging output

    filteredLocations.forEach(location => {
        const el = document.createElement('div');
        // el.className("marker");

        let marker = new mapbox.Marker().setLngLat([location.Longitude, location.Latitude]).addTo(map);
        console.log(marker); // Debugging output

        markers.push(marker);

        console.log("markers", markers);
    });
}

    $: if (map && zipFilter !== undefined) {
        updateMarkers();
    }
</script>

<header>
    <h1>🚴🏼‍♀️ Map Viewing 🔭</h1>
    <label>
        ZIP Code:
        <select bind:value={zipFilter}>
            <option value="">All ZIP Codes</option>
            {#each [...new Set(locations.map(location => location['ZIPCODE post (group)']))].sort() as zip}
                <option value={zip}>{zip}</option>
            {/each}
        </select>
    </label>
</header>

<div id="map"></div>