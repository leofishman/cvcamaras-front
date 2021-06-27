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
    export let accion;
    export let i;
    export let camera;
    $: disabled = (camera.feed == '' || camera.id == '');

    async function postCamera() {
      const response = await axios.post("/api/config/cameras/update", camera);
        $cameras[i] = response.data
    }
</script>

<div class="form_add_camera">
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
          <input type=checkbox  bind:checked={camera.det_barbijo }>
          Detectar Barbijo?
        </label>
      </p>
    </div> 
    <div class="field">
      <p class="control">
        <label>
          <input type=checkbox  bind:checked={camera.det_casco}>
          Detectar Casco?
        </label>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <label>
          <input type=checkbox  bind:checked={camera.det_chaleco}>
          Detectar Chaleco?
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
    <div class="field">
        <p class="control">
          <button class="button" on:click={postCamera} {disabled}>{accion} Camara</button>
        </p>
      </div>
</div>
