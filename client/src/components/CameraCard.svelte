<script>
  import { onMount } from 'svelte';

  export let mode = "balance";

  export let id = '';
  export let idn = 0;
  export let feed = '';
  export let fps = 1;
  export let det_barbijo = true;
  export let det_casco = true;
  export let det_chaleco = false;
  export let frames_capt = 50;
  export let active = true;  
  export let i;
  export let camera;
 
  import { addToast } from '../stores'
  import { fade } from 'svelte/transition';
  import CamaraForm from "./CamaraForm.svelte";

  let checked = true;
  let date = new Date();
  let message = '';
  let visible = false;
  let timeout = 4;
  let type;

  let group = '';

  const onchage = ({ detail }) => {
       console.log(detail.expanded ? 'open' : 'close', detail.name);
  };
  $: label = mode.toUpperCase();
  $: cssClass = getCssClass(mode);
  $: cssDisabled = active ? '' : 'disabled' 

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


  // For now I open only the first panel, latter I can open any panel with alerts
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
    }

  function cancelar(event) {
    expand = false;
  }

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
        {id}: {idn} 
        <i class="fas fa-hard-hat ml-6 {estado(det_casco)}"></i>
        <i class="fas fa-head-side-mask ml-3 {estado(det_barbijo)}"></i>  
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