<script>
    import { ExpansionPanel, Modal, Button, Datepicker, Sidepanel, Dialog, Snackbar, Checkbox } from 'svelte-mui';
    import {
        cameras,
    } from "../stores";

    
    import 'bulma/css/bulma.css'

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
        <td><abbr title="Fecha">{dateFormat(alerta.date_alerta, "dd-mm-yy  h:M")}</abbr></td>
        <td><abbr title="Tipo">
            <div class="text">
                <i class="fas fa-{iconEvent}"></i>
                 <span class="alert"> {alerta.tipo}</span> 
            </div>
        </abbr></td>
        <td><abbr title="Camara">{alerta.cam}</abbr></td>
        <td><abbr title="Elemento">
            <div class="columns">
                <div class="column">

                    <i class="fas fa-hard-hat {estado(alerta.casco)}"></i>
                    
                </div>
                <div class="column">

                    <i class="fas fa-head-side-mask {estado(alerta.barbijo)}"></i>
                </div>
                <div class="column ">

                    <i class="fas fa-vest {estado(alerta.chaleco)}"></i>  
                </div>
            </div>
        </abbr></td>
    </tr>
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
    
<style>
    .alerta {
        background-color: rgb(100, 134, 5);
        
    }
    .text {
        padding-left: 30px;
    }
    
    .alerta .text {
       color: white; 
      
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