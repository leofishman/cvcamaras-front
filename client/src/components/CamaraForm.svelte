<script>
    import {
      cameras,
      addToast
    } from "../stores";

    import axios from "axios";
    import { createEventDispatcher } from 'svelte';
    export let accion = 'agregar';
    export let i;
    export let camera = {};
    export let editable = true;
    $: disabled = (camera.feed == '' || camera.id == '');

    const dispatch = createEventDispatcher();

    async function updateCamera() {
      const response = await axios.post("/api/config/cameras/update", camera);
        $cameras[i] = response.data
        editable = false;
        disabled = true;
        dispatch('toast', {message:'La camara ' + camera.id + ' a sido actualizada', type:'info', element: camera.id})
    }

    async function addCamera() {

      
      const response = await axios.post("/api/config/cameras", camera);
      if (response.status == 200) {
        $cameras = [response.data, ...$cameras];
        addToast({
          message: 'La camara ' + response.data.id + ' a sido agregada',
          type: 'info',
          dismissible: true,
          timeout: 3000,
        });
      }      
    }

    async function handleSave() {
      if (accion == 'agregar') {
        addCamera()
      } else {
        updateCamera()
      }

    }

    async function removeCamera(camera) {
      const response = await axios.delete("/api/config/cameras/delete/" + camera._id);
      if (response.data.id === camera._id) {
        $cameras = $cameras.filter(c => c._id !== camera._id);
       
      }
      editable = false;
      disabled = true;
      dispatch('toast', {message:'La camara ' + camera.id + ' a sido eliminada', type:'error', element: camera.id})
    }

    function cancelar() {
      dispatch('cancelar');
    }

</script>

<div class="form_camera ">
    <div class="title">{accion} camara {camera.id}</div>
    <div class="field">
      <p class="control">
        <label>
          <input type=checkbox  bind:checked={camera.active}>
          Activa
        </label>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <input
          class="input"
          type="text"
          bind:value={camera.id}
          placeholder="Id de la camara" />
          ID de la Camara (nombre)
      </p>
    </div>
    <div class="field">
      <p class="control">
        <input
          class="input"
          type="text"
          bind:value={camera.site}
          placeholder="Sitio de la camara" />
          Sitio de la Camara (Ubicación física)
      </p>
    </div>
    
    <div class="field">
      <p class="control">
        <label on:click={camera.det_persona = !camera.det_persona}>
          <input type=checkbox  bind:checked={camera.det_persona }>
          {#if camera.det_persona}
            <i class="fas fa-male ml-3"></i>  
             Detectar persona?
            <i class="fas fa-toggle-on"></i>
          {:else}
            <i class="fas fa-male ml-3 disabled"></i>  
            Detectar persona?
            <i class="fas fa-toggle-off"></i>
          {/if}
        </label>
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
 
    <footer class="card-footer is-flex">
      <div class="field flex-wrap">
        <p class="control is-flex-direction-row">
          <button class="button " on:click={handleSave} {disabled}>Grabar</button>
          <button class="button" on:click={removeCamera(camera)} {disabled}> Borrar</button>
          <button class="button" on:click={cancelar} > Cancelar</button>
        </p>
      </div>
    </footer>
      
</div>
<style>
    .disabled {
      opacity: 0.4;
  }
</style>