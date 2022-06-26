<script>
  import { arr } from '../config/store'
  import Msg from './Msg.svelte'
  import { flip } from 'svelte/animate'
  import { quintOut } from 'svelte/easing'
  let sound
</script>

<div>
  <ul>
    {#each $arr as item (item.id)}
      <div animate:flip={{ duration: 1000, easing: quintOut }}>
        <Msg {item} on:playSound={sound.play()} />
      </div>
    {/each}
  </ul>
</div>
<audio style="display: none;" bind:this={sound} controls>
  <source src="/mixkit-long-pop.wav" type="audio/wav" />
</audio>
