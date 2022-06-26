<script>
  import { quintOut } from 'svelte/easing'
  import { del } from '../config/fb'
  import { scale } from 'svelte/transition'
  import moment from 'moment'
  import { createEventDispatcher } from 'svelte'
  import { beforeUpdate } from 'svelte'
  export let item
  let dispatcher = createEventDispatcher()

  function getTime(t) {
    return moment(t * 1000).format('MM-DD  HH:mm:ss')
  }

  function handleDbclick() {
    del(item.id)
  }

  beforeUpdate(() => {
    dispatcher('playSound')
  })
</script>

<li
  on:dblclick={handleDbclick}
  in:scale={{ duration: 1000,delay:500, opacity: 0, easing: quintOut }}
  out:scale={{ duration: 1000,delay:500, opacity: 0, easing: quintOut }}
>
  <div id="time">
    {getTime(item.createdAt)}
  </div>
  {item.msg}
</li>
