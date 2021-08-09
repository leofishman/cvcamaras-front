<script>
    import axios from "axios";
    import CamaraCard from "../components/CameraCard.svelte"
    import CamaraForm from "../components/CamaraForm.svelte"
    import Loading from "../components/Loading.svelte";
    import { onMount } from "svelte";
    import { fade } from 'svelte/transition';
    import {
      cameras,
      pageAction,
      config,
      addToast,
    } from "../stores";
    import { createEventDispatcher } from 'svelte';
    import GenericCard from "../components/GenericCard.svelte"

    const dispatch = createEventDispatcher();
    let id, feed = '';
    let det_barbijo = true;
    let det_casco = true;
    let det_chaleco = false;
    let frames_capt = 50;
    let active = true;
    let loading = false;
    let addCameraExpand = false;
    let configLocal = {};


    $: cssDisabled = configLocal.smtp_enable ? '' : 'disabled' 

    let editable = false;
      function enableEdit() {
        editable = !editable;
      }

    onMount(async () => {
      $pageAction = "Configuración";
      loading = true;
      getCameras();
      getConfig();
      loading = false;
    });
  
    async function getConfig() {
      const  {data} = await axios.get("/api/config/")
      $config = data
      if (!$config.alerta_umbral_detection) {
        $config.alerta_umbral_detection = 10
      }
      if (!$config.alertas_precision) {
        $config.alertas_precision = 90
      }
      if (!$config.send_alerts_every_n_minutes) {
        $config.send_alerts_every_n_minutes = 1
      }
      
      configLocal = $config
    }

    async function actualizarConfiguraciones () {
      const igual = $config != configLocal
      if ($config == configLocal) {
         const response = await axios.put("/api/config", configLocal)
        $config = response.data

        addToast({
          message: 'Configuración actualizada',
          type: 'info',
          dismissible: true,
          timeout: 3000,
          });
        dispatch('toast');
      }

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
      if (response.status == 200) {
        $cameras = [response.data, ...$cameras];
        addToast({
          message: 'La camara ' + response.data.id + ' a sido agregada',
          type: 'info',
          dismissible: true,
          timeout: 3000,
        });
        addCameraExpand = false;
      }
      
    }

    function toggleAddCamera () {
      addCameraExpand = !addCameraExpand;
    }

    function cancelar(event) {
      addCameraExpand = false;
    }

    function saved(event) {
      message = event.detail.message || '';
      type = event.detail.type || '';
      addToast({
        message: message,
        type: type,
        dismissible: true,
        timeout: 3000,
        });
      addCameraExpand = false;
      dispatch('toast');
    }

</script>
  
<style>
  .app {
    margin: 40px auto;
  }
  .disabled {
      opacity: 0.4;
  }
</style>

{#if loading}
  <Loading />
{/if}

<div class="app container">
  <div class="conf-alertas">
    {#if $config.length > 0}
      <GenericCard header="Configuraciones Globales">
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
      </GenericCard>
    {/if} 
    <div class="field">
      <p class="control">
        <label>Email de alertas</label>
        <input
          class="input"
          type="email"
          bind:value={configLocal.alertas_email}
          placeholder="alertas@mail.com" />
          A que direccion de email se envian las alertas
      </p>
    </div>
    <div class="field">
      <p class="control">
        <label>Telefono/Telegram de alertas</label>
        <input
          class="input"
          type="number"
          bind:value={configLocal.alertas_telefono}
          placeholder="Telefono / Telegram que se envian las alertas" />
          Telefono / Telegram que se envian las alertas
      </p>
    </div>
    <div class="field">
      <p class="control">
        <label>Umbral precision para detectar alerta</label>
        <input
          class="input"
          type="number"
          bind:value={configLocal.alertas_precision}
          placeholder="tiempo de alerta" />
          Precision de la detección en porcentaje %?
      </p>
    </div>    
    <div class="field">
      <p class="control">
        <label>Umbral detecciones para generar alerta</label>
        <input
          class="input"
          type="number"
          bind:value={configLocal.alerta_umbral_detection}
          placeholder="tiempo de alerta" /> 
          Cuantos detecciones generan una alerta?
      </p>
    </div>
    <div class="field">
      <p class="control">
        <label>Lapso en minutos de generación de alertas</label>
        <input
          class="input"
          type="number"
          bind:value={configLocal.send_alerts_every_n_minutes}
          placeholder="lapso de alerta" /> 
          Cada cuanto tiempo se genera una alerta?
      </p>
    </div>
    
    <div class="config-smtp">
      <GenericCard header="smtp">
        <div class="field {cssDisabled}">
          <p class="control">
            <label>
              <input type=checkbox  bind:checked={configLocal.smtp_enable}>
              Habilitado
            </label>
          </p>
        </div>
        <div class="field">
          <p class="control">
            <label>Server:</label>
            <input
              class="input"
              type="text"
              bind:value={configLocal.smtp_server}
              placeholder="smtp.example.com" />
          </p>
        </div>        
        <div class="field">
          <p class="control">
            <label>Usuario:</label>
            <input
              class="input"
              type="text"
              bind:value={configLocal.smtp_user} />
          </p>
        </div>  
        <div class="field">
          <p class="control">
            <label>Password:</label>
            <input
              class="input"
              type="password"
              bind:value={configLocal.smtp_password} />
          </p>
        </div>  
        <div class="field">
          <p class="control">
            <label>Port:</label>
            <input
              class="input"
              type="number"
              bind:value={configLocal.smtp_port} />
          </p>
        </div>          
      </GenericCard>
    </div>
 
    <hr />
    <button on:click={actualizarConfiguraciones}>
      <i class="fas fa-save mr-3"></i>
      Actualizar Configuraciones
    </button>
  </div>


<hr />



  {#if $cameras.length > 0}
  <h5 class="title info"> Camaras</h5>
    {#each $cameras as camera, i}  
      <CamaraCard on:toast={saved}  {camera} {i} />
    {/each}
  {:else if !loading}
    <div class="notification">Agregue la primera camera</div>
  {/if}

  
  <div class="add-camera">
    <div class="card" >
      <header class="card-header" on:click={toggleAddCamera}>
        <p class="card-header-title editar mr-5">
          <button class="button">
            <i class="fas fa-plus mr-3"></i>
            Agregar Camara
          </button>
        </p>
        
      </header>
    
      {#if addCameraExpand}
        <div class="card-content"  transition:fade="{{ duration: 200 }}">
            <div class="notification  {cssDisabled} is-info editar is-light">

              <div class="editable">
                <CamaraForm on:toast={saved} on:cancelar={cancelar}  {editable} accion="agregar"></CamaraForm>
              </div>

          </div>
          
        </div>
      <!--

      
        <div class="card-content"  transition:fade="{{ duration: 200 }}">
            <div class="notification  editar is-light">
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
      
          </div>
          
        </div>
      -->
      {/if}

    </div>
  </div>
</div>
  