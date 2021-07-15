<script>
    import { ExpansionPanel, Modal, Button, Datepicker, Sidepanel, Dialog, Snackbar, Checkbox } from 'svelte-mui';
    import {
        cameras,
    } from "../stores";

    
   // import 'bulma/css/bulma.css'

    export let alertType;
    export let camera;
    export let alerta;
    export  let eventType;

    var dateFormat = require("dateformat");
    let iconEvent = '';
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
</script>


    <tr>
        <td>{dateFormat(alerta.datetime, "dd-mm-yy  h:M")}</td>
        <td><div class="text"> 
                 <span class="alert"> {alerta.tipo || 'alerta'}</span> 
            </div>
        </td>
        <td>{alerta.cam || 'camara X'}</td>
        <td>
            <div class="columns">
                <div class="column">
                    <i class="fas fa-hard-hat {estado(alerta.detections[2])}"></i>
                </div>
                <div class="column">
                    <i class="fas fa-head-side-mask {estado(alerta.detections[1])}"></i>
                </div>
                <div class="column ">
                    <i class="fas fa-vest {estado(alerta.detections[0])}"></i>  
                </div>
            </div>
        </td>
    </tr>
    <!--tr>
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
    </tr-->
    
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