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
      cameras,
    } from "../stores";
    import { text } from "svelte/internal";
  
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
    
    
    export let name;
    // optional import focus-visible polyfill only once
    import 'focus-visible';

</script>
    
{#if loading}
<Loading />
{/if}

{#if $cameras.length > 0}
<div class="container">
    {#each $cameras as camera, i}
        <CamaraCard i={i} camera={camera} id={camera.id} idn={camera.idn} feed={camera.feed} fps={camera.fps} det_barbijo={camera.det_barbijo} det_casco={camera.det_casco} det_chaleco={camera.det_chaleco} frames_capt={camera.frames_capt} active={camera.active} } />
    {/each}    
</div>

{/if}

