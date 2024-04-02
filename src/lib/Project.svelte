<script>export let info={};</script>

<article>
    <h2>{info.title}</h2>
    <img src={info.image} alt="">
    <div>
        <p>{info.description}</p>
        <p>{info.year}</p>
    </div>
</article>

<style>
    article {
        display: grid;
        grid-template-rows: subgrid;
        grid-row: span 3;
    }

    h1, h2, h3, h4, h5 h6{
        line-height: 1.1;
        text-wrap: balance;
    }

    h2 {
        margin: 0;
        font-size: 120%;
    }   
</style>