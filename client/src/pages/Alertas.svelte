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
import { empty } from "svelte/internal";

export let params = {}

    let id = '';
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
    let barbijo = false;
    let chaleco = false;
    let casco = false
    let query = $querystring;
    let detalle
    $: alertas = [];
    $: opciones.det_persona;
    $: mostrando = alertas.length
    $: disabled = (feed == '' || id == '');
    $: barbijo = opciones.filter.no_facemask_count
    $: chaleco = opciones.filter.no_vest_count
    $: casco = opciones.filter.no_hardhat_count

    
    let opciones = {pagination: { limit: 15, page: 1 }, filter: {}};
    if (!$config.alerta_umbral_detection) {
        $config.alerta_umbral_detection = 10
    }
//console.log(46, params)
    if (params._id) {
      opciones.params = params
      detalle = true
    }
    const parseParams = (querystring) => {

      // parse query string
      const params = new URLSearchParams(querystring);

      const obj = {};

      // iterate over all keys
      for (const key of params.keys()) {
          if (params.getAll(key).length > 1) {
              obj[key] = params.getAll(key);
          } else {
              obj[key] = params.get(key);
          }
      }
      return obj;
    };

    let queries = parseParams(query)
 //   console.log(68, queries,params)
    let path = "/api/alertas/"
    if (Object.keys(queries).length > 0) {
        opciones.query = {_id: queries}
        path = "/api/alertas/notificaciones"
        detalle = true
      }  

    async function getAlerts() {
      
      if (params._id) path = "/api/alertas/notificaciones"
//console.log(83, path)
          
      const { data } = await axios.post(path, {opciones});    
      
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
      console.log(95, detalle)
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
      console.log('opciones: ', opciones.filter)
      if (queries) {
        opciones.query = {_id: queries}
        detalle = true
      }  
      if (barbijo) {
          opciones.filter.no_facemask_count = {$gte: $config.alerta_umbral_detection};
      } else {
        delete opciones.filter.no_facemask_count
      }

      if (chaleco) {
          opciones.filter.no_vest_count = {$gte: $config.alerta_umbral_detection};
      } else {
        delete opciones.filter.no_vest_count
      }
      
      if (casco) {
        opciones.filter.no_hardhat_count = {$gte: $config.alerta_umbral_detection}
      } else{
        delete opciones.filter.no_hardhat_count
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

    function toggle_casco() {
      casco = !casco
      filtrar()
    } 

    function toggle_barbijo() {
      barbijo = !barbijo
      filtrar()
    }

    function toggle_chaleco() {
      chaleco = !chaleco
      filtrar()
    }    
</script>
    

<div class="container">
  {#if (!detalle)}
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
      </div>  
      <div class="columns">
        <div class="column is-one-quarter">
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
        </div>
        <div class="column is-one-quarter">
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
        <div class="column is-one-quarter">
          <div on:click={toggle_casco}>
            {#if casco}
              <i class="fas fa-toggle-on"></i>
              <i class="fas fa-hard-hat ml-3"></i>  
                Casco?
            {:else}
              <i class="fas fa-toggle-off"></i>
              <i class="fas fa-hard-hat ml-3 disabled"></i>  
                Casco?  
            {/if}
          </div>
        </div>
        <div class="column is-one-quarter">
          <div on:click={toggle_chaleco}>
            {#if chaleco}
              <i class="fas fa-toggle-on"></i>
              <i class="fas fa-vest ml-3"></i>  
                Chaleco?
            {:else}
              <i class="fas fa-toggle-off"></i>
              <i class="fas fa-vest ml-3 disabled"></i>  
                Chaleco?  
            {/if}
          </div>
        </div>

      </div>
    </GenericCard>
  {/if}
  {#if loading}
    <Loading />
  {:else}
      <!--div >mostrando: {mostrando} de {totalDocs} alertas</div--> 
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
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th><i class="far fa-calendar-alt mr-3"></i>Fecha</th>
            <th><i class="fas fa-video mr-3"></i>Sitio/Camara</th>
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
              <Alertas eventType={'alerta'} {detalle} alertType={alerta.tipo} {alerta} {i} />
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
