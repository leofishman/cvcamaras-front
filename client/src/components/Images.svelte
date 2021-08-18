<script>
  import { flip } from 'svelte/animate';
  import { onDestroy } from 'svelte';
  export let images =[];
  export let cause, alerta;
  export let imageWidth = 200;
  export let imageSpacing = 5;
 
  
</script>

<div class="cointainer">
  {#if (images.length > 0)}
    <h3 class="title">{cause}</h3>
  {/if}
  <div id="carousel-container">
    <div id="carousel-images is-flex justify-content">
      
      {#each images as image (image.id)}
        <img
          src={image.path}
          alt={cause}
          id={image.id}
          style={`Width:${imageWidth}px; margin: 0 ${imageSpacing}px;`}
          />
      {:else}
        <br>
      {/each}
    </div>
  
  </div>
</div>


<style>
  #carousel-container {
    max-width: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  #carousel-images {
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;

  }
  #left {
    left: 10px;
  }
  #right {
    right: 10px;
  }
</style>