<script>
  import { quintOut } from 'svelte/easing'
  import { del } from '../config/fb'
  import { scale } from 'svelte/transition'
  import moment from 'moment'
  import {delSound} from '../config/store'
  export let item
  let sound
  function getTime(t) {
    return moment(t * 1000).format('MM-DD  HH:mm:ss')
  }
  function handleDbclick() {
    del(item.id)
    if ($delSound === true) {
        sound.play()
      }
  }
</script>

<li
  on:dblclick={()=>handleDbclick()}
  in:scale={{ duration: 1000, opacity: 0, easing: quintOut }}
  out:scale={{ duration: 1000, opacity: 0, easing: quintOut }}
>
  <div id="time">
    {getTime(item.createdAt)}
  </div>
  {item.msg}
</li>

<audio style="display: none;" bind:this={sound} controls>
  <source src="/mixkit-correct-answer-tone.wav" type="audio/wav" />
</audio>
