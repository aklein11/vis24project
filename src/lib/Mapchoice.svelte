<script>
    import { onMount } from 'svelte';
    import mapboxgl from 'mapbox-gl';
    import { csv } from 'd3-fetch';

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

        const geoJsonPath = '/boston-cambridge-zip-codes.geojson';
        const data = await csv('/lat_long_address.csv');

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
                    'circle-radius': 6,
                    'circle-color': '#000000',
                    'circle-opacity': 0.4,
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
                map.fitBounds(bounds, { padding: 20 });
            });
        });
    });

    function resetMap() {
        map.setCenter(initialCenter);
        map.setZoom(initialZoom);
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
    #map {
        height: 100vh;
        width: 100%;
        margin-top: 25px;
    }
    .reset-button{
        margin-bottom: 25px;
    }
</style>

<div>
    <div id="map"></div>
    <button on:click={resetMap} class="reset-button" > Reset Map</button>
    
    {#if currentZipcode === null}
    {:else}
    <blockquote scrolly-container>
        You selected the zip code below! Click Reset Map to choose a new zip code. 
        </blockquote>
    {/if}
    
</div>