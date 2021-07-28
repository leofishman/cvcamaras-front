<script>
//    import { ExpansionPanel, Modal, Button, Datepicker, Sidepanel, Dialog, Snackbar, Checkbox } from 'svelte-mui';
    import {
        cameras,
    } from "../stores";
    import GenericCard from "./GenericCard.svelte";

    import SvelteTooltip from './SvelteTooltip.svelte';

    export let detection;
    export  let type = "detection";
    var dateFormat = require("dateformat");
    let iconEvent = '';
    if (type == "detection") {
        iconEvent = 'bell';
    }
    if (type == "detection") {
        iconEvent = 'history';
    }
    function estado(element) {
        if (element) {
            return 'detection'
        } else {
            return 'disabled'
        }
    }
</script>


<tr>
    <td>{dateFormat(detection.datetimetz, "dd-mm-yy  h:M")}</td>
    <td><div class="text"> 
                <span class="alert"> {type}</span> 
        </div>
    </td>
    <td>{detection.source}</td>
    <td>
        <div class="columns ">
            <div class="column is-one-third-mobile">
                <SvelteTooltip tip="persona: {detection.detections_confidences[0]}" top >
                    <i class="fas fa-male {estado(detection.detections[0])}" ></i>
                </SvelteTooltip>
            </div>                
            <div class="column is-one-third-mobile">
                <SvelteTooltip tip="barbijo: {detection.detections_confidences[1]}" top >
                    <i class="fas fa-head-side-mask {estado(detection.detections[1])} {detection.detections[1]}"></i>
                </SvelteTooltip>
            </div>

            <div class="column is-one-third-mobile">
                <SvelteTooltip tip="casco: {detection.detections_confidences[2]}" top >
                     <i class="fas fa-hard-hat {estado(detection.detections[2])}"></i> 
                </SvelteTooltip>                        
            </div>
            {#if detection.detections_confidences[3]}
            <div class="column is-one-third-mobile">
                <SvelteTooltip tip="certeza: {detection.detections_confidences[3]}" top >
                     <i class="fas fa-vest {estado(detection.chaleco)}"></i> 
                </SvelteTooltip>                        
            </div>
            {/if}
        </div>
    </td>
</tr>
<tr>
        <td colspan="4">
            <GenericCard header="fotos">
                <div class="columns">
                    <div class="text-center column">
                        <img src={'data:image/jpeg;base64,' + atob(detection.person_crop)} >
                    </div>
                    <div class="mt-0 column">
                        <img src={'data:image/jpeg;base64,' + atob(detection.head_crop)} class="mt-0">
                    </div>   
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
    
    .detection {
        color: red;
        background-color: white;
    }
</style>