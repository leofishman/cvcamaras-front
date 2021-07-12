
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
    let detections;
    // $: disabled = (feed == '' || id == '');
    $: detections = '';
    $: mostrando = detections.length
    let opciones = {};
    let totalDocs;


    async function getDetections() {
      const { data } = await axios.post("/api/detections/", {opciones});
      totalDocs = data.totalDocs
      return data.docs
    }

    onMount(async () => {
      $pageAction = 'Detecciones 😷 ';
      loading = true;
      detections = await getDetections();
      loading = false;
    });
    
    // optional import focus-visible polyfill only once
    import 'focus-visible';

    async function filtrar() {
      loading = true;
      detections = await getDetections();
      loading = false;
    }
</script>

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
            <select bind:value="{opciones.source}">Camara
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
        {#each detections as detection, i}
          <Detection {detection} {i}></Detection>
        {:else}
          No se registrarion detecciones
        {/each}



      </tbody>
    </table> 
  </div>
{/if}


