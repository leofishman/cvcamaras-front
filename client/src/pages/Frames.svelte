<script>
  import axios from "axios";
  import SummaryCard from "../components/SummaryCard.svelte";
  import Loading from "../components/Loading.svelte";
  import { onMount } from "svelte";
  import {
    cameras
  } from "../stores";

  let input = 0;
  let typeOfTransaction = "+";
  let loading = false;
  let frames;
  $: disabled = !input;

  onMount(async () => {
    loading = true;
    const { data } = await axios.get("/api/frames");
    loading = false;
    frames = data
  });

</script>

<style>
  .app {
    margin: 40px auto;
  }
</style>
<Loading />

<div class="app container">
  {#if !loading}
 frames: <!--img src="data:image/{frames.frame_jpg.contentType}base64,
                     {frames.frame_jpg.img.data.toString('base64')}"-->

 {frames}

 {/if}
</div>