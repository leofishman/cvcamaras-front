<script>
  import axios from "axios"
  import { onMount } from "svelte"
  import Loading from "../components/Loading.svelte";
  import SvelteTooltip from '../components/SvelteTooltip.svelte';

  import 'bulma/css/bulma.css'

  export let params = {}

  let dateFormat = require("dateformat");

  let alerta, opciones = {}
  let loading = true;
  console.log(params)

  onMount(async () => {
    loading = true
    alerta = await getAlert()
    loading = false
    console.log(14, alerta)
  })

  async function getAlert() {
    opciones.params = params
    const path = "/api/alertas/notificaciones"
    console.log(17, path, opciones)
    const { data } = await axios.post(path, {opciones});

    console.log(23, data[0].docs[0])
    return data[0].docs[0]
  }

  function percent(num) {
        return (num * 100).toFixed(2)
  }
  
  function estado(element) {
        if (element) {
            return 'alerta'
        } else {
            return 'disabled'
        }
  }

</script>


<div class="container">
  {#if loading}
    <Loading />
  {:else}
    <h1 class="title is-1">
      Lugar: <strong>{alerta.site}/{alerta.camera}</strong>
    </h1>
    <hr>
    <h2 class="subtitle is-3">
      Fecha Alerta: <strong>{dateFormat(alerta.datetime, "dd-mm-yy  HH:MM:ss")}</strong> 
      <br>
      <i class="fas fa-bell mr-2"></i>Causa: <strong>{alerta.alert_cause}  ({alerta.detections_count}) </strong> 
    </h2>

    <div class="subtitle is-4">
      {#if (alerta.no_hardhat_count)}
        <p>
          <i class="fas fa-hard-hat {estado(alerta.no_hardhat_count)}"></i>
           &nbsp; Sin casco: {alerta.no_hardhat_count}  <br />
           &emsp;&nbsp;&nbsp; precision: {percent(alerta.mean_no_hardhat_confidence)}%          
        </p>
      {/if}
          
      {#if alerta.no_facemask_count}
        <p>
          <i class="fas fa-head-side-mask {estado(alerta.no_facemask_count)}"></i>
          &nbsp;Sin barbijo: {alerta.no_facemask_count} <br />
          &emsp;&nbsp;&nbsp;precision: {percent(alerta.mean_no_facemask_confidence)}%
        </p>  
      {/if}
    </div>
  {/if}
</div>


<style>
    .disabled {
        pointer-events: none;
        opacity: 0.4;
    } 
    
    .alerta {
        color: red;
        background-color: white;
    }
</style>