<script>
    import { onMount } from 'svelte';
    import mapboxgl from 'mapbox-gl';

    mapboxgl.accessToken = 'pk.eyJ1Ijoic2VqYWxnIiwiYSI6ImNsdmN0Y21yZTBubmgydmxmNDlmbHVuMXAifQ.G5QWdSQskLQRC0Dw0nYLVw';

    let map;
    var currentZipcode = null;
    export let zipcode = null;

    onMount(() => {
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-71.0589, 42.3601],
            zoom: 12
        });

        const geoJsonPath = '/boston-zip-codes.geojson';
        map.on('load', function () {
            console.log("Loading GeoJSON from:", geoJsonPath);
            map.addSource('zip-codes', {
                type: 'geojson',
                data: geoJsonPath
            });
    
            // Layer settings
            map.addLayer({
                'id': 'polygons',
                'type': 'fill',
                'source': 'zip-codes',
                'paint': {
                    'fill-color': [
                        'case',
                        ['boolean',['feature-state', 'clicked'], false],
                        '#000000', 
                        '#64bdbb'// else paint in gray
                    ],
                    'fill-opacity': 0.8,
                    "fill-outline-color": "#000000"
                },
            });
        }); 
        
        map.on('click', 'polygons', (e) => {
            map.getCanvas().style.cursor = 'pointer';

            let featureId = e.features[0].id;

            
            if (currentZipcode !== null && currentZipcode !== featureId) {
                map.setFeatureState({
                    source: 'zip-codes',
                    id: currentZipcode,
                }, 
                {
                    clicked: false
                });
            }
                        
            map.setFeatureState(
                {
                    source: 'zip-codes',
                    id: featureId,
                }, {
                clicked: true
            });

            currentZipcode = featureId;
            zipcode = '0' + currentZipcode.toString();
        });

    });
</script>

<style>
    #map {
        height: 100vh;
        width: 100%;
    }
</style>

<div id="map"></div>
