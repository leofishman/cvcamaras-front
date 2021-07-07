<script>
  import Router, { wrap, push, querystring } from "svelte-spa-router";
  import Home from "./pages/Home.svelte";
  import Dashboard from "./pages/Dashboard.svelte";
  import Signup from "./pages/Signup.svelte";
  import Login from "./pages/Login.svelte";
  import Prolife from "./pages/Profile.svelte";
  import Config from "./pages/Config.svelte";
  import Detections from "./pages/Detections.svelte";
  import Navbar from "./components/Navbar.svelte";
  import Loading from "./components/Loading.svelte";
  import Toasts from "./components/Toasts.svelte"
  import Camaras from "./pages/Camaras.svelte"

  import { onMount } from "svelte";
  import axios from "axios";
  import { user, pageAction, cameras, addToasts,  } from "./stores";
  import Alertas from "./pages/Alertas.svelte";

  let loading = true;

  onMount(async () => {
    const { data } = await axios.get("api/auth/user");
    $user = data.user;
    if ($user) {
      if ($cameras.length == 0) {
        const { data } = await axios.get("/api/config/cameras");
      $cameras = data;
      }
    }

    loading = false;
  });

  const routes = {
    "/": wrap(Home, { reason: "authenticated" }, () => !$user),
    /*"/dashboard": wrap(Dashboard, { reason: "unauthenticated" }, () => $user),*/
    "/signup": wrap(Signup, { reason: "unauthenticated" }, () => $user),
    "/login": wrap(Login, { reason: "authenticated" }, () => !$user),
    "/profile": wrap(Prolife, { reason: "unauthenticated" }, () => $user),
    "/config": wrap(Config, { reason: "unauthenticated" }, () => $user),
    "/camaras": wrap(Camaras, { reason: "unauthenticated"}, () => $user),
    "/alertas": wrap(Alertas, { reason: "unauthenticated"}, () => $user),
    "/detections": wrap(Detections, { reason: "unauthenticated"}, () => $user),
  };

  function conditionsFailed(event) {
    const { reason } = event.detail.userData;
    switch (reason) {
      case "unauthenticated":
        return push("/login");
      case "authenticated":
        return push("/alertas");
    }
  }
</script>

<style>
  .loading-container {
    max-width: 500px;
    display: flex;
    min-height: 100vh;
    align-content: center;
    margin: auto;
  }
</style>

{#if loading}
  <div class="loading-container">
    <Loading />
  </div>
{:else}
  <Navbar />
  <Toasts />
  <br />
  <Router {routes} on:conditionsFailed={conditionsFailed} />
{/if}
