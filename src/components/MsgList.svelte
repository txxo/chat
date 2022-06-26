<script>
  import { arr } from '../config/store'
  import Msg from './Msg.svelte'
  import { flip } from 'svelte/animate'
  let sound
</script>

<div>
  <ul>
    {#each $arr as item (item.id)}
      <div animate:flip={{ duration: 1200 }}>
        <Msg {item} on:playSound={sound.play()} />
      </div>
    {/each}
  </ul>
</div>
<audio preload="auto" style="display: none;" bind:this={sound} controls>
  <source src="/d.mp3" type="audio/mp3" />
</audio>
