<script>

  export let hasNextPage
  export let hasPrevPage
  export let limit
  export let nextPage
  export let page
  export let pagingCounter
  export let prevPage
  export let totalDocs
  export let totalPages

  import { createEventDispatcher } from 'svelte';

  let start_p = 1
  let total_p = totalPages

  if (totalPages > 6) {
    total_p = 6

    if (page > 2) {
      start_p = page - 2
    } else {
      start_p = 1
    }
  }
  
  const dispatch = createEventDispatcher();

  function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
  }

  function changePage(p) {
    if (p !== page) {
      dispatch('change', p);
    }
  }
</script>


<div class="container">
  Pagina <code>{page}</code> de <code>{totalPages}</code> (  <code>{totalDocs}</code> total)
</div>
<nav class="pagination">
  
  <ul>
    <li class="{page === 1 ? 'disabled' : ''} mr-2">
      <a href="javascript:void(0)" on:click="{() => changePage(1)}">
        <span aria-hidden="true">Primera </span>
      </a>
    </li>
    <li class="{page === 1 ? 'disabled' : ''} mr-2">
      <a href="javascript:void(0)" on:click="{() => changePage(page - 1)}">
        <span aria-hidden="true"> «  </span>
      </a>
    </li>
    {#if start_p > 1}
      <li class="ellipsis">
        <i class="fas fa-ellipsis-h mb-0 pb-0 p-3">  </i> 
      </li>
    {/if}
    {#each range(total_p, start_p) as p}
      {#if (p <= totalPages)} 
        <li class='{p === page ? "active": ""}'>
          <a href="javascript:void(0)" on:click="{() => changePage(p)}">{p}</a>
        </li>
      {/if}
    {/each}
    {#if ( totalPages > 6 && page < totalPages - 3 ) }
      <li class="ellipsis">
        <i class="fas fa-ellipsis-h mb-0 pb-0 p-3">  </i> 
      </li>
    {/if}
    <li class="{page === totalPages ? 'disabled' : ''} ml-2">
      <a href="javascript:void(0)" on:click="{() => changePage(page + 1)}">
        <span aria-hidden="true">»</span>
      </a>
    </li>
    <li class="{page === totalPages ? 'disabled' : ''} ml-4">
      <a href="javascript:void(0)" on:click="{() => changePage(totalPages)}">
        <span aria-hidden="true">Ultima </span>
      </a>
    </li>
    
  </ul>
</nav>

<style>
  .pagination {
    display: flex;
    justify-content: center;
  }
  .pagination ul {
    display: flex;
    padding-left: 0;
    list-style: none;
  }
  
  .pagination li  {
    position: relative;
    display: block;

    line-height: 1.25;
  }

  .pagination li a {
    position: relative;
    display: block;
    padding: .5rem .75rem;
    margin-left: -1px;
    line-height: 1.25;
    background-color: #fff;
    border: 1px solid #dee2e6;
  }
  .pagination li.active a {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }

  .pagination li.disabled a {
    color: #6c757d;
    pointer-events: none;
    cursor: auto;
    border-color: #dee2e6;
  }
</style>