<script>

  export let header;
  export  let detalle;
  import { addToast } from '../stores'
  import { fade } from 'svelte/transition';

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let editable = false;
  function enableEdit() {
    editable = !editable;
  }

  function toggleConfig() {
    console.log('det', detalle)

    detalle = !detalle
  }
  
  function estado(element) {
        if (element) {
            return ''
        } else {
            return 'disabled'
        }
    }
  </script>
  
<style>

  .disabled {
      pointer-events: none;
      opacity: 0.4;
  }
  
  .editar {
    pointer-events: visiblePainted;
  }

  .message {
    background-color: #1976d2;
  }

  </style>

<div class="card" >
  <header class="card-header" on:click={toggleConfig}>
    <p class="card-header-title mr-4">
     {header}
    </p>
    <button class="card-header-icon" aria-label="more options">
      <span class="icon">
        {#if detalle}
          <i class="fas fa-angle-up" aria-hidden="true"></i>
        {:else}
          <i class="fas fa-angle-down" aria-hidden="true"></i>
        {/if}
      </span>
    </button>
  </header>

  {#if detalle}
  <div class="card-content"  transition:fade="{{ duration: 200 }}">
      <div class="notification editar is-light">
        <div class="editable">
          <slot />
        </div>
    </div>
  </div>
  {/if}
</div>