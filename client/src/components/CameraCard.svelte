<script>
    export let value = 0;
    export let mode = "balance";
  
    export let id = '';
    export let idn = 0;
    export let feed = '';
    export let fps = 1;
    export let det_barbijo = true;
    export let det_casco = true;
    export let det_chaleco = false;
    export let frames_capt = 50;
    export let active = true;  

    $: label = mode.toUpperCase();
    $: cssClass = getCssClass(mode);
    $: cssDisabled = active ? '' : 'disabled' 

    function getCssClass(mode) {
      switch (mode) {
        case "balance":
          return "is-info";
        case "income":
          return "is-success";
        case "expenses":
          return "is-danger";
      }
    }
  </script>
  
  <style>
    .disabled {
        pointer-events: none;
        opacity: 0.4;
    }       

  </style>

  <div class="notification {cssClass} is-light has-text-centered {cssDisabled}">
    ID:
    <strong>{id}</strong>
    IDn:
    <strong>{idn}</strong>
    Feed:
    <strong>{feed}</strong>
    fps:
    <strong>{fps}</strong>
    det_barbijo:
    <strong>{det_barbijo}</strong>
    det_casco:
    <strong>{det_casco}</strong>
    Det_Chaleco:
    <strong>{det_chaleco}</strong>
    frames capt:
    <strong>{frames_capt}</strong>
    Active:
    <strong>{active}</strong>  
</div>