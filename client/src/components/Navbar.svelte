<script>
  import axios from "axios";
  import { user, pageAction, transactions } from "../stores";
  import { push } from "svelte-spa-router";
  let isActive = false;
  async function logout() {
    await axios.post("/api/auth/logout");
    $user = null;
    $transactions = [];
    push("/");
  }
</script>

<nav class="navbar is-light">
  <div class="container">
    <div class="navbar-brand">
      <a href="#/" class="navbar-item"> 
        <span class="title"> <img src="/images/logo.svg" width="200px"> {$pageAction}</span>
      </a>
      <span
        class="navbar-burger burger"
        class:is-active={isActive}
        on:click={() => (isActive = !isActive)}
        aria-expanded="false"
        aria-label="menu">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </span>
    </div>
    <div class="navbar-menu" class:is-active={isActive}>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="navbar-menu-link pr-6">
            <a href="#/alertas" class="menu-link">Alertas</a>
          </div>
          <div class="navbar-menu-link pr-6">
            <a href="#/camaras" class="menu-link">Camaras</a>
          </div>
          <div class="buttons">
            {#if $user}
              <a class="button is-primary is-light" href="#/profile">
                👤 {$user.username}
              </a>
              <button class="button" on:click={logout}>Log out</button>
            {:else}
              <a class="button" href="#/login">Login</a>
            {/if}
          </div>
        </div>

      </div>
    </div>
  </div>
</nav>
