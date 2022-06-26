<script>
  import { arr } from '../config/store'
  import Msg from './Msg.svelte'
  import { flip } from 'svelte/animate'
  import { quintOut } from 'svelte/easing'
</script>

<div>
  <ul>
    {#each $arr as item (item.id)}
      <div animate:flip={{ duration: 1000, easing: quintOut }}>
        <Msg {item} />
      </div>
    {/each}
  </ul>
</div>
