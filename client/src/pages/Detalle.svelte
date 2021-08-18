<script>
  import axios from "axios"
  import { onMount } from "svelte"
  import Loading from "../components/Loading.svelte";
  import GenericCard from "../components/GenericCard.svelte";
  import Images from "../components/Images.svelte";
  //import SvelteTooltip from '../components/SvelteTooltip.svelte';

  import 'bulma/css/bulma.css'

  export let params = {}

  let dateFormat = require("dateformat");

  let alerta, opciones = {}
  let person_crops = [];
  let head_crops = [];
  let frame_jpg = [];

  let loading = true;
  console.log(params)

  onMount(async () => {
    loading = true
    alerta = await getAlert()

    const crops = await get_person_crops()
    console.log(89, crops)
    crops.forEach((item, index, arr) => {
        item.head_crop ? head_crops[index] =  {path:'data:image/jpeg;base64,' + atob(item.head_crop), id: index} : ''
        item.person_crop ? person_crops[index] =  {path:'data:image/jpeg;base64,' + atob(item.person_crop), id: index} : ''
    })

    const frames = await get_frames()
        frames.forEach((item, index, arr) => {
            item.frame_jpg ? frame_jpg[index] =  {path:'data:image/jpeg;base64,' + atob(item.frame_jpg), id: index} : ''
    })

    loading = false
    console.log(14, alerta)
  })


  async function get_person_crops() {
        const opciones = {_id: alerta._id, crops:alerta.person_crops} 
        const { data } = await axios.post("/api/alertas/person_crops", {opciones});
      return data
    }

    async function get_frames() {
        const opciones = {_id: alerta._id, frames:alerta.frames} 
        const { data } = await axios.post("/api/alertas/person_crops", {opciones});
      return data
    }  

  async function getAlert() {
    opciones.params = params
    const path = "/api/alertas/notificaciones"
    console.log(17, path, opciones)
    const { data } = await axios.post(path, {opciones});

 //   console.log(23, data[0].docs[0])
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
      <i class="fas fa-bell mr-2"></i> <strong>{alerta.alert_cause}</strong>  ({alerta.detections_count})
    </h1>
    <hr>
    <h2 class="subtitle is-3">
      Fecha Alerta: <strong>{dateFormat(alerta.datetime, "dd-mm-yy  HH:MM:ss")}</strong> 
      <br>
      Lugar: <strong>{alerta.site}/{alerta.camera}</strong>
     
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
    <div class="images">
        <Images
        images={head_crops}
        cause="Recorte de Cabezas ({alerta.alert_cause}  {alerta.detections_count})"  
        imageHeight={160}
        imageSpacing={10}
        />
        <br />

        <Images
        images={person_crops}
        cause="Recorte de Personas"
        imageHeight={340}
        imageSpacing={10}
        />
        <br />

        <Images
        images={frame_jpg}
        cause="Frames"
        imageHeight={100}
        imageSpacing={2}
        /> 
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