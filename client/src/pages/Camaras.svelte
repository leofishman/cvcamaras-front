<script>
    import axios from "axios";
    import Transaction from "../components/Transaction.svelte";
    import CamaraCard from "../components/CameraCard.svelte"
    import Loading from "../components/Loading.svelte";
    import { onMount } from "svelte";
    import {
      transactions,
      sortedTransactions,
      income,
      expenses,
      balance,
      pageAction,
      cameras,
    } from "../stores";
    import { text } from "svelte/internal";
  
    let id = '';
    let idn = 0;
    let site;
    let feed = '';
    let fps = 1;
    let det_persona;
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
      loading = false;
      $pageAction = 'Camaras';
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
        <CamaraCard i={i} camera={camera}  id={camera.id} site={camera.site}  feed={camera.feed} det_persona={cameras.det_persona} det_barbijo={camera.det_barbijo} det_casco={camera.det_casco} det_chaleco={camera.det_chaleco} active={camera.active}  />
    {/each}    
</div>

{/if}

