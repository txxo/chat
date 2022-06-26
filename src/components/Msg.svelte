<script>
  import { quintOut } from 'svelte/easing'
  import { del } from '../config/fb'
  import { scale } from 'svelte/transition'
  import moment from 'moment'
  export let item
  function getTime(t) {
    return moment(t * 1000).format('MM-DD  HH:mm:ss')
  }
</script>

<li
  on:dblclick={() => del(item.id)}
  in:scale={{ duration: 1000, opacity: 0, easing: quintOut }}
  out:scale={{ duration: 1000, opacity: 0, easing: quintOut }}
>
  <div id="time">
    {getTime(item.createdAt)}
  </div>
  {item.msg}
</li>
