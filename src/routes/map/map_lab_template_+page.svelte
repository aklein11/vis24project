<style>
    @import url("$lib/global.css");
</style>

<script>
    import * as d3 from "d3";
    import mapboxgl from "mapbox-gl";
    import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";

    mapboxgl.accessToken = "pk.eyJ1Ijoic3dpbHNvbjMiLCJhIjoiY2x2NWo0MHk1MDB2aDJycXFmOTlpNGlvayJ9.eTtJOvYCsdzZAFpv_TZQCA";
    import { onMount } from "svelte";

    let stations = [];
    let trips = [];
    let map;
    let mapViewChanged = 0;

    onMount(async () => {
        map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/streets-v12",
            zoom: 12,
            center: [-71.0947291506178, 42.35850643315339],

        });
        await new Promise(resolve => map.on("load", resolve));
        map.addSource("boston_route", {
            type: "geojson",
            data: "https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::existing-bike-network-2022.geojson?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D",
        });
        map.addLayer({
            id: "first_layer", // A name for our layer (up to you)
            type: "line", // one of the supported layer types, e.g. line, circle, etc.
            source: "boston_route", // The id we specified in `addSource()`
            paint: {
                // paint params, e.g. colors, thickness, etc.
                "line-color": "green",
                "line-width": 3,
                "line-opacity": 0.4,
            },
        });
        map.addSource("cambridge_route", {
            type: "geojson",
            data: "https://raw.githubusercontent.com/cambridgegis/cambridgegis_data/main/Recreation/Bike_Facilities/RECREATION_BikeFacilities.geojson",
        });
        map.addLayer({
            id: "second_layer", // A name for our layer (up to you)
            type: "line", // one of the supported layer types, e.g. line, circle, etc.
            source: "cambridge_route", // The id we specified in `addSource()`
            paint: {
                // paint params, e.g. colors, thickness, etc.
                "line-color": "green",
                "line-width": 3,
                "line-opacity": 0.4,
            },
        });

        stations = await d3.csv("https://vis-society.github.io/labs/8/data/bluebikes-stations.csv");
        trips = await d3.csv("https://vis-society.github.io/labs/8/data/bluebikes-traffic-2024-03.csv")
            .then(trips => {
                for (let trip of trips) {
                    trip.started_at = new Date(trip.started_at);
                    trip.ended_at = new Date(trip.ended_at);
                }
                return trips;
            });

        let departures = d3.rollup(trips, v => v.length, d => d.start_station_id);
        let arrivals = d3.rollup(trips, v => v.length, a => a.end_station_id);
        stations = stations.map(station => {
            let id = station.Number;
            station.arrivals = arrivals.get(id) ?? 0;
            station.departures = departures.get(id) ?? 0;
            station.totalTraffic = station.arrivals + station.departures;
            return station;
        });


    })

    function getCoords (station) {
        let point = new mapboxgl.LngLat(+station.Long, +station.Lat);
        let {x, y} = map.project(point);
        return {cx: x, cy: y};
    }
    $: map?.on("move", evt => mapViewChanged++);
    $: radiusScale = d3.scaleSqrt()
        .domain([0, d3.max(stations, d => d.totalTraffic)])
        .range([0, 25]);

    let timeFilter = -1;
    $: timeFilterLabel = new Date(0, 0, 0, 0, timeFilter)
                     .toLocaleString("en", {timeStyle: "short"});
    
    function minutesSinceMidnight (date) {
        return date.getHours() * 60 + date.getMinutes();
    }

    let filteredTrips = [];
    let filteredArrivals;
    let filteredDepartures;
    let filteredStations = [];
    $: filteredTrips = timeFilter === -1? trips : trips.filter(trip => {
        let startedMinutes = minutesSinceMidnight(trip.started_at);
        let endedMinutes = minutesSinceMidnight(trip.ended_at);
        return Math.abs(startedMinutes - timeFilter) <= 60
            || Math.abs(endedMinutes - timeFilter) <= 60;
    });

    $: filteredDepartures = d3.rollup(filteredTrips, v => v.length, d => d.start_station_id);
    $: filteredArrivals = d3.rollup(filteredTrips, v => v.length, a => a.end_station_id);
    $: filteredStations = stations.map(station => {
        let id = station.Number;
        let filteredstation = {...station};
        filteredstation.arrivals = filteredArrivals.get(id) ?? 0;
        filteredstation.departures = filteredDepartures.get(id) ?? 0;
        filteredstation.totalTraffic = filteredstation.arrivals + filteredstation.departures;
        return filteredstation;
    });
    let stationFlow = d3.scaleQuantize()
	.domain([0, 1])
	.range([0, 0.5, 1]);

        
</script>

<header>
    <h1>🚴🏼‍♀️ bikewatching 🔭</h1>

    <label>
        <input type=range min=-1 max=1440 bind:value={timeFilter}>
        {#if timeFilter == -1}
            <em>(any time)</em>
        {:else}
            <time>{timeFilterLabel}</time>
        {/if}
    </label>
</header>

<div id="map">
	<svg>
        <g class="stations">
            {#each filteredStations as station }
                {#key mapViewChanged}
                    <circle { ...getCoords(station) } r={ radiusScale(station.totalTraffic) } fill="steelblue" style="--departure-ratio: { stationFlow(station.departures / station.totalTraffic) }">
                        <title>{station.totalTraffic} trips ({station.departures} departures, { station.arrivals} arrivals)</title>
                    </circle>
                {/key}
            {/each}
        </g>
    </svg>
</div>

<div class="legend">
	<div style="--departure-ratio: 1">More departures</div>
	<div style="--departure-ratio: 0.5">Balanced</div>
	<div style="--departure-ratio: 0">More arrivals</div>
</div>

