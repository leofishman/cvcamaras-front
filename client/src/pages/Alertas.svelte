
<script>
    import axios from "axios";
    import Alertas from "../components/Alertas.svelte"
    import { querystring } from "svelte-spa-router";
    import Loading from "../components/Loading.svelte";
    import { ExpansionPanel, Modal, Button, Datepicker, Sidepanel, Dialog, Snackbar, Checkbox } from 'svelte-mui';
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
    let query = $querystring;
    $: alertas = '';
    $: disabled = (feed == '' || id == '');

    let opciones = {}
    let queries = query.split("&");
    if (queries.length > 1) {
      queries.forEach(element => {
        opciones[element.split("=")[0]] = element.split("=")[1]
      });
    }

    onMount(async () => {
      loading = true;
      const { data } = await axios.get("/api/alertas/", {params: $querystring});
      loading = false;
      alertas = data;
      $pageAction = 'Alertas';

    });
    
    // optional import focus-visible polyfill only once
    import 'focus-visible';

    async function filtrar() {
    //  loading = true;
    
      let params = '';
      for (const param in opciones) {
        params = params + param + "=" + opciones[param] + "&"
      }
      const { data } = await axios.get("/api/alertas/", {params: params});
      loading = false;
      alertas = data;
      $pageAction = 'Alertas';
    }
</script>
    
{#if loading}
<Loading />
{/if}

<div class="container">
  <ExpansionPanel name="Filtros">
    <div class="columns" on:change="{filtrar}">
      <div class="column">
        <input type="date" bind:value={opciones.fecha_desde} />
        Desde
        {#if (opciones.fecha_desde) }
          <input type="date" bind:value={opciones.fecha_hasta} bind/>
         hasta 
        {/if}
      </div>
      <div class="column">
        <div class="select">
          <select bind:value="{opciones.cam}">Camara
            {#each $cameras as camera, i}
              <option value="{camera.id}">{camera.id} </option>
            {/each}
          </select>
        </div>
      </div>
      <div class="column">
        <div class="select">
          <select bind:value="{opciones.tipo}">Tipo de Alerta
            <!--option value="">--TODAS--</option-->
            <option value="inmediata">Inmediata</option>
            <option value="dia">Diaria</option>
            <option value="hora">horaria</option>
            <option value="especial">Especiales</option>
          </select>
        </div>
      </div>
      <div class="column">
        <Checkbox name="casco" value="casco" bind:checked="{opciones.casco}">
          <i class="fas fa-hard-hat"></i>
          Casco
        </Checkbox>
      </div>
      <div class="column">
        <Checkbox name="barbijo" value="barbijo" bind:checked="{opciones.barbijo}">
          <i class="fas fa-head-side-mask"></i>
          Barbijo
        </Checkbox>        
      </div>
      <div class="column">
        <Checkbox name="chaleco" value="chaleco" bind:checked="{opciones.chaleco}">
          <i class="fas fa-vest"></i>
          Chaleco
        </Checkbox>        
      </div>

    </div>Filtros x fecha, tipo de alerta, camara y elementos
  </ExpansionPanel>
  
  <table class="table is-fullwidth">
    <thead>
      <tr>
        <th>Fecha</th>
        <th><i class="fas fa-bell mr-3"></i>Tipo</th>
        <th>Camara</th>
        <th>Elemento</th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th>Fecha</th>
        <th><i class="fas fa-bell mr-3"></i>Tipo</th>
        <th>Camara</th>
        <th>Elemento</th>
      </tr>
    </tfoot>
    <tbody>
      {#if alertas.length > 0}
        {#each alertas as alerta, i}
            <Alertas eventType={'alerta'} alertType={alerta.tipo} {alerta} {i} />
        {/each} 
      {:else}
        No se registran alertas
      {/if}


    </tbody>
  </table> 
</div>
