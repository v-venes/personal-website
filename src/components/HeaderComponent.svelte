<script lang="ts">
  import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
  } from "sveltestrap";
  import { Link } from "svelte-navigator";

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<Navbar color="dark" dark expand="md">
  <!-- <NavbarBrand> -->
  <Link class="link-brand" to="/">
    <div class="nav-logo">
      <span class="symbol">&#60;</span><span class="name">Victor Neves</span
      ><span class="symbol">&#8725;</span><span class="symbol">&#62;</span>
    </div>
  </Link>
  <!-- </NavbarBrand> -->
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ms-auto" navbar>
      <NavItem>
        <Link class="link" to="skills">Skills</Link>
      </NavItem>
      <NavItem>
        <Link class="link" to="projects">Projects</Link>
      </NavItem>
      <NavItem>
        <Link class="link" to="contact">Contact Me</Link>
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>

<style>
  :global(.link) {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.55);
    padding: 0.5rem 1rem;
  }

  :global(.link):hover {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.75);
  }

  :global(.link-brand) {
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    text-decoration: none;
    white-space: nowrap;
  }
  .symbol {
    color: darkgrey;
  }

  .name {
    color: white;
    margin: 0 15px 0 10px;
  }

  .nav-logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 32px;
    font-weight: 300;
    font-family: "Roboto", sans-serif;
  }
</style>
