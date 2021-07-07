<script>
    import { ExpansionPanel, Modal, Button, Datepicker, Sidepanel, Dialog, Snackbar, Checkbox } from 'svelte-mui';
    import {
        cameras,
    } from "../stores";

    
    import 'bulma/css/bulma.css'


  //  export let camera;
    export let detection;
    export  let eventType = "detection";
console.log(detection, 14)
    var dateFormat = require("dateformat");
    let iconEvent = '';
    if (eventType == "detection") {
        iconEvent = 'bell';
    }
    if (eventType == "detection") {
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
                 <span class="alert"> {detection.tipo}</span> 
            </div>
        </td>
        <td>{detection.source}</td>
        <td>
            <div class="columns">
                <div class="column">
                    <i class="fas fa-hard-hat {estado(detection.casco)}"></i>
                </div>
                <div class="column">
                    <i class="fas fa-head-side-mask {estado(detection.barbijo)}"></i>
                </div>
                <div class="column ">
                    <i class="fas fa-vest {estado(detection.chaleco)}"></i>  
                </div>
            </div>
        </td>
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