<script>
    import axios from "axios";
    import Detection from "../components/Detection.svelte"
    import Loading from "../components/Loading.svelte";
    import Pagination from "../components/Pagination.svelte"
    import GenericCard from "../components/GenericCard.svelte"
    import { onMount } from "svelte";
    
    import {
      cameras,
      pageAction
    } from "../stores";

    let loading = false;
    let detections, head;
    let opciones = {limit: 6, page: 1};
    let totalDocs, hasNextPage, hasPrevPage, limit, nextPage, page, pagingCounter, prevPage, totalPages;
    let mostrando = 0;
    
   // $:detections = '';
  //  $:mostrando = detections.length

    async function getDetections() {
      const { data } = await axios.post("/api/detections/", {opciones});
      totalDocs = data.totalDocs
      hasNextPage = data.hasNextPage
      hasPrevPage = data.hasPrevPage
      limit = data.limit
      nextPage = data.nextPage
      page = data.page
      pagingCounter = data.pagingCounter
      prevPage = data.prevPage
      totalPages = data.totalPages
      mostrando = data.docs.length
      detections = data.docs
      return data.docs
    }

    async function getHead(frame_id) {
      //TODO: query head by frame_id
      const { data } = await axios.post("/api/detections/head", {opciones});
      const base64Flag = 'data:image/jpeg;base64,';
      head = base64Flag + atob(data)
      return head
    }

    async function filtrar(filtro) {
      opciones.page = filtro.page
      loading = true;
      detections = await getDetections();
      loading = false;
    }

    function estado(elemento) {
      if (!elemento) {
        return 'disabled'
      }
    }

    
    onMount(async () => {
      $pageAction = 'Detecciones';
      loading = true;
      detections = await getDetections();
      loading = false;
    });
    

</script>


{#if loading}
  <Loading />
{:else}
<div class="container">
  <div >mostrando: {mostrando} de {totalDocs} detecciones</div> 

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
            <select bind:value="{opciones.source}">Camara
              {#each $cameras as camera, i}
                <option value="{camera.id}">{camera.id} </option>
              {/each}
            </select>
          </div>
        </div>
        <div class="column">
          <input type="checkbox" name="person" value="person" bind:checked="{opciones.person}">
            <i class="fas fa-male"></i>
            Casco
        </div>
        <div class="column">
          <input type="checkbox"  name="casco" value="casco" bind:checked="{opciones.casco}">
            <i class="fas fa-hard-hat"></i>
            Casco
        </div>
        <div class="column">
          <input type="checkbox"  name="barbijo" value="barbijo" bind:checked="{opciones.barbijo}">
            <i class="fas fa-head-side-mask"></i>
            Barbijo     
        </div>
        <div class="column">
          <input type="checkbox"  name="chaleco" value="chaleco" bind:checked="{opciones.chaleco}">
            <i class="fas fa-vest"></i>
            Chaleco     
        </div>

      </div>Filtros x fecha, tipo de alerta, camara y elementos
    </GenericCard>
    <div class="b-table">
      <div class="table-wrapper has-mobile-cards">
        <table class="table is-fullwidth is-striped is-hoverable">
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
    </div> 
  </div>
  {#if totalDocs > limit}
    <Pagination
      {page}
      {totalPages}
      {hasNextPage}
      {hasPrevPage}
      {limit}
      {nextPage}
      {pagingCounter}
      {prevPage}
      {totalDocs}
      on:change="{(ev) => filtrar({page: ev.detail})}">
    ></Pagination>
  {/if}
  
{/if}

<style>
  .disabled {
      pointer-events: none;
      opacity: 0.4;
  } 
  
</style>