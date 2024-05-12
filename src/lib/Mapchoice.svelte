<script>
    import { onMount } from 'svelte';
    import mapboxgl from 'mapbox-gl';
    import { csv } from 'd3-fetch';
    import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";

    mapboxgl.accessToken = 'pk.eyJ1Ijoic2VqYWxnIiwiYSI6ImNsdmN0Y21yZTBubmgydmxmNDlmbHVuMXAifQ.G5QWdSQskLQRC0Dw0nYLVw';

    let map;
    var currentZipcode = null;
    export var zipcode = null;

    const initialCenter = [-71.0589, 42.3301];
    const initialZoom = 10;

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
                        zipcode: row["ZIPCODE post (group)"],
                        post_building: row["LU post groups"],
                        prior_building: row["LU prior groups"],	
                        year_converted: row["Prior Year"],
                        value_post: row["TOTAL VALUE post"],	
                        value_prior: row["TOTAL VALUE prior"],
                        year_built: row["YR BUILT prior (bin) 2"],	
                        latitude: row["Latitude"],
                        longitude: row["Longitude"],
                        address: row["Address"],
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

            // Add the circle layer with event handlers for tooltips
            map.addLayer({
                id: 'points',
                type: 'circle',
                source: 'locations',
                paint: {
                    'circle-radius': 5,
                    'circle-color': '#ce160e',
                    'circle-opacity': 1,
                },
                filter: ['==', ['get', 'zipcode'], '']
            });

            let popup = null;

            map.on('mouseenter', 'points', (e) => {
                // Change the cursor style as a UI indicator.
                map.getCanvas().style.cursor = 'pointer';

                const coordinates = e.features[0].geometry.coordinates.slice();
                const properties = e.features[0].properties; // Access feature properties

                // Adjust longitude to ensure the popup is placed correctly on the map
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                // Ensure only one popup is active at a time
                if (popup) {
                    popup.remove();
                }

                popup = new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(`
                        <strong>Address:</strong> ${properties.address} <br>
                        <strong>Zipcode:</strong> ${properties.zipcode} <br>
                        <strong>Year Built:</strong> ${parseInt(properties.year_built)} <br>
                        <strong>Building Type Before:</strong> ${labelDict[properties.prior_building]} <br>
                        <strong>Building Type After:</strong> ${labelDict[properties.post_building]} <br>
                        <strong>Year Converted:</strong> ${parseInt(properties.year_converted)} <br>
                        <strong>Value Before:</strong> $${properties.value_prior.toLocaleString()} <br>
                        <strong>Value After:</strong> $${properties.value_post.toLocaleString()} <br>
                    `) // Customize your tooltip content here
                    .addTo(map);
            });

            map.on('mouseleave', 'points', () => {
                map.getCanvas().style.cursor = '';
                // Remove the popup if it exists
                if (popup) {
                    popup.remove();
                    popup = null; // Nullify the popup reference
                }
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
                    zipcode = "";
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
        zipcode = "";
    }
</script>

<style>

    #map {
        height: 50vh;
        width: 100%;
        margin-top: 25px;
    }

    .reset-button{
        margin-bottom: 5px;
        font-size: 18px;
    }

    .map-toolbar {
        display: flex;
        margin-bottom: 5px;
        justify-content: space-between;
        align-items: baseline;
    }

    strong{
        font-size: 18px;
    }

    .blue{
        color: #3A89C9;
    }

</style>

<div>
    <div id="map"></div>
    <div class="map-toolbar">
        <button on:click={resetMap} class="reset-button" > Reset Map </button>
        
        {#if currentZipcode === null}
            <strong> No zip code selected </strong>
        {:else}
            <strong> Selected zip code: <strong class="blue">{"0" + currentZipcode}  </strong> </strong>
        {/if}
    </div>
</div>