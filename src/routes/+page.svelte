<script>
    import projects from '$lib/projects.json';
    import Project from "$lib/Project.svelte";
    // import {onMount} from 'svelte';
    // let profileData = { loading: true, error: null, data: null };
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Abigail Klein</h1>

<p>My name is Abigail Klein and I am a senior studying Computation and Cognition at MIT. I enjoy coding and am excited to learn more web development and data visualization techniques through this class.</p>

<img src="images/googleBlurbPicture.jpg" alt="portrait of Abigail" width="450"/>

<section>
    <h2>My GitHub Stats</h2>
    <main>
        {#await fetch("https://api.github.com/users/aklein11") }
            <p>Loading...</p>
        {:then response}
            {#await response.json()}
                <p>Decoding...</p>
            {:then data}
                <!-- <p>The data is { JSON.stringify(data) }</p> -->
                <dl>
                    <dt>Followers: </dt><dd>{ data.followers }</dd>
                    <dt>Following: </dt><dd>{ data.following }</dd>
                    <dt>Number Public Repos: </dt><dd>{ data.public_repos }</dd>
                </dl>
            {:catch error}
                <p class="error">
                    Something went wrong: {error.message}
                </p>
            {/await}
        {:catch error}
            <p class="error">
                Something went wrong: {error.message}
            </p>
        {/await}
    </main>
    
</section>

<h2>Latest projects</h2>
<div class="projects highlights">
    {#each projects.slice(0, 3) as p}
        <Project info={p} hLevel=3 />
        
    {/each}
</div>
