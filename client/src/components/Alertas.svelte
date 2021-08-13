<script>
    import {
        cameras,
    } from "../stores";
    import GenericCard from "./GenericCard.svelte";
    import Person_crops from "./Person_crops.svelte"
    import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons';
    import Loading from "../components/Loading.svelte";
    import SvelteTooltip from './SvelteTooltip.svelte';
    import { onMount } from "svelte"
    import axios from "axios"


    export let alerta, i, detalle;
    export  let eventType;

    let dateFormat = require("dateformat");
    let iconEvent = '';
    let person_crops = [0];
    let loading = true;
    let images = [];
    let cause;
    let camera, site = "X"

    /*
    if (alerta.no_facemask_count) cause.push('Sin Barbijo (' + alerta.no_facemask_count + ') ')
    if (alerta.no_hardhat_count) cause.push('Sin Casco (' + alerta.no_hardhat_count + ') ')
    if (alerta.hardhat_count) cause.push(' Con Casco (' + alerta.hardhat_count + ') ')
    if (alerta.facemask_count) cause.push(' Con Barbijo (' + alerta.facemask_count + ') ')
    if (alerta._id) {
        site = alerta._id.site
        camera = site + '/' + alerta._id.camera
    } 
*/
    camera = alerta.site + '/' + alerta.camera
    cause = alerta.alert_cause
    
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
           console.log(56, imgArr[index].person_crop) 
          person_crops[index] = 'data:image/jpeg;base64,' + atob(imgArr[index].person_crop)  
          images[index] = {path:'data:image/jpeg;base64,' + atob(imgArr[index].person_crop), id: index}
        })
    }

    async function get_person_crops() {
        loading = true
        const opciones = {_id: alerta._id, crops:alerta.person_crops} 
        const { data } = await axios.post("/api/alertas/person_crops", {opciones});
        console.log(65, data)
        loading = false
      return data
    }

    function percent(num) {
        return (num * 100).toFixed(2)
    }

    onMount(async () => {
      person_crops = await get_person_crops()
      array2base64(person_crops)
      console.log('alerta', i, alerta)
    });

</script>


    <tr>
        <td>{dateFormat(alerta.datetime, "dd-mm-yy  HH:MM")} </td>
        <td>{camera}</td>
        <td><div class="text"> 
                 <span class="alert"> {alerta.detections_count || 'alerta'}</span> 
            </div>
        </td>
        
        <td>
            <div class="columns">
                <div class="column">
                    {#if (alerta.no_hardhat_count)}
                        <SvelteTooltip tip="Sin casco: {alerta.no_hardhat_count} precision: {percent(alerta.mean_no_hardhat_confidence)}%" top >
                            <i class="fas fa-hard-hat {estado(alerta.no_hardhat_count)}"></i>
                        </SvelteTooltip> 
                    {/if}
                        
                    {#if (alerta.hardhat_count)}
                        <SvelteTooltip tip="Con casco: {alerta.hardhat_count}" top >
                            <i class="fas fa-hard-hat cumple"></i>
                        </SvelteTooltip> 
                    {/if}
                </div>
                <div class="column">
                    {#if alerta.no_facemask_count}
                        <SvelteTooltip tip="Sin barbijo: {alerta.no_facemask_count} precision: {percent(alerta.mean_no_facemask_confidence)}%" top >
                            <i class="fas fa-head-side-mask {estado(alerta.no_facemask_count)}"></i> 
                        </SvelteTooltip> 
                    {/if}
                    {#if alerta.facemask_count}
                        <SvelteTooltip tip="Con barbijo: {alerta.facemask_count}" top >
                            <i class="fas fa-head-side-mask cumple"></i> 
                        </SvelteTooltip>
                    {/if}                    
                </div>
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="4">
            <GenericCard header="Detalle" {detalle}>
                <div class="container">
                    {#if loading}
                        <Loading />
                    {:else}
                       <Person_crops 
                       {images}
                       {cause}
                       {alerta}
                       imageHeight={300}
                       imageSpacing={10}
                       controlColor={'grey'}
                       controlScale={0.8}
                       displayControls={true}
                       autoplay={false}
                        />
                    {/if}
                </div>

            </GenericCard>
        </td>
    </tr>
    
<style>
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

    .cumple {
        color: green;
        background-color: aliceblue;
    }
</style>