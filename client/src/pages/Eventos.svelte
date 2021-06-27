
<script>
    import axios from "axios";
    import Eventos from "../components/Eventos.svelte"
    import Loading from "../components/Loading.svelte";
    import { onMount } from "svelte";
    import {
      cameras,
      pageAction
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
    $: alertas = '';
    $: disabled = (feed == '' || id == '');
    

    onMount(async () => {
      loading = true;

      const { data } = await axios.get("/api/alertas/", {params: {tipo: "inmediata"}});
      
      console.log(28, data);
      loading = false;
      alertas = data;
      $pageAction = 'Eventos';
      console.log(35, $pageAction)
    });
    
    
    // optional import focus-visible polyfill only once
    import 'focus-visible';

</script>
    
{#if loading}
<Loading />
{/if}

<div class="container">
  {#if alertas.length > 0}
    {#each alertas as evento, i}
       <Eventos eventType={'alerta'} alertType={evento.tipo} {evento} {i} />
    {/each}  
  {/if}  
</div>
