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

<p>
  Page <code>{page}</code> of <code>{totalPages}</code> ( on <code>{totalDocs}</code> items)
</p>

<nav class="pagination">
  <ul>
    <li class="{page === 1 ? 'disabled' : ''}">
      <a href="javascript:void(0)" on:click="{() => changePage(page - 1)}">
        <span aria-hidden="true">«</span>
      </a>
    </li>
    {#each range(totalPages, 1) as p}
    <li class='{p === page ? "active": ""}'>
      <a href="javascript:void(0)" on:click="{() => changePage(p)}">{p}</a>
    </li>
    {/each}
    <li class="{page === totalPages ? 'disabled' : ''}">
      <a href="javascript:void(0)" on:click="{() => changePage(page + 1)}">
        <span aria-hidden="true">»</span>
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