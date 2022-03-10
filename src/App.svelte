<script lang="ts">
  import HomePage from "./views/HomePage.svelte";
  import { Button } from "sveltestrap";

  export let name: string;
</script>

<main>
  <h1>Hello {name}!</h1>
  <HomePage />
  <Button color="primary">Teste</Button>
</main>

<style>
</style>
