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
  let iconEvent = '';
  if (eventType == "alerta") {
      iconEvent = 'bell';
  }
  if (eventType == "log") {
      iconEvent = 'history';
  }
</script>

<div class="container {eventType}">
    <div class="text">
        <i class="fas fa-{iconEvent}"></i>
        {eventType} <span class="alert"> {alertType}</span> 
    </div>
    <ExpansionPanel name="25/6 10:25">
    <div class="container">
            <div class="columns">
                <div class="column">
                    Casco:  
                    <i class="fas fa-hard-hat"></i>
                    
                </div>
                <div class="column">
                Barbijo:
                <i class="fas fa-head-side-mask"></i>
                </div>
                <div class="column ">
                Chaleco:
                <i class="fas fa-vest"></i>  
                </div>
            </div>
              <img src="images/1.png" alt="Sin Casco">
              <img src="images/1.png" alt="Sin Casco">               
              <img src="images/1.png" alt="Sin Casco">
              <img src="images/1.png" alt="Sin Casco">
              <img src="images/1.png" alt="Sin Casco">
              <img src="images/1.png" alt="Sin Casco">               
              <img src="images/1.png" alt="Sin Casco">
              <img src="images/1.png" alt="Sin Casco">      
        {#if (eventType=="alerta")}

            ALERTA!!!!
        {/if}
    </div>
</ExpansionPanel>
</div>

<style>
    .alerta {
        background-color: orangered;
        
    }
    .text {
        padding-left: 30px;
    }
    
    .alerta .text {
       color: white; 
      
    }
</style>