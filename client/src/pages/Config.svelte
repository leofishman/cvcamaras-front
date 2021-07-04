<script>
    import axios from "axios";
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
      pageAction,
      config,
    } from "../stores";
    import { ExpansionPanel, Modal, Button, Datepicker, Sidepanel, Dialog, Snackbar, Checkbox } from 'svelte-mui';

    import { text } from "svelte/internal";
import { get } from "svelte/store";
  
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
      $pageAction = "Configuración";
      loading = true;
      getCameras();
      getConfig();
      loading = false;
    });
  
    async function getConfig() {
      const  {data} = await axios.get("/api/config/");
      $config = data;
      $config = data;
    }
    async function getCameras() {
      const { data } = await axios.get("/api/config/cameras");
      $cameras = data;
    }
    async function addCamera() {
      const camera = {
        id: id,
        idn: idn,
        feed: feed,
        fps: fps,
        det_barbijo: det_barbijo,
        det_casco: det_casco,
        det_chaleco: det_chaleco,
        frames_capt: frames_capt,
        active: active,  
      };
      
      const response = await axios.post("/api/config/cameras", camera);
      $cameras = [response.data, ...$cameras];
      input = 0;
    }


    async function removeTransaction(id) {
      const response = await axios.delete("/api/transactions/" + id);
      if (response.data.id === id) {
        $transactions = $transactions.filter(t => t._id !== id);
      }
    }

    function getType(type) {
      
      let tipo = typeof type;
      switch(tipo) {
        case "string": 
          tipo = "text";
          break;
        case "boolean":
          tipo = "boolean";
          break;
        case "number":
          tipo = "number";
          break;
        
        default:
          tipo = "text";
      }
      return tipo;
    }

</script>
  
<style>
  .app {
    margin: 40px auto;
  }
</style>
 

{#if loading}
  <Loading />
{/if}



<div class="app container">
  <div class="conf-alertas">

       {#if $config.length > 0}
    <ExpansionPanel name="Configuraciones Globales">
        {#each $config as configuracion, i }
          <div class="column is-4">

            <div class="columns">
              <div class="column is-8">
                <label>{configuracion['key']}: </label>
              </div>
              <div class="column is-4">
                {configuracion['value']}
              </div>
            </div>
          </div>
        {/each} 
    </ExpansionPanel>
    {/if} 
    <div class="field">
      <p class="control">
        <label>Tiempo de generacion de alerta</label>
        <input
          class="input"
          type="text"
          bind:value={config.trigeralert}
          placeholder="tiempo de alerta" />
          Cuanto tiempo del evento genera una alerta?
      </p>
    </div>
  </div>



  {#if $cameras.length > 0}
    {#each $cameras as camera}  
      <CamaraCard {camera} id={camera.id} idn={camera.idn} feed={camera.feed} fps={camera.fps} det_barbijo={camera.det_barbijo} det_casco={camera.det_casco} det_chaleco={camera.det_chaleco} frames_capt={camera.frames_capt} active={camera.active} } />
    {/each}
  {:else if !loading}
    <div class="notification">Agregue la primera camera</div>
  {/if}

  
  <div class="add-camera">
    <ExpansionPanel name="Agregue una camara">
      <div class="form_add_camera">
        <div class="field">
          <p class="control">
            <input
              class="input"
              type="text"
              bind:value={id}
              placeholder="Id de la camara" />
              ID de la Camara
          </p>
        </div>
        <div class="field">
          <p class="control">
            <input
              class="input"
              type="text"
              bind:value={feed}
              placeholder="rtsp live de la camara" />
              Feed
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label>
            <input type=number bind:value={idn} placeholder="IDn">
            valor de idn
          </label>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label>
            <input type=number bind:value={fps} placeholder="fps">
            FPS
          </label>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label>
              <input type=checkbox  bind:checked={det_barbijo }>
              Detectar Barbijo?
            </label>
          </p>
        </div> 
        <div class="field">
          <p class="control">
            <label>
              <input type=checkbox  bind:checked={det_casco}>
              Detectar Casco?
            </label>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label>
              <input type=checkbox  bind:checked={det_chaleco}>
              Detectar Chaleco?
            </label>
          </p>
        </div>    
        <div class="field">
          <p class="control">
            <label>
            <input type=number bind:value={frames_capt} placeholder="frames capt">
            Frames Capt
          </label>
          </p>
        </div>    
        <div class="field">
          <p class="control">
            <label>
              <input type=checkbox  bind:checked={active}>
              Activa
            </label>
          </p>
        </div>

        <div class="field">
          <p class="control">
            <button class="button" on:click={addCamera} {disabled}>Agregar Camara</button>
          </p>
        </div>
      </div>
    </ExpansionPanel>
  </div>
</div>
  