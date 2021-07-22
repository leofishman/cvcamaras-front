<script>
    import { ExpansionPanel, Modal, Button, Datepicker, Sidepanel, Dialog, Snackbar, Checkbox } from 'svelte-mui';
    import {
        cameras,
    } from "../stores";
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
            <ExpansionPanel name="Fotos">
                <div class="container">
                    {array2base64(alerta.person_crops)}

                          <img src={person_crops[0]} alt="Sin Casco">
                          <img src={person_crops[1]} alt="Sin Casco">               
                          <img src="images/1.png" alt="Sin Casco">
                          <img src="images/1.png" alt="Sin Casco">
                          <img src="images/1.png" alt="Sin Casco">
                          <img src="images/1.png" alt="Sin Casco">               
                          <img src="images/1.png" alt="Sin Casco">
                          <img src="images/1.png" alt="Sin Casco">      
 
                </div>

            </ExpansionPanel>
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