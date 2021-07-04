<script>
    import {
      transactions,
      sortedTransactions,
      income,
      expenses,
      balance,
      title,
      cameras,
    } from "../stores";

    import axios from "axios";
    import { createEventDispatcher } from 'svelte'
    export let accion;
    export let i;
    export let camera;
    export let editable = true;
    $: disabled = (camera.feed == '' || camera.id == '');

    const dispatch = createEventDispatcher();

    async function postCamera() {
      const response = await axios.post("/api/config/cameras/update", camera);
        $cameras[i] = response.data
        editable = false;
        disabled = true;
        dispatch('saved')

    }
</script>

<div class="form_add_camera ">
    <div class="title">{accion} camara {camera.id}</div>
    <div class="field">
      <p class="control">
        <input
          class="input"
          type="text"
          bind:value={camera.id}
          placeholder="Id de la camara" />
          ID de la Camara
      </p>
    </div>
    <div class="field">
      <p class="control">
        <label on:click={camera.det_barbijo = !camera.det_barbijo}>
          <input type=checkbox  bind:checked={camera.det_barbijo }>
          {#if camera.det_barbijo}
            <i class="fas fa-head-side-mask ml-3"></i>  
             Detectar Barbijo?
            <i class="fas fa-toggle-on"></i>
          {:else}
            <i class="fas fa-head-side-mask ml-3 disabled"></i>  
            Detectar Barbijo?
            <i class="fas fa-toggle-off"></i>
          {/if}
        </label>
      </p>
    </div> 
    <div class="field">
      <p class="control">
        <label on:click={camera.det_casco = !camera.det_casco}>
          <input type=checkbox  bind:checked={camera.det_casco }>
          {#if camera.det_casco}
            <i class="fas fa-hard-hat ml-3"></i>  
             Detectar Casco?
            <i class="fas fa-toggle-on"></i>
          {:else}
            <i class="fas fa-hard-hat ml-3 disabled"></i>  
            Detectar Casco?
            <i class="fas fa-toggle-off"></i>
          {/if}
        </label>
      </p>
    </div> 
    <div class="field">
      <p class="control">
        <label on:click={camera.det_chaleco = !camera.det_chaleco}>
          <input type=checkbox  bind:checked={camera.det_chaleco }>
          {#if camera.det_chaleco}
            <i class="fas fa-vest ml-3"></i>  
             Detectar Chaleco?
            <i class="fas fa-toggle-on"></i>
          {:else}
            <i class="fas fa-vest ml-3 disabled"></i>  
            Detectar Chaleco?
            <i class="fas fa-toggle-off"></i>
          {/if}
        </label>
      </p>
    </div> 
    <div class="field">
      <p class="control">
        <input
          class="input"
          type="text"
          bind:value={camera.feed}
          placeholder="rtsp live de la camara" />
          Feed
      </p>
    </div>
    <div class="field">
      <p class="control">
        <label>
        <input type=number bind:value={camera.idn} placeholder="IDn">
        valor de idn
      </label>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <label>
        <input type=number bind:value={camera.fps} placeholder="fps">
        FPS
      </label>
      </p>
    </div>


    <div class="field">
      <p class="control">
        <label>
        <input type=number bind:value={camera.frames_capt} placeholder="frames capt">
        Frames Capt
      </label>
      </p>
    </div>    
    <div class="field">
      <p class="control">
        <label>
          <input type=checkbox  bind:checked={camera.active}>
          Activa
        </label>
      </p>
    </div>
    <footer class="card-footer is-flex">
      <div class="field flex-wrap">
        <p class="control is-flex-direction-row">
          <button class="button " on:click={postCamera} {disabled}>Grabar</button>
          <button class="button" on:click={postCamera} {disabled}> Borrar</button>
          <button class="button" on:click={postCamera} {disabled}> Cancelar</button>
        </p>
      </div>
    </footer>
      
</div>
<style>
    .disabled {
      opacity: 0.4;
  }
</style>