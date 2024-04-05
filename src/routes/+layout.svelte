<script>
    import { page } from '$app/stores';

    let pages = [
        { url: "./", title: "Home" },
        { url: "./about", title: "Bar Graph" },
        { url: "./visualization", title: "Visualization" },
        // add the rest of your pages here
    ];

    let localStorage = globalThis.localStorage ?? {};
    let colorScheme = localStorage.colorScheme ?? "light dark";
	let root = globalThis?.document?.documentElement;

	$: localStorage.colorScheme = colorScheme;
	$: root?.style.setProperty('color-scheme', colorScheme);
</script>

<style>
    nav {
        --border-color: oklch(50% 10% 200 / 40%);
        
        display: flex;
        margin-bottom: 20px;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: oklch(80% 3% 200 / 40%);
    }

    nav a {
        text-decoration: none;
        color: inherit;
        text-align: center;
        padding: .5em;
    }

    nav a:hover {
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: var(--color-accent);
        /* background-color: oklch(from var(--color-accent) 95% 5% h) */
        background-color: color-mix(in oklch, var(--color-accent), canvas 85%);
    }

    .color-scheme {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
</style>

<nav>
    {#each pages as p}
        <a href={ p.url } class:current={ "." + $page.route.id === p.url } target={ p.url.startsWith("http") ? "_blank" : null }>
            { p.title }
        </a>
    {/each}
</nav>

<label class="color-scheme", position: absolute, top=1rem, right=1rem>
    Theme:
    <select bind:value={ colorScheme }>
        <option value="light dark">Automatic</option>
        <option value="light">Light Mode</option>
        <option value="dark">Dark Mode</option>
    </select>
</label>

<slot />
