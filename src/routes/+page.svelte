<script lang="ts">
  import { goto } from '$app/navigation';
  import { CmcButton } from '$lib/cmc-wc/cmc-button/cmc-button.js';
  import { CmcCheck } from '$lib/cmc-wc/cmc-check/cmc-check.js';
  import { CmcTextfield } from '$lib/cmc-wc/cmc-textfield/cmc-textfield.js';

  import { onMount } from 'svelte';

  let count: number = 0;

  let arr: number[] = [0];

  //  console.log('home');

  function update() {
    count++;
    arr.push(count);
    arr = arr;
  }

  function goTo(e: MouseEvent) {
    goto('/about');
  }

  // const btn = new CmcButton();
  // btn.textContent = 'Test';
  // document.body.appendChild(btn);
</script>

<h1>Home</h1>
<h3>Clicked: {count}</h3>
<p>{arr.join('.')}</p>
<button on:click={update}>Click</button>
<div>
  {#each arr as n}
    <!-- <span>{n}/</span> -->
    {#if n > 0 && n % 2 === 0}
      <span>Even {n}/</span>
    {/if}
  {/each}
</div>
<p>
  <button id="about" on:click={goTo}>about</button>
</p>

<cmc-button variant="outline" icon="icon-check">Button</cmc-button>

<p />
<form action="">
  <cmc-textfield placeholder="test-tf" template="** / ***" />
  <cmc-check type="checkbox" variant="panel" kaka="suka">My check</cmc-check>
</form>
<div>123</div>
