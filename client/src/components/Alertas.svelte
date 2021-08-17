<script>
    import {
        cameras,
    } from "../stores";
    import GenericCard from "./GenericCard.svelte";
    import Person_crops from "./Person_crops.svelte";
    import Carousel from "./Carousel.svelte";
    import { ChevronLeftIcon, ChevronRightIcon } from 'svelte-feather-icons';
    import Loading from "../components/Loading.svelte";
    import SvelteTooltip from './SvelteTooltip.svelte';
    import { onMount } from "svelte"
    import axios from "axios"


    export let alerta, i, detalle;
    export  let eventType;

    let dateFormat = require("dateformat");
    let iconEvent = '';
    let frame_crops = [];
    let person_crops = [];
    let head_crops = [];
    let frame_jpg = [];
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
          person_crops[index] = 'data:image/jpeg;base64,' + atob(imgArr[index])  
          images[index] = {path:'data:image/jpeg;base64,' + atob(imgArr[index]), id: index}
        })
    }

    async function get_person_crops() {
        loading = true
        const opciones = {_id: alerta._id, crops:alerta.person_crops} 
        const { data } = await axios.post("/api/alertas/person_crops", {opciones});
        loading = false
      return data
    }

    async function get_frames() {
        loading = true
        const opciones = {_id: alerta._id, frames:alerta.frames} 
        const { data } = await axios.post("/api/alertas/person_crops", {opciones});
        loading = false
      return data
    }
    

    function percent(num) {
        return (num * 100).toFixed(2)
    }

    onMount(async () => {
        const crops = await get_person_crops()
        console.log(89, crops)
        crops.forEach((item, index, arr) => {
            item.head_crop ? head_crops[index] =  {path:'data:image/jpeg;base64,' + atob(item.head_crop), id: index} : ''
            item.person_crop ? person_crops[index] =  {path:'data:image/jpeg;base64,' + atob(item.person_crop), id: index} : ''
        })
    //   array2base64(person_crops)
        console.log('alerta: ', i, alerta)
        const frames = await get_frames()
        frames.forEach((item, index, arr) => {
            item.frame_jpg ? frame_jpg[index] =  {path:'data:image/jpeg;base64,' + atob(item.frame_jpg), id: index} : ''
        })
        console.log(95, frames)
    });

    function openDetail() {
        const url = '/#/detalle/' + alerta._id
        console.log(i, url)
        window.open(url, '_blank').focus();
    }

</script>

    <tr class="enlace" on:click={openDetail}>
        <td> alertid: {i} - {dateFormat(alerta.datetime, "dd-mm-yy  HH:MM")} </td>
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
                        <SvelteTooltip tip="Con casco: {alerta.hardhat_count} precision: {percent(alerta.mean_hardhat_confidence)}%" top >
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
                        <SvelteTooltip tip="Con barbijo: {alerta.facemask_count} precision: {percent(alerta.mean_facemask_confidence)}%" top >
                            <i class="fas fa-head-side-mask cumple"></i> 
                        </SvelteTooltip>
                    {/if}                    
                </div>
            </div>
        </td>
    </tr>

    {#if 1==2}
    <tr>
        <td colspan="4">
            <GenericCard header="Detalle" {detalle}>
                <div class="container">
                    {#if loading}
                        <Loading />
                    {:else}
                       <Carousel
                       images={head_crops}
                       {cause}
                       {alerta}
                       imageHeight={300}
                       imageSpacing={10}
                       controlColor={'grey'}
                       controlScale={0.8}
                       displayControls={true}
                       autoplay={false}
                        />

                       <Carousel
                       images={person_crops}
                       cause="person_crop"
                       imageHeight={300}
                       imageSpacing={10}
                       controlColor={'grey'}
                       controlScale={0.8}
                       displayControls={true}
                       autoplay={false}
                        />

                       <Carousel
                       images={frame_jpg}
                       cause="frames"
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
    {/if}
<style>
    .text {
        padding-left: 30px;
    }

    .enlace {
        cursor: pointer;
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