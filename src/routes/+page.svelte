<script>
    import * as d3 from "d3";
	import Scrolly from "svelte-scrolly";
    import { onMount } from "svelte";
    import Bargraph from "$lib/Bargraph.svelte";
    import RaceBarChart from "$lib/RaceBarChart.svelte";
	import Bubblechart from "$lib/Bubblechart.svelte";
	import Linechart from "$lib/Linechart.svelte";
	import Piechart from "$lib/Piechart.svelte";
    import Heatmap from "$lib/Heatmap.svelte";
    import WordCloud from "$lib/WordCloud.svelte";
    import Map from "$lib/Mapchoice.svelte";
    import { writable } from 'svelte/store';

    let zipcode = writable(''); 
    let currentPage = 0;

    function handleClick() {
        currentPage += 1;
        currentPage %= 4;
    }

    const cambridgeZip = ["02140", "02139", "02142", "02141", "02138"];
</script>

<svelte:head>
    <title>Condo Conversions in Greater Boston </title>
</svelte:head>

<!-- Separate sections with unique class for each type of chart -->
<style>
   .scrolly-container {
        max-width: 100%;
    }

    .pie-container {
        max-width: 100%;
    }

    /* .scrolly {
        max-width: 50%;
    } */
    .parent-container {
    margin: auto; /* Center the container horizontally */
    }

   .stats {
        display: grid;  
        /* grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); */
        flex-direction: column;  /* Arrange items horizontally */
        justify-content: space-between;  /* Distribute items evenly along the main axis */
        align-items: center;  /* Align items vertically */
    }

    .stats dt {
        margin-right: 10px;  /* Add some margin between dt and dd */
        grid-row: 1;  /* Place dt in the first row */
        /* display: inline-block; */
    }

    .stats dd {
        grid-row: 2;  /* Place dd in the second row */
    }

	.graph-container svg {
		width: 100%; /* Set the width of the graph to 100% of its container */
		height: 100%; /* Set the height of the graph to 100% of its container */
	}

    .hide-graph {
        visibility: none;
    }

    .test {
        font-size: 20px;
        margin-top: 50px;
        font-weight: normal;
        margin-left: 0px;
        overflow: scroll;
    }

    .test-pie {
        font-size: 20px;
        margin-top: 50px;
        font-weight: normal;
        margin-left: 0px;
        overflow: scroll;
    }
</style>

<h1> Greater Boston Infested with Condomoniums</h1>

<h2> What are Condo Conversions </h2>

<h2> Examples of Condo Conversions in the Greater Boston Area </h2>

<blockquote scrolly-container>
    <p> 
        <a href="https://www.mapc.org/wp-content/uploads/2021/12/10.-MC2050-Homes-for-Everyone-Brief.pdf">Greater Boston ranks 3rd in the most expensive housing markets in the United States, </a> 
        and <a href="https://homesforprofit.mapc.org/report"> 51% of Boston residents are forced to spend over the recommended income percentage (30%) on rent. </a>
    </p>
    <p> 
        There are many sources of pressure on prices in Boston’s housing market – from zoning restrictions that hinder development of new housing to outside investors who drive up rent. 
        <a href="https://homesforprofit.mapc.org/report"> Affecting renters, residents are often displaced due to price increases when outside investors convert the buildings they live in into condominiums.</a> 
        We refer to this pattern of events as condo conversions.
    </p>
</blockquote>

We take you through three examples of condo conversion in Greater Boston.

<button on:click={handleClick}>
    {#if currentPage == 0}
        Learn about Somerville
    {:else if currentPage == 1}
        Learn about Back Bay
    {:else if currentPage == 2}
        Learn about Medford
    {:else}
        Back to Start
    {/if}
</button>

{#if currentPage == 0}
<img src="./images/Boston_Map.png" alt="Image of Boston_Map"/>

{:else if currentPage  == 1}
    <blockquote>
        In 2018, <a href="https://www.cambridgeday.com/2018/02/17/renters-at-a-brand-new-somerville-building-surprised-by-news-millbrooks-going-condo/?fbclid=IwAR3Y-EiEl1r1ZK_-NN2MNZzoPoUJDLR5jyG2PFacnB6fe3GGT1VDTIT7J-k"> Berkeley Investments acquired Millbrook Lofts in Somerville </a> to convert into condominiums. Millbrook Lofts Tenants’ Association of the apartment buildings argued that there would be multiple incidental expenses for residents needing to move.
    </blockquote>
    <img src="./images/Somerville_Map.png" alt="Image of Somerville_Map"/>
{:else if currentPage == 2}
    <blockquote>
        In 2014, <a href="https://www.gibsonsothebysrealty.com/blog/posts/2014/11/19/back-bay-luxury-real-estate-mandarin-oriental-to-convert-25-units-to-luxury-condos/"> Back Bay’s Mandarin Oriental complex converted 25 apartments into luxury condominium units. </a> The converted units were “predicted to take in some of the highest prices the condo sales market [had] seen”.
    </blockquote>
    <img src="./images/BackBay_Map.png" alt="Image of BackBay_Map"/>
{:else}
    <blockquote>
        The 2016 <a href="https://bankerandtradesman.com/multifamily-home-conversions-slowly-picking-medford/"> Banker & Tradesman article </a> discusses the real estate economics of Medford multifamily housing units with the goal of converting the condominiums to make a profit.
    </blockquote>
    <img src="./images/Medford_Map.png" alt="Image of Medford_Map"/>
{/if}

<text> <a href="https://svelte.dev/examples/context-api"> Image Generation Credit </a> </text>

<h2> Heat Map </h2>
<Heatmap />

<h2> Impact of the Condo Conversions </h2>
<blockquote>
    
    <a href="https://data.boston.gov/dataset/rentsmart/resource/dc615ff7-2ff3-416a-922b-f0f334f085d0?filters=property_type%3ACondominium%20Main" >RentSmart</a> has released a dataset about tenant / contractor complaints from Boston's 311 and the City's Inspectional Services Division buildings from the years of 2019 to 2023. 
    
    Taking all the complaints about condominiums, the following chart shows the gradual change in the sheer number of complaints and the top categories.
    
</blockquote>

<RaceBarChart />

<blockquote> 
    As we can see, the main complaints are Improper Storage Trash, Extermination and Mold Concerns, Abandoned Vehicles, Permit Issues, and Failure to restore basic structural and utility needs.
</blockquote>

<h2> Visualize Impact in Your Zipcode </h2>

<blockquote>
    Through our interactive visualization, we invite you to explore the impact of condo conversions on your community.<br>
    <newline></newline>
    On the map, <strong>click a Boston or Cambridge zip code</strong> to see the locations of condo conversions (starting from 2015) in the region. 
    
    Once you click a zipcode, the locations of the condo conversions in the area will be highlighted with red dots.

    You can <strong>hover over the dots to learn more about the condo conversions</strong> and look at the <strong>associated charts</strong> to learn more about the overall zipcode.
</blockquote>

<div class="parent-container">
    <Map bind:zipcode={ $zipcode }/>

    <Scrolly>
        <p class="test">Age of Buildings that are Most Likely to be Converted to Condos in <strong>
            {#if $zipcode !== ''}
                {$zipcode}
            {:else}
                Boston and Cambridge
            {/if}
        </strong></p>
        <svelte:fragment slot="viz">
            <div class="scrolly-container">
                <Bargraph query={ $zipcode }/>
            </div>
        </svelte:fragment>
    </Scrolly>
    
    <Scrolly>
        <p class="test">Types of Buildings the are Most Likely to be Converted in <strong>
            {#if $zipcode !== ''}
                {$zipcode}
            {:else}
                Boston and Cambridge
            {/if}
        </strong></p>
        <svelte:fragment slot="viz">
            <div class="pie-container">
                <Piechart query={ $zipcode }/> 
            </div>
        </svelte:fragment>
    </Scrolly>
</div>

{#if $zipcode !== '' && cambridgeZip.indexOf($zipcode) !== -1}
    <p>Complaints about Condominiums over Time in <strong>{zipcode}</strong> </p>
    <blockquote>
        For Cambridge, we did not have data on condominium complaints.
    </blockquote>
{:else}
    <Scrolly>
        <p class="test">Complaints about Condominiums over Time in <strong>
            {#if $zipcode !== ''}
                {$zipcode}
            {:else}
                Boston and Cambridge
            {/if}
        </strong></p>
        <svelte:fragment slot="viz">
            <div class="scrolly-container">
                <Linechart query={ $zipcode }/>
            </div>
        </svelte:fragment>
    </Scrolly>

    <Scrolly>
        <p class="test">Types of Complaints in <strong>
            {#if $zipcode !== ''}
                {$zipcode}
            {:else}
                Boston
            {/if}
        </strong></p>
        <svelte:fragment slot="viz">
            <div class="scrolly-container">
                <WordCloud query={ $zipcode }/>
            </div>
        </svelte:fragment>
    </Scrolly>

    <Scrolly>
        <p class="test">Most Common Complaints in <strong>
            {#if $zipcode !== ''}
                {$zipcode}
            {:else}
                Boston
            {/if}
        </strong></p>
        <svelte:fragment slot="viz">
            <div class="scrolly-container">
                <Bubblechart query={ $zipcode }/>
            </div>
        </svelte:fragment>
    </Scrolly>
{/if}

<h2> What is Being Done? </h2>

<blockquote scrolly-container>
    <p>Boston has passed protections on condo conversions of older buildings; specifically, the 
        <a href="https://www.boston.gov/condominium-and-cooperative-conversion-ordinance"> Condominium and Cooperative Conversion Ordinance (c.a. 1999, amended 2021) </a> 
        provides rights to tenants of buildings constructed pre-1983 with 4+ rental units. 
        <a href="https://www.boston.gov/sites/default/files/file/2022/08/Conversion%20Ordinance%20Summary%2C%20English.pdf"> Specifically, the ordinance specifies a required notification period, a set relocation payment, and the requirement that tenants have the right to purchase their unit, among other protections. </a>
    </p>

    <p>
        Legal ordinances communities in greater Boston have to protect tenants are detailed on Mass Legal Help's website 
        <a href="https://www.masslegalhelp.org/housing-apartments-shelter/rooming-houses-mobile-homes-condos/local-protections-tenants-facing"> here </a>.
    </p>

    <p>
        That being said, protections for tenants facing condo conversions is still lacking. 
        The Metropolitan Area Planning Council (MAPC) writes in their <a href="https://homesforprofit.mapc.org/report"> report </a> 
        on investor activity in Greater Boston from 2000-2022 that Investor purchases account for 21% of transactions, contributing 
        to housing unaffordability and price increases. For more information on proposed policies, including proposed bills to help 
        residents find short-term emergency housing and increase funds for affordable housing, view the Policy Recommendations section 
        of the <a href="https://homesforprofit.mapc.org/report"> MAPC report </a>.
    </p>    

    <p>    
        Thank you to the Metropolitan Area Planning Council for guidance on our project!
    </p>
</blockquote>
