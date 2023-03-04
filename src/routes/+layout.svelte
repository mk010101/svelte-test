<script lang="ts">
  import '$lib/styles/reset.css';
  import '$lib/styles/theme.css';
  import '$lib/styles/icon-font.css';
  import '$lib/styles/main.css';
  //@hmr:keep-all'
</script>

<nav>
  <a href="/">home</a>
  <a href="/about">about</a>
  <a href="/account/12345">account 1</a>
  <a href="/account/ABC-123-XX">account 2</a>
</nav>
<slot />

<style>
  nav {
    margin: 1rem 0;
  }
  a {
    padding: 0.5rem 1rem;
    display: inline-block;
    background-color: rgb(188, 186, 186);
    text-decoration: none;
    color: rgb(35, 34, 34);
  }
</style>
