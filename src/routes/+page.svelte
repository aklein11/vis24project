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
    import Somerville from "$lib/AnimationMap.svelte";
    import { writable } from 'svelte/store';
    import Mapchoice from "../lib/Mapchoice.svelte";
    import Plot2023 from "$lib/Plot2023.svelte";
    import Plot2018 from "$lib/Plot2018.svelte";
    import Plot2016 from "$lib/Plot2016.svelte";

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
    .page-title {
        text-align: center;
    }

    .page-title h1 {
        margin-block-start: 5px;
        margin-block-end: 5px;
    }

    .page-title h3 {
        margin-block-start: 5px;
        margin-block-end: 5px;
    }

   .scrolly-container {
        max-width: 100%;
    }

    .parent-container {
        margin: auto; /* Center the container horizontally */
        display: flex;
        flex-direction: column;
    }

    .map-container {
        width: 100%;
        /* You may add margins or paddings as needed */
        /* NEW COMMIT */
    }

    .sub-charts-container {
        display: flex;
        width: 100%;
    }

    .bargraph-container {
        flex: 2;
        max-width: calc(50% - 10px);
        margin-right: 10px; /* Adjust as needed */
    }

    .piechart-container {
        flex: 1;
        max-width: calc(50% - 10px);
        margin-left: 10px;
    }

    .test {
        font-size: 20px;
        font-weight: normal;
        margin-left: 0px;
        overflow: scroll;
    }

    .red{
        color: red;
    }

    a {
        font-weight:normal;
        text-decoration: underline;
        color:black;
    }
</style>

<div class="page-title">
    <h1>Condo Conversions Intensify Housing Unaffordability in Boston</h1>
    <h3>Caroline Cunningham, Sejal Gupta, Abigail Klein, Stephen Wilson</h3>    
</div>

<br>

<h2> What are Condo Conversions? </h2>

    <p class="test"> <a href="https://www.mapc.org/wp-content/uploads/2021/12/10.-MC2050-Homes-for-Everyone-Brief.pdf">Greater Boston ranks 3rd in the most expensive housing markets in the United States, </a> and <a href="https://homesforprofit.mapc.org/report"> 51% of Boston residents are forced to spend over the recommended income percentage (30%) on rent. </a>
        There are many sources of pressure on prices in Boston’s housing market – from zoning restrictions that hinder development of new housing to outside investors who drive up rent 
        </p>
        <p class="test">
    <a href="https://homesforprofit.mapc.org/report"> Affecting renters, residents are often displaced due to price increases when outside investors convert the buildings they live in into condominiums. </a> We refer to buildings being converted into condomniums as "condo conversions". Price increases from condo conversions contribute to housing unaffordability and the further inaccessability of impacted neighborhoods.
    </p>
    

<h2> Examples of Condo Conversions in Boston </h2>

<h3> 2014: Back Bay Luxury Condo Conversions </h3>

<Scrolly>
    <p><a href="https://www.gibsonsothebysrealty.com/blog/posts/2014/11/19/back-bay-luxury-real-estate-mandarin-oriental-to-convert-25-units-to-luxury-condos/"> Back Bay’s Mandarin Oriental complex converted 25 apartments into luxury condominium units. </a></p>
    <p>The converted units were “predicted to take in some of the highest prices the condo sales market [had] seen”. Increasingly pricey new developments exasperbate Boston's housing crisis, making it increasingly hard for non-wealthy residents to call the city home.</p>

    <svelte:fragment slot="viz">
        <div class="scrolly-container">
            <img src="./images/mandarin_oriental.jpeg" alt="Mandarin Oriental - Boston"/>
        </div>
        <a href="https://www.luxuryboston.com/The-Mandarin-Oriental">Image Credit</a>
    </svelte:fragment>
</Scrolly>   

<h3> 2016: Prospective Developers discuss Economics of Medford Condo Conversions </h3>

<Scrolly>

    <p> The 2016 <a href="https://bankerandtradesman.com/multifamily-home-conversions-slowly-picking-medford/"> Banker & Tradesman article </a> discusses the real estate economics of condo conversions on multifamily housing units in Medford.</p>
    <p> The goal of prospective developers is to convert multifamily units into condos for profit. </p>
    <p> Condo conversions on multifamily homes reduces affordable housing supply for families, making it more challenging for families to find a home in Greater Boston. </p>

    <svelte:fragment slot="viz">
        <div class="scrolly-container">
            <img src="./images/multifamily_image.jpg" alt="Medford"/>
        </div>
        <a href="https://bankerandtradesman.com/multifamily-home-conversions-slowly-picking-medford/">Image Credit</a>
    </svelte:fragment>

</Scrolly>   

<h3>2018: Condo Conversion in Somerville impacts Current Tenants</h3>

<Scrolly>
        
    <p>In 2018, <a href="https://www.cambridgeday.com/2018/02/17/renters-at-a-brand-new-somerville-building-surprised-by-news-millbrooks-going-condo/?fbclid=IwAR3Y-EiEl1r1ZK_-NN2MNZzoPoUJDLR5jyG2PFacnB6fe3GGT1VDTIT7J-k"> Berkeley Investments acquired Millbrook Lofts in Somerville </a> to convert into condominiums.
    </p>   
    <p>  In an outcry, the Millbrook Lofts Tenants’ Association argued that there would be multiple incidental expenses for residents needing to move. </p>
    <p>    Given Boston's tight real estate market, renters living in buildings set to be converted may difficulties finding a new place to rent. 
        <br> 
        <br> 
        <br> 
        <br> 
        <br> 
        <br> 
        <br> 
        <br> 
        <br> 
        <br> 
        
    </p>                     
    <svelte:fragment slot="viz">
        <div class="scrolly-container">
            <img src="./images/millbrook_image.jpeg" alt="Somerville"/>
        </div>
        <a href="https://www.cambridgeday.com/2018/02/17/renters-at-a-brand-new-somerville-building-surprised-by-news-millbrooks-going-condo/?fbclid=IwAR3Y-EiEl1r1ZK_-NN2MNZzoPoUJDLR5jyG2PFacnB6fe3GGT1VDTIT7J-k">Image Credit</a>
    </svelte:fragment>

    <br>
<br>
<br>
<br>
<br>
<br>

</Scrolly>

<h3>2023: Condo Conversions in Boston and Cambridge.</h3>

<Scrolly>
    <p>
        Our dataset tracks condo conversions in Boston and Cambridge from 2015 to 2023.
    </p>           
    <p>
        There have been <strong> 2530 </strong> total condo conversions, plotted over time to the right.
    </p>
    <svelte:fragment slot="viz">
        <div class="scrolly-container">
            <Plot2023 query={ '2023' }/>
        </div>
        <p>
        </p>        
    </svelte:fragment>

</Scrolly>

<h2> Factors that Influence Condo Conversions </h2>
<blockquote>
    We were really interested in determining the factors that impacted the likelihood of a condo conversion within the Greater Boston Area. Aside from the age of the buildings, our analysis primarily focused on the building type before and after conversions. In the heatmap below, you can see the number of property conversions where the initial property type is on the X Axis and the final property type is on the Y Axis. As you can see, most properties are converted to condos, specifically residential homes.

    Click around to see the number of properties converted in the Boston and Cambridge area.
</blockquote>

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

<text>
    On the map, <strong>click a Boston or Cambridge zip code</strong> to see the locations of condo conversions (starting from 2015) in the region. 
    
    Once you click a zipcode, the locations of the condo conversions in the area will be highlighted with </text> <strong class="red"> red dots </strong>.

    <text>  You can <strong>hover over the dots to learn more about the condo conversions</strong> and look at the <strong>associated charts</strong> to learn more about the overall zipcode.
</text>

<div class="parent-container">

    <div class="map-container">
        <Map bind:zipcode={ $zipcode }/>
    </div>

    {$zipcode}
    <div class="sub-charts-container">
        <div class="bargraph-container">
            <Bargraph query={ $zipcode }/>
            <p>Age of Buildings that are Most Likely to be Converted to Condos in <strong>
                {#if $zipcode !== ''}
                    {$zipcode}
                {:else}
                    Boston and Cambridge
                {/if}
            </strong></p>
        </div>
        <div class="piechart-container">
            <Piechart query={ $zipcode }/> 
            <p>Types of Buildings the are Most Likely to be Converted in <strong>
                {#if $zipcode !== ''}
                    {$zipcode}
                {:else}
                    Boston and Cambridge
                {/if}
            </strong></p>
        </div>
    </div>
</div>

<div class="parent-container">
    {#if $zipcode !== '' && cambridgeZip.indexOf($zipcode) !== -1}
        <p>Complaints about Condominiums over Time in <strong>{$zipcode}</strong> </p>
        <blockquote>
            For Cambridge, we did not have data on condominium complaints.
        </blockquote>
    {:else}
        <div class="sub-charts-container">
            <div class="bargraph-container">
                <Linechart query={ $zipcode }/>
                <p>Complaints about Condominiums over Time in <strong>
                    {#if $zipcode !== ''}
                        {$zipcode}
                    {:else}
                        Boston and Cambridge
                    {/if}
                    </strong>
                </p>
            </div>

            <div class="piechart-container">
                <Bubblechart query={ $zipcode }/>
                <p>Most Common Complaints in <strong>
                    {#if $zipcode !== ''}
                        {$zipcode}
                    {:else}
                        Boston
                    {/if}
                    </strong>
                </p>
            </div>
        </div>

        

        <Scrolly>
            <p>Types of Complaints in <strong>
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
    {/if}
</div>

<h2> What is Being Done? </h2>

<blockquote scrolly-container>
    <p class="test">Boston has passed protections on condo conversions of older buildings; the <a href="https://www.boston.gov/condominium-and-cooperative-conversion-ordinance"> Condominium and Cooperative Conversion Ordinance (c.a. 1999, amended 2021) </a> provides rights to tenants of buildings constructed pre-1983 with 4+ rental units. 
        <a href="https://www.boston.gov/sites/default/files/file/2022/08/Conversion%20Ordinance%20Summary%2C%20English.pdf"> This ordinance specifies a required notification period, a set relocation payment, and the requirement that tenants have the right to purchase their unit, among other protections. </a>
    </p>

    <p class="test">
    Legal ordinances communities in greater Boston have to protect tenants are detailed on Mass Legal Help's website <a href="https://www.masslegalhelp.org/housing-apartments-shelter/rooming-houses-mobile-homes-condos/local-protections-tenants-facing"> here </a>.
    </p>

    <p class="test">
    That being said, protections for tenants facing condo conversions is still lacking. The Metropolitan Area Planning Council (MAPC) writes in their <a href="https://homesforprofit.mapc.org/report"> report </a> on investor activity in Greater Boston from 2000-2022 that Investor purchases account for 21% of transactions, contributing to housing unaffordability and price increases. For more information on proposed policies, including proposed bills to help residents find short-term emergency housing and to increase funds for affordable housing, view the Policy Recommendations section of the <a href="https://homesforprofit.mapc.org/report"> MAPC report </a>.
    </p>    

    <p class="test">    
    Thank you to the Metropolitan Area Planning Council, our professors, and the teaching staff for guidance on our project!
    </p>
</blockquote>
