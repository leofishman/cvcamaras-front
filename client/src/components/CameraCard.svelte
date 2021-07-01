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
 

  import { ExpansionPanel, Modal, Button, Datepicker, Sidepanel, Dialog, Snackbar, Checkbox } from 'svelte-mui';
  import { fade } from 'svelte/transition';
  import CamaraForm from "./CamaraForm.svelte";
  let showSidepanel = false;
  let showDialog = false;
  let showSnackbar = false;
  let checked = true;
  let date = new Date();

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
    <div class="content">

      <ExpansionPanel name="Editar"  class="mb-4">

        <div class="notification {cssClass} {cssDisabled} editar is-light">

          <input type="text" name="name" bind:value={editable} />
        {#if (editable)}
          <div class="editable">
            <CamaraForm {camera} {editable} {i} accion="editar">editable={editable};</CamaraForm>
          </div>
        {:else}
            <br />
            
            <div class="noeditable">
              Active:{active}
              Feed:{feed}<hr />
              <!--div class="d-flex">
                
                fps:
                <strong>{fps}</strong>
              
                frames capt:
                <strong>{frames_capt}</strong>
              </div-->
              <span class="ml-2" on:click={enableEdit}>
              <i class="fas fa-edit"  mr-2>  </i>
              Habilitar edicion

              </span>
            </div>
  
        {/if}
      </ExpansionPanel>
    </div>
     
  </div>

  {/if}
</div>

<div class="card is-half">

  <card class="content">
    
  </card>
</div>



<!--



<div class="container" >
  <Button on:click={()=>showSidepanel=true} raised color="#FF4136">
    Show Sidepanel 
  </Button>

  <Button on:click={()=>showDialog=true}  color="#0074D9">
    Show Dialog
  </Button>

  <Button on:click={()=>showSnackbar=true}  color="#B10C9">
    Show Snackbar
  </Button>

  <Sidepanel bind:visible={showSidepanel} left>
  This is the sidepanel for {date}
  </Sidepanel>

  <Dialog bind:visible={showDialog}>
    Dialog on {date}!!
  </Dialog>

  <Snackbar bind:visible={showSnackbar}>
    Snackbar on {date}!!!
  </Snackbar>

  <br />

  <Datepicker bind:value={date}></Datepicker>

</div>
-->
