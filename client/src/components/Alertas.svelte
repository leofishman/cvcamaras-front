<script>
    import {
        cameras,
    } from "../stores";
    import GenericCard from "./GenericCard.svelte";
    import Person_crops from "./Person_crops.svelte"
    import Loading from "../components/Loading.svelte";
    import SvelteTooltip from './SvelteTooltip.svelte';
    import { onMount } from "svelte"
    import axios from "axios"


    export let alerta;
    export  let eventType;

    let dateFormat = require("dateformat");
    let iconEvent = '';
    let person_crops = [0];
    let loading = true;
    let images = [];

    
    if (eventType == "alerta") {
        iconEvent = 'bell';
    }
    if (eventType == "log") {
        iconEvent = 'history';
    }

    function estado(element) {
        if (element) {
            return 'alerta'
        } else {
            return 'disabled'
        }
    }

    function array2base64(imgArr) {
        person_crops = [];
        imgArr.forEach((item, index, arr) => {
          person_crops[index] = 'data:image/jpeg;base64,' + atob(imgArr[index])  
          images[index] = {path:'data:image/jpeg;base64,' + atob(imgArr[index]), id: index}
        })
    }

    async function get_person_crops() {
        loading = true
        const opciones = {datetime: alerta.datetime}
        const { data } = await axios.post("/api/alertas/person_crops", {opciones});
        loading = false
        console.log(48, data)
      return data
    }

    onMount(async () => {
      person_crops = await get_person_crops()
      array2base64(person_crops)
    });
</script>


    <tr>
        <td>{dateFormat(alerta.datetime, "dd-mm-yy  h:M")}</td>
        <td>{alerta.cam || 'camara X'}</td>
        <td><div class="text"> 
                 <span class="alert"> {alerta.detections_count || 'alerta'}</span> 
            </div>
        </td>
        
        <td>
            <div class="columns">
                <div class="column">
                    <SvelteTooltip tip="Sin casco: {alerta.no_hardhat_count} - {alerta.mean_no_hardhat_confidence}" top >
                        <i class="fas fa-hard-hat {estado(alerta.no_hardhat_count)}"></i>
                   </SvelteTooltip> 
                    
                </div>
                <div class="column">
                    <SvelteTooltip tip="Sin barbijo: {alerta.no_facemask_count} - {alerta.mean_no_facemask_confidence}" top >
                       <i class="fas fa-head-side-mask {estado(alerta.no_facemask_count)}"></i> 
                   </SvelteTooltip> 
                </div>
                <div class="column ">
                    <i class="fas fa-vest {estado(alerta.no_vest_count)}"></i>  
                </div>
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="4">
            <GenericCard header="Fotos">
                <div class="container">
                    {#if loading}
                        <Loading />
                    {:else}
                       <Person_crops 
                       {images}
                       imageWidth={250}
                       imageSpacing={15}
                       controlColor={'white'}
                       controlScale={0.8}
                       displayControls={false}
                       autoplay={true}
                       autoplaySpeed={3000}
                        />
                    {/if}
                </div>

            </GenericCard>
        </td>
    </tr>
    
<style>
    .alerta {
        background-color: rgb(100, 134, 5);
        
    }
    .text {
        padding-left: 30px;
    }

    .disabled {
        pointer-events: none;
        opacity: 0.4;
    } 
    
    .alerta {
        color: red;
        background-color: white;
    }
</style>