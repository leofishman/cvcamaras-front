<script>
    import axios from "axios";
    import Alertas from "../components/Alertas.svelte"
    import { querystring } from "svelte-spa-router";
    import Loading from "../components/Loading.svelte";
    import { onMount } from "svelte";   
    import {
      cameras,
      config,
      pageAction
    } from "../stores";
    import GenericCard from "../components/GenericCard.svelte"
    import Pagination from "../components/Pagination.svelte"

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
    let barbijo = false
    let query = $querystring;
    $: alertas = [];
    $: opciones.det_persona;
    $: mostrando = alertas.length
    $: disabled = (feed == '' || id == '');
    $: barbijo = opciones.filter.no_facemask_count

    let opciones = {pagination: { limit: 6, page: 1 }, filter: {}};
    if (!$config.alerta_umbral_detection) {
        $config.alerta_umbral_detection = 10
    }
    /* TODO: remove querystring if not used!!! 
    let queries = query.split("&");
    if (queries.length > 1) {
      queries.forEach(element => {
        opciones[element.split("=")[0]] = element.split("=")[1]
      });
    }
*/
    console.log(48, $config.alerta_umbral_detection)
    async function getAlerts() {
      const { data } = await axios.post("/api/alertas/", {opciones});
      opciones.filter = data[1]
      totalDocs = data[0].totalDocs
      hasNextPage = data[0].hasNextPage
      hasPrevPage = data[0].hasPrevPage
      limit = data[0].limit
      nextPage = data[0].nextPage
      page = data[0].page
      pagingCounter = data[0].pagingCounter
      prevPage = data[0].prevPage
      totalPages = data[0].totalPages
      return data[0].docs
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
      if (barbijo) {
          opciones.filter = {no_facemask_count: {$gte: $config.alerta_umbral_detection}};
          delete opciones.barbijo;
      } else {
        delete opciones.filter.no_facemask_count
      }
       
      opciones.filter = clean(opciones.filter)
      opciones.pagination.page = 1
      loading = true;
      alertas = await getAlerts()
      loading = false;
      $pageAction = 'Alertas';
    }

    async function paginar(page) {
      opciones.pagination.page = page.page
      loading = true;
      alertas = await getAlerts()
      loading = false;
    }

    function toggle_det_persona() {
      opciones.det_persona = !opciones.det_persona
      filtrar()
    }

    function toggle_barbijo() {
      barbijo = !barbijo
      filtrar()
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
      {#if 1==2}
        <div class="column">
          <div class="select">
            <select bind:value="{opciones.tipo}">Tipo de Alerta
              <option value="">Todas</option>
              <option value="inmediata">Inmediata</option>
              <option value="dia">Diaria</option>
              <option value="hora">horaria</option>
              <option value="especial">Especiales</option>
            </select>
          </div>
        </div>
      {/if}
      <div class="column">
        <div on:click={toggle_barbijo}>
          {#if barbijo}
            <i class="fas fa-toggle-on"></i>
            <i class="fas fa-head-side-mask ml-3"></i>  
              Barbijo?
          {:else}
            <i class="fas fa-toggle-off"></i>
            <i class="fas fa-head-side-mask ml-3 disabled"></i>  
            Barbijo?
          {/if}
        </div>
        <!--input type="checkbox" name="casco" value="casco" bind:checked="{opciones.casco}">
          <i class="fas fa-hard-hat"></i-->
          
      </div>
      <div class="column">
        <div on:click={toggle_det_persona}>
          {#if opciones.det_persona}
            <i class="fas fa-toggle-on"></i>
            <i class="fas fa-male ml-3"></i>  
              Persona?
          {:else}
            <i class="fas fa-toggle-off"></i>
            <i class="fas fa-male ml-3 disabled"></i>  
              Persona?  
          {/if}
        </div>
      </div>

      <!--div class="column">
        <input type="checkbox" name="chaleco" value="chaleco" bind:checked="{opciones.chaleco}">
          <i class="fas fa-vest"></i>
          Chaleco
      </div-->

    </div>Filtros x fecha
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
        on:change="{(ev) => paginar({page: ev.detail})}">
      ></Pagination>
    {/if}
  {/if}
    
</div>
