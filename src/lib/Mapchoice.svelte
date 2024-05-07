<script>
    import { onMount } from 'svelte';
    import mapboxgl from 'mapbox-gl';
    import { csv } from 'd3-fetch';
    import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";

    mapboxgl.accessToken = 'pk.eyJ1Ijoic2VqYWxnIiwiYSI6ImNsdmN0Y21yZTBubmgydmxmNDlmbHVuMXAifQ.G5QWdSQskLQRC0Dw0nYLVw';

    let map;
    var currentZipcode = null;
    export var zipcode = null;

    const initialCenter = [-71.0589, 42.3601];
    const initialZoom = 11;

    onMount(async () => {
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: initialCenter,
            zoom: initialZoom
        });

        const geoJsonPath = 'boston-cambridge-zip-codes.geojson';
        const data = await csv("lat_long_address.csv");

        map.on('load', async function () {
            map.addSource('zip-codes', {
                type: 'geojson',
                data: geoJsonPath
            });

            map.addLayer({
                'id': 'polygons',
                'type': 'fill',
                'source': 'zip-codes',
                'paint': {
                    'fill-color': [
                        'case',
                        ['boolean', ['feature-state', 'clicked'], false],
                        '#949494',  // Color for clicked
                        '#d3d3d3'  // Default color
                    ],
                    'fill-opacity': 0.8,
                    "fill-outline-color": "#000000"
                },
            });

            const geojsonData = {
                type: 'FeatureCollection',
                features: data.map((row) => ({
                    type: 'Feature',
                    properties: {
                        zipcode: row["ZIPCODE post (group)"]
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(row.Longitude), parseFloat(row.Latitude)]
                    }
                }))
            };

            map.addSource('locations', {
                type: 'geojson',
                data: geojsonData
            });

            map.addLayer({
                id: 'points',
                type: 'circle',
                source: 'locations',
                paint: {
                    'circle-radius': 8,
                    'circle-color': '#ce160e',
                    'circle-opacity': 0.8,
                },
                filter: ['==', ['get', 'zipcode'], '']
            });

            map.on('click', 'polygons', (e) => {
                let feature = e.features[0];
                let featureId = feature.id;

                if (currentZipcode !== null && currentZipcode !== featureId) {
                    map.setFeatureState({
                        source: 'zip-codes',
                        id: currentZipcode,
                    }, { clicked: false });
                }

                if (currentZipcode === featureId && feature.state.clicked) {
                    // If the same feature is clicked again, toggle off the click state
                    map.setFeatureState({
                        source: 'zip-codes',
                        id: featureId,
                    }, { clicked: false });
                    currentZipcode = null; // Reset currentZipcode since it's unclicked
                    map.setFilter('points', ['==', 'id', '__none__']); // Set filter to show no points
                    map.easeTo({ zoom: initialZoom, center: initialCenter }); // Zoom out smoothly
                    return; // Exit the function, no further action needed
                }

                map.setFeatureState({
                    source: 'zip-codes',
                    id: featureId,
                }, { clicked: true });

                currentZipcode = featureId;
                zipcode = '0' + currentZipcode.toString();
                map.setFilter('points', ['==', ['get', 'zipcode'], zipcode]);

                const bounds = new mapboxgl.LngLatBounds();
                feature.geometry.coordinates[0].forEach(coord => {
                    bounds.extend(coord);
                });
                // TODO: the following line controls the zooming on click and does not always fit the content into the frame
                map.fitBounds(bounds, { padding: 20 });
            });
        });
    });

    function resetMap() {
        map.easeTo({ zoom: initialZoom, center: initialCenter }); // Zoom out smoothly
        if (currentZipcode !== null) {
            map.setFeatureState({
                source: 'zip-codes',
                id: currentZipcode,
            }, { clicked: false });
        }
        map.setFilter('points', ['==', ['get', 'zipcode'], '']);
        currentZipcode = null;
        zipcode = null;
    }
</script>

<style>
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

    #map {
        flex: 1;
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

    #map {
        height: 100vh;
        width: 100%;
        margin-top: 25px;
    }

    .reset-button{
        margin-bottom: 25px;
    }

    .map-toolbar {
        display: flex;
        margin-bottom: 25px;
        justify-content: space-between;
        align-items: baseline;
    }
</style>

<div>
    <div id="map"></div>
    <div class="map-toolbar">
        <button on:click={resetMap} class="reset-button" > Reset Map </button>
        
        {#if currentZipcode === null}
            No zip code selected
        {:else}
            <b>Selected zip code: {"0" + currentZipcode}</b>

        {/if}
    </div>
    <p>You can choose a different zipcode to explore as well.</p>
</div>