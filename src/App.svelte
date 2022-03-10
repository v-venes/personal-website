<script lang="ts">
  import { Router, Route } from "svelte-navigator";
  import HomePage from "./views/HomePage.svelte";
  import ContactPage from "./views/ContactPage.svelte";
  import ProjectsPage from "./views/ProjectsPage.svelte";
  import SkillsPage from "./views/SkillsPage.svelte";
  import HeaderComponent from "./components/HeaderComponent.svelte";
</script>

<Router>
  <HeaderComponent />
  <Route path="/">
    <HomePage />
  </Route>
  <Route path="/projects">
    <ProjectsPage />
  </Route>
  <Route path="/skills">
    <SkillsPage />
  </Route>
  <Route path="/contact">
    <ContactPage />
  </Route>
</Router>

<style>
</style>
