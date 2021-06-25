<script>
    import axios from "axios";
    import Eventos from "../components/Eventos.svelte"
    import Loading from "../components/Loading.svelte";
    import { onMount } from "svelte";
    import {
      cameras,
    } from "../stores";
    import 'bulma/css/bulma.css'
  
    let id = '';
    let idn = 0;
    let feed = '';
    let fps = 1;
    let det_barbijo = true;
    let det_casco = true;
    let det_chaleco = false;
    let frames_capt = 50;
    let active = true;
    let loading = false;
  
    $: disabled = (feed == '' || id == '');

    onMount(async () => {
      loading = true;
      const { data } = await axios.get("/api/config/cameras");
      $cameras = data;
      console.log(data);
      loading = false;
    });
    
    
    // optional import focus-visible polyfill only once
    import 'focus-visible';

</script>
    
{#if loading}
<Loading />
{/if}

{#if $cameras.length > 0}
<div class="container">
    {#each $cameras as camera, i}
       <Eventos />
    {/each}    
</div>

{/if}