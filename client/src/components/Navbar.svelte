<script>
  import axios from "axios";
  //import 'bulma/css/bulma.css'
  import { user, pageAction, transactions } from "../stores";
  import { push } from "svelte-spa-router";
  let isActive = false;

  if ($pageAction === null) {
    $pageAction = 'AlgoLabs powerfull Dashboard'
  }

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
        <span class="title"> <img src="/images/logo.svg" alt="home" width="200px"> {$pageAction}</span>
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
          {#if $user}
              <div class="navbar-menu-link pr-6">
                <a href="#/alertas" class="menu-link">Alertas<i class="fas fa-bell ml-1"></i></a>
              </div>
              <div class="navbar-menu-link pr-6">
                <a href="#/detections" class="menu-link">Detecciones<i class="fas fa-bell ml-1"></i></a>
              </div>              
              <div class="navbar-menu-link pr-6">
                <a href="#/camaras" class="menu-link">Camaras <i class="fas fa-video ml-1"></i></a>
              </div>
              <div class="navbar-menu-link pr-6">
                <a href="#/config" class="menu-link">Config  <i class="fas fa-cog "></i></a>
              </div>          
              <div class="buttons">
                
                  <a class="button is-primary is-light" href="#/profile">
                    👤 {$user.username}
                  </a>
                  <button class="button" on:click={logout}>Log out</button>
              </div>
            {:else}
              <a class="button" href="#/login">Login</a>
            {/if}
          </div>
        </div>

      </div>
    </div>
</nav>
