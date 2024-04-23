<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    let data = [];

    onMount(async () => {
        const path = '/lat_long_address.csv'; // Adjust the path as needed
        data = await d3.csv(path, d => {
            return {
                address: d["Address"],
                zipcode: d['ZIPCODE post (group)'],
                latitude: +d["Latitude"],
                longitude: +d["Longitude"]
            };
        });

        console.log(data);
        createMap();
    });

    function createMap() {
        const svg = d3.select("#map").append("svg")
            .attr("width", 800)
            .attr("height", 600);

        const projection = d3.geoMercator()
            .scale(10000) // May need adjustment
            .center([-71.057083, 42.361145]) // Adjust based on your data
            .translate([400, 300]);

        console.log("Projection test:", projection([-71.057083, 42.361145])); // Check projection output

        svg.selectAll(".point")
            .data(data)
            .enter().append("circle")
            .attr("class", "point")
            .attr("cx", d => {
                const coords = projection([d.longitude, d.latitude]);
                console.log("Coords for", d.address, coords); // Log each coordinate computation
                return coords[0];
            })
            .attr("cy", d => projection([d.longitude, d.latitude])[1])
            .attr("r", 5)
            .attr("fill", "blue");
    }
</script>

<svg id="map"></svg>

<style>
    svg {
        border: 1px solid black;
    }
    .point {
        fill: blue;
        stroke: white;
        stroke-width: 1.5px;
    }
</style>
