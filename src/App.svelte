<script>
  import {arr,del,addMsg,hasMsg,hasName} from '../src/config/fb'
  import moment from 'moment'
  import { quintOut } from 'svelte/easing'
  import { flip } from 'svelte/animate'
  import { scale } from 'svelte/transition'

  let msg = ''
  let nick = ''
  let nickn = null



  function getTime(t) {
    return moment(t * 1000).format('MM-DD  HH:mm:ss')
  }
  function handlekeyup(e) {
    if (e.key === 'Enter') {
      addMsg(nick,msg,nickn)
      msg=''
    }
  }

  function clickSend(){
    addMsg(nick,msg,nickn)
    msg=''
  }


</script>

<div id="topname">
  <input
    bind:this={nickn}
    placeholder="name…"
    type="text"
    id="nick"
    bind:value={nick}
  />
  <button id="send" on:click={clickSend}>Send</button>
  {#if $hasName}
    <p class="err">name…can't be empty~</p>
  {/if}
</div>

<main>
  <div id="top">
    <input
      placeholder="message…"
      id="msg"
      on:keyup={handlekeyup}
      bind:value={msg}
      type="text"
    />
    {#if $hasMsg}
      <p class="err">message…can't be empty~</p>
    {/if}
  </div>

  <div>
    <ul>
      {#each $arr as item (item.id)}
        <li
          animate:flip={{ duration: 1000, easing: quintOut }}
          on:dblclick={() => del(item.id)}
          in:scale={{ duration: 1000, opacity: 0, easing: quintOut }}
          out:scale={{ duration: 1000, opacity: 0, easing: quintOut }}
        >
          <div id="time">
            {getTime(item.createdAt)}
          </div>
          {item.msg}
        </li>
      {/each}
    </ul>
  </div>
</main>
