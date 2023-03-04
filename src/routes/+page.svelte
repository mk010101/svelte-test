<script lang="ts">
  import { goto } from '$app/navigation';
  let count: number = 0;

  let arr: number[] = [0];

  console.log('home');

  function update() {
    count++;
    arr.push(count);
    arr = arr;
  }

  function goTo(e: MouseEvent) {
    goto('/about');
  }
</script>

<h1>Test</h1>
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

<button id="about" on:click={goTo}>about</button>
