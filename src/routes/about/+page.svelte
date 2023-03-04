<script lang="ts">
  import { fly } from 'svelte/transition';
  import { onDestroy } from 'svelte';
  //@ts-ignore
  import img from '$lib/assets/photo.jpg?webp';

  let count = 0;
  let delay = 0;
  let canRun = true;

  function tick() {
    if (!canRun) return;
    if (delay++ > 60) {
      delay = 0;
      count++;
      console.log(count);
    }
    requestAnimationFrame(tick);
  }
  tick();

  onDestroy(() => {
    canRun = false;
  });
</script>

<div in:fly={{ x: -60, duration: 500 }}>
  <h4>Page: about</h4>
  <div>{count}</div>

  <img src={img} alt="some description" />
</div>
