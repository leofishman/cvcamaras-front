<script>
    import { ExpansionPanel, Modal, Button, Datepicker, Sidepanel, Dialog, Snackbar, Checkbox } from 'svelte-mui';
    import {
        cameras,
    } from "../stores";

    import SvelteTooltip from 'svelte-tooltip';
    import 'bulma/css/bulma.css'


  //  export let camera;
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
            <div class="columns">
                <div class="column">
                    <SvelteTooltip tip="certeza: {detection.detections_confidences[1]}" top >
                        <i class="fas fa-hard-hat {estado(detection.detections[1])}"></i>
                    </SvelteTooltip>
                </div>
                <div class="column">
                    <SvelteTooltip tip="certeza: {detection.detections_confidences[0]}" top >
                        <i class="fas fa-head-side-mask {estado(detection.detections[0])}" ></i>
                    </SvelteTooltip>
                </div>
                <div class="column ">
                    <i class="fas fa-vest {estado(detection.chaleco)}"></i>  
                </div>
            </div>
        </td>
    </tr>
    <!--
    <tr>
        <td colspan="4">
            <ExpansionPanel name="Fotos">
                <div class="container">
            
                          <img src="images/1.png" alt="Sin Casco">
                          <img src="images/1.png" alt="Sin Casco">               
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

    -->

    
<style>
    .detection {
        background-color: rgb(100, 134, 5);
        
    }
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