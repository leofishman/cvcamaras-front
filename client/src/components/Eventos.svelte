<script>
  import { ExpansionPanel, Modal, Button, Datepicker, Sidepanel, Dialog, Snackbar, Checkbox } from 'svelte-mui';
  import {
      cameras,
    } from "../stores";
  import 'bulma/css/bulma.css'

  let eventType="Alerta";

</script>

<div class="container {eventType}">
    <div class="text">
        Camara 1 <span class="alert">Alerta Inmediata</span> 25/6 10:25
    </div>
    <ExpansionPanel name={eventType}>
    <div class="container">
        {#if (eventType=="Alerta")}

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
        {/if}
    </div>
</ExpansionPanel>
</div>

<style>
    .Alerta {
        background-color: orangered;
        
    }

    .Alerta .text {
       color: white; 
       padding-left: 30px;
    }
</style>