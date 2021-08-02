<script>
  import { flip } from 'svelte/animate';
  import { onDestroy } from 'svelte';
  export let images;
  export let cause, alerta;
  export let imageHeight = 200;
  export let imageSpacing = 5;
  export let speed = 500;
  export let controlColor= '#444';
  export let controlScale = '0.5';
  export let autoplay = false;
  export let autoplaySpeed = 5000;
  export let displayControls = true;
  let interval;
  function rotateLeft(e) {
    const transitioningImage = images[images.length - 1]
    document.getElementById(transitioningImage.id).style.opacity = 0;
    images = [images[images.length -1],...images.slice(0, images.length - 1)]
    setTimeout(() => (document.getElementById(transitioningImage.id).style.opacity = 1), speed);
  }

  function rotateRight(e) {
    const transitioningImage = images[0]
    document.getElementById(transitioningImage.id).style.opacity = 0;
    images = [...images.slice(1, images.length), images[0]]
    setTimeout(() => (document.getElementById(transitioningImage.id).style.opacity = 1), speed);
  }
  const startAutoPlay = () => {
   /* if(autoplay){
      interval = setInterval(rotateLeft, autoplaySpeed)
    }
    */
  }
  const stopAutoPlay = () => {
    clearInterval(interval)
  }
  if(autoplay){
    startAutoPlay()
  }
  onDestroy(()=>{stopAutoPlay()})

  function arrowPressed(event) {
    if (event.key == 'ArrowLeft') {
      speed = 0
      clearInterval(interval)
      rotateLeft()
    }
    if (event.key == 'ArrowRight') {
      speed = 0
      clearInterval(interval)      
      rotateRight()
    }
  }
</script>
<svelte:window  on:keydown={arrowPressed} />
<div class="cointainer">
  <h3 class="title">{cause.toString()}</h3>
  <div id="carousel-container">
    <div id="carousel-images">
      
      {#each images as image (image.id)}
        <img
          src={image.path}
          alt={cause.toString()}
          id={image.id}
          style={`height:${imageHeight}px; margin: 0 ${imageSpacing}px;`}
          on:mouseover={stopAutoPlay}
          on:mouseout={startAutoPlay}
          animate:flip={{duration: speed}}/>
      {/each}
    </div>
    {#if displayControls}
    <button id="left" on:click={rotateLeft}>
      <slot name="left-control">
        <svg width="39px" height="110px" id="svg8" transform={`scale(${controlScale})`}>
          <g id="layer1" transform="translate(-65.605611,-95.36949)">
            <path
            style={`fill:none;stroke:${controlColor};stroke-width:9.865;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1`}
            d="m 99.785711,100.30199 -23.346628,37.07648 c -7.853858,12.81098 -7.88205,12.81098 0,24.78902 l 23.346628,37.94647"
            id="path1412" />
          </g>
        </svg>
      </slot>
    </button>
    <button id="right" on:click={rotateRight}>
      <slot name="right-control">
        <svg width="39px" height="110px" id="svg8" transform={`rotate(180) scale(${controlScale})`}>
          <g id="layer1" transform="translate(-65.605611,-95.36949)">
            <path
            style={`fill:none;stroke:${controlColor};stroke-width:9.865;stroke-linecap:round;stroke-linejoin:bevel;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1`}
            d="m 99.785711,100.30199 -23.346628,37.07648 c -7.853858,12.81098 -7.88205,12.81098 0,24.78902 l 23.346628,37.94647"
            id="path1412" />
          </g>
        </svg>
      </slot>
    </button>
    {/if}
  </div>
</div>


<style>
  #carousel-container {
    max-width: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
  #carousel-images {
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    -webkit-mask: linear-gradient(
      to right,
      transparent,
      black 40%,
      black 60%,
      transparent
    );
    mask: linear-gradient(
      to right,
      transparent,
      black 40%,
      black 60%,
      transparent
    );
  }
  button {
   position: absolute;
   top: 50%;
   transform: translateY(-50%);
   display: flex;
   align-items: center;
   justify-content: center;
   background: transparent;
   border: none;
 }
 button:focus {
   outline: auto;
 }
  #left {
    left: 10px;
  }
  #right {
    right: 10px;
  }
</style>