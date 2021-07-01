<script>
    import axios from "axios";
    import Transaction from "../components/Transaction.svelte";
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
    } from "../stores";
    import { ExpansionPanel, Modal, Button, Datepicker, Sidepanel, Dialog, Snackbar, Checkbox } from 'svelte-mui';

    import { text } from "svelte/internal";
  
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
      loading = true;
      const { data } = await axios.get("/api/config/cameras");
      $cameras = data;
      loading = false;
    });
  
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
</script>
  
<style>
  .app {
    margin: 40px auto;
  }
</style>
  
<div class="app container">
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



  {#if loading}
    <Loading />
  {/if}

  {#if $cameras.length > 0}
    {#each $cameras as camera}
    
      <CamaraCard id={camera.id} idn={camera.idn} feed={camera.feed} fps={camera.fps} det_barbijo={camera.det_barbijo} det_casco={camera.det_casco} det_chaleco={camera.det_chaleco} frames_capt={camera.frames_capt} active={camera.active} } />
    {/each}
  {:else if !loading}
    <div class="notification">Add your first camera</div>
  {/if}

  {#each $sortedTransactions as transaction (transaction._id)}
    <Transaction {transaction} {removeTransaction} />
  {/each}

</div>
  