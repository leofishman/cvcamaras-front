<script>
    import axios from "axios";
    import Alertas from "../components/Alertas.svelte"
    import { querystring } from "svelte-spa-router";
    import Loading from "../components/Loading.svelte";
//    import { ExpansionPanel, Modal, Button, Datepicker, Sidepanel, Dialog, Snackbar, Checkbox } from 'svelte-mui';
    import { onMount } from "svelte";   
    import {
      cameras,
      pageAction
    } from "../stores";
    import GenericCard from "../components/GenericCard.svelte"

    let id = '';
    let idn = 0;
    let feed = '';
    let totalDocs;
    let limit;
    let page;
    let totalPages;
    let hasNextPage;
    let nextPage;
    let hasPrevPage;
    let prevPage;
    let pagingCounter;
    let loading = false;
    let query = $querystring;
    $: alertas = '';
    $: mostrando = alertas.length
    $: disabled = (feed == '' || id == '');

    let opciones = {}
    let queries = query.split("&");
    if (queries.length > 1) {
      queries.forEach(element => {
        opciones[element.split("=")[0]] = element.split("=")[1]
      });
    }

    async function getAlerts() {
      const { data } = await axios.post("/api/alertas/", {opciones});
      totalDocs = data.totalDocs
      return data.docs
    }    

    onMount(async () => {
      loading = true;
      alertas = await getAlerts()
      loading = false;
      $pageAction = 'Alertas';
    });

    function clean(obj) {
      for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '' || obj[propName] === false) {
          delete obj[propName];
        }
      }
      return obj
    }

    async function filtrar() {
      opciones = clean(opciones)
      loading = true;
      alertas = await getAlerts()
      loading = false;
      $pageAction = 'Alertas';
    }
</script>
    


<div class="container">
  <GenericCard header="Filtros">
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
            <option value="">Todas</option>
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
            <option value="">Todas</option>
            <option value="inmediata">Inmediata</option>
            <option value="dia">Diaria</option>
            <option value="hora">horaria</option>
            <option value="especial">Especiales</option>
          </select>
        </div>
      </div>
      <div class="column">
        <input type="checkbox" name="casco" value="casco" bind:checked="{opciones.casco}">
          <i class="fas fa-hard-hat"></i>
          Casco
      </div>
      <div class="column">
        <input type="checkbox" name="barbijo" value="barbijo" bind:checked="{opciones.barbijo}">
          <i class="fas fa-head-side-mask"></i>
          Barbijo     
      </div>
      <div class="column">
        <input type="checkbox" name="chaleco" value="chaleco" bind:checked="{opciones.chaleco}">
          <i class="fas fa-vest"></i>
          Chaleco
                
      </div>

    </div>Filtros x fecha, tipo de alerta, camara y elementos
  </GenericCard>
  {#if loading}
    <Loading />
  {:else}
      <div >mostrando: {mostrando} de {totalDocs} alertas</div> 
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th><i class="far fa-calendar-alt mr-3"></i>Fecha</th>
            <th><i class="fas fa-video mr-3"></i>Camara</th>
            <th><i class="fas fa-bullhorn mr-3"></i>Cantidad</th>
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
            <tr>
              <td>
                No se registran alertas
              </td>
            </tr>

        {/if}


      </tbody>
    </table> 
  {/if}
    
</div>
