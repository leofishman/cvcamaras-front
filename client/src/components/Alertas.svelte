<script>
  //  import { ExpansionPanel, Modal, Button, Datepicker, Sidepanel, Dialog, Snackbar, Checkbox } from 'svelte-mui';
    import {
        cameras,
    } from "../stores";
    import GenericCard from "./GenericCard.svelte";
    import SvelteTooltip from './SvelteTooltip.svelte';

    export let alerta;
    export  let eventType;

    let dateFormat = require("dateformat");
    let iconEvent = '';
    let person_crops = [];

    
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
        imgArr.forEach((item, index, arr) =>
            person_crops[index] = 'data:image/jpeg;base64,' + atob(alerta.person_crops[index])
        )
        console.log(35, person_crops)
    }
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
                    {array2base64(alerta.person_crops)}
                    {#each person_crops as person_crop, i}
                          <img src={person_crop} alt="Sin..">
                    {/each}
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