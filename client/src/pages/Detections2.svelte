
<script>
    import axios from "axios";
    import Detection from "../components/Detection.svelte"
    import { querystring } from "svelte-spa-router";
    import Loading from "../components/Loading.svelte";
    import { ExpansionPanel, Modal, Button, Datepicker, Sidepanel, Dialog, Snackbar, Checkbox } from 'svelte-mui';
    import { onMount } from "svelte";
    
    import {
      cameras,
      pageAction
    } from "../stores";
  
    let loading = false;
    let detections, head;
    // $: disabled = (feed == '' || id == '');
    //$: detections = '';
  //  $: mostrando = detections.length
    let opciones = {};
    let totalDocs, hasNextPage, hasPrevPage, limit, nextPage, page, pagingCounter, prevPage, totalPages;
    let mostrando = 0;


    async function getHead() {
      const { data } = await axios.post("/api/detections/head", {opciones});
      const base64Flag = 'data:image/jpeg;base64,';
      head = base64Flag + atob(data)
      return head
    }

    async function getDetections() {

      const { data } = await axios.post("/api/detections/", {opciones});
console.log(43, data)
      totalDocs = data.totalDocs
      hasNextPage = data.hasNextPage
      hasPrevPage = data.hasPrevPage
      page = data.page
      mostrando = data.docs.length
      
      return data.docs
    }
  

    onMount(async () => {
      $pageAction = 'Detecciones';
      loading = true;
      let detections = await getDetections();
      head = await getHead()
      if (detections.length > 0) {
              loading = false;
      }
    });

    async function filtrar() {
      loading = true;
      detections = await getDetections();
      loading = false;
    }

    function estado(elemento) {
      if (!elemento) {
        return 'disabled'
      }
    }

    async function handlePagination(handle) {
      if (handle == ('next')) {
        page++
        opciones = {page}
      loading = true;
      detections = await getDetections();
      loading = false;
      }

    }
</script>

  <div class="container">
    11<img src="{head}">22
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
            <select bind:value="{opciones.source}">Camara
              {#each $cameras as camera, i}
                <option value="{camera.id}">{camera.id} </option>
              {/each}
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
  </div>
{#if loading}
  <Loading />
{:else}

<div class="container">
  <div >mostrando: {mostrando} de {totalDocs} detecciones</div> 
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th><i class="far fa-calendar-alt mr-3"></i>Fecha</th>
          <th><i class="fas fa-bell mr-3"></i>Tipo</th>
          <th><i class="fas fa-video mr-3"></i>Camara</th>
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
        {#if (mostrando > 1)}
          {#each detections as detection, i}
            <Detection {detection} {i}></Detection>
          {:else}
            No se registrarion detecciones
          {/each}
        {/if}


      </tbody>
    </table> 
  </div>
  {#if detections}
    <nav class="pagination" role="navigation" aria-label="pagination">
      <a class="pagination-previous {estado(hasPrevPage)}"> anterior </a>
      <a class="pagination-next {estado(hasNextPage)}" on:click={handlePagination('next')}> proxima </a>
      <ul class="pagination-list">
        <li>
          <a class="pagination-link" aria-label="Ir a pagina 1">1</a>
        </li>
        <li>
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
      
        <li>
          <span class="pagination-ellipsis">&hellip;</span>
        </li>

      </ul>
    </nav>
    {/if}
{/if}


<style>
  .disabled {
      pointer-events: none;
      opacity: 0.4;
  } 
  
</style>

