<script>
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
  let expand = i==0 ? 'expand': '';
  
  let editable = false;
  function enableEdit() {
    editable = true;
  }

  </script>
  
  <style>
    .disabled {
        pointer-events: none;
        opacity: 0.4;
    }       

  </style>



<ExpansionPanel name="Nombre: {id}  ID: {idn}" bind:group {expand} on:change={onchage}>

  <div class="notification {cssClass} is-light ">
  <span class="ml-0">
    <button class="material-icons ml-0" on:click={enableEdit} on:mouseenter="">
      edit_note
    </button>
  </span>
  <div class="has-text-centered {cssDisabled}">
    Feed:{feed}
    <div class="d-flex">
    <hr />

      <div>
        <span class="material-icons" disabled={!det_casco}>
          child_care
        </span>
        Casco:

        <strong>{det_casco}</strong>
      </div>
      <div>
        <span class="material-icons" disabled={!det_barbijo}>
          masks
        </span>
        Barbijo:{det_barbijo} 
      </div>
      <i class="fas fa-vest"></i>

        Chaleco:
        <strong>{det_chaleco}</strong>
    </div>
    fps:
    <strong>{fps}</strong>
   
    frames capt:
    <strong>{frames_capt}</strong>
  </div>
    
    Active:
    <strong>{active}</strong>  
  </div>
</ExpansionPanel>
<Dialog  bind:visible={editable} width="640" >
  <CamaraForm {camera} {i} accion="editar"></CamaraForm>
</Dialog>


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