<script>
  import { onMount } from 'svelte';
  import axios from 'axios';
  export let mode = "balance";

  export let camera = '';

    
  export let i;

  let det_barbijo = camera.det_barbijo;
  let det_casco = camera.det_casco;
  let det_chaleco = camera.det_chaleco;
  let det_persona = camera.det_persona;
  let active = camera.active;
  let alert_no_hard_hat = 0;
  let alert_no_facemask = 0;

  import { addToast } from '../stores'
  import { fade } from 'svelte/transition';
  import CamaraForm from "./CamaraForm.svelte";
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let checked = true;
  let date = new Date();
  let message = '';
  let visible = false;
  let timeout = 4;
  let type;
  let alertasXCamara;

  let group = '';

  const onchage = ({ detail }) => {
       console.log(detail.expanded ? 'open' : 'close', detail.name);
  };
  $: label = mode.toUpperCase();
  $: cssClass = getCssClass(mode);
  $: cssDisabled = camera.active ? '' : 'disabled' 
  $: det_persona = camera.det_persona

  function getCssClass(mode) {
    switch (mode) {
      case "balance":
        return "is-info";
      case "income":
        return "is-success";
      case "expenses":
        return "is-danger";
    }
  }

  let expand = false;
  expand = '';
  let editable = false;
  function enableEdit() {
    editable = !editable;
  }

  function saved(event) {
      visible = true;
      message = event.detail.message;
      type = event.detail.type;
      addToast({
        message: message,
        type: type,
        dismissible: true,
        timeout: 3000,
        });
      expand = false;
      dispatch('toast');
    }

  function cancelar(event) {
    expand = false;
  }

  async function getAlertsByCamera() {
    const path = "/api/alertas/camaras"

      const camara = camera.id
      const site = camera.site    
      const { data } = await axios.post(path, {camara:camara, site:site});  
//        console.log(83, data)
      return data  
  }


  
  onMount(async () => {
      alertasXCamara = await getAlertsByCamera()
      let cause_alert = alertasXCamara.reduce((r, a) => {
        r[a.alert_cause] = [...r[a.alert_cause] || [], a];
        if (a.alert_cause == 'no hard hat') alert_no_hard_hat++
        if (a.alert_cause == 'no facemask') alert_no_facemask++
        return r;
        }, {});
      
  //    console.log(91,alertasXCamara, cause_alert, alert_no_hard_hat)
    });


  function toggleConfig() {
    expand = !expand
  }
  function estado(element) {
        if (element) {
            return ''
        } else {
            return 'disabled'
        }
    }
  </script>
  
<style>

  .disabled {
      pointer-events: none;
      opacity: 0.4;
  }
  
  .editar {
    pointer-events: visiblePainted;
  }

  .message {
    background-color: #1976d2;
  }

  </style>

<div class="card" >
  <header class="card-header" on:click={toggleConfig}>
    <p class="card-header-title mr-4  {cssDisabled} ">
      <i class="fas fa-video mr-3">  </i>
        {camera.site}:{camera.id}   
        <i class="fas fa-male ml-6 {estado(det_persona)}"></i>
        <i class="fas fa-hard-hat ml-3 {estado(det_casco)}">
          {#if alert_no_hard_hat}<span class="tag is-danger">{alert_no_hard_hat}</span>{/if}
        </i>
        <i class="fas fa-head-side-mask ml-3 {estado(det_barbijo)}">
          {#if alert_no_facemask}<span class="tag is-danger">{alert_no_facemask}</span>{/if}
        </i>  
        <i class="fas fa-vest ml-3 {estado(det_chaleco)}"></i>
        
        
    </p>
    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        {#if expand}
          <i class="fas fa-angle-up" aria-hidden="true"></i>
        {:else}
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        {/if}
      </span>
    </button>
  </header>

  {#if expand}
  <div class="card-content"  transition:fade="{{ duration: 200 }}">
      <div class="notification {cssClass} {cssDisabled} editar is-light">
        <div class="editable">
          <CamaraForm on:toast={saved} on:cancelar={cancelar} {camera} {editable} {i} accion="editar"></CamaraForm>
        </div>
    </div>
  </div>
  {/if}
</div>