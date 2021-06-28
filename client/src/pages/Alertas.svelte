
<script>
    import axios from "axios";
    import Alertas from "../components/Alertas.svelte"
    import { querystring } from "svelte-spa-router";
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
      const { data } = await axios.get("/api/alertas/", {params: $querystring});



      loading = false;
      alertas = data;
      $pageAction = 'Alertas';
    });
    
    // optional import focus-visible polyfill only once
    import 'focus-visible';

</script>
    
{#if loading}
<Loading />
{/if}

<div class="container">
  {#if alertas.length > 0}

  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th><abbr title="Fecha">Fecha</abbr></th>
        <th><abbr title="Tipo">Tipo</abbr></th>
        <th><abbr title="Camara">Camara</abbr></th>
        <th><abbr title="Elemento">Elemento</abbr></th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th><abbr title="Fecha">Fecha</abbr></th>
        <th><abbr title="Tipo">Tipo</abbr></th>
        <th><abbr title="Camara">Camara</abbr></th>
        <th><abbr title="Elemento">Elemento</abbr></th>
      </tr>
    </tfoot>
    <tbody>
      {#each alertas as alerta, i}

          <Alertas eventType={'alerta'} alertType={alerta.tipo} {alerta} {i} />
      {/each} 


    </tbody>
  </table> 
  {/if}  
</div>
