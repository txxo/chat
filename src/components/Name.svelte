<script>
  import { addMsg } from '../config/fb'
  import { hasMsg, hasName } from '../config/store'
  let msg = ''
  let nick = ''
  let nickn = null
  function handlekeyup(e) {
    if (e.key === 'Enter') {
      addMsg(nick, msg, nickn)
      msg = ''
    }
  }
  function clickSend() {
    addMsg(nick, msg, nickn)
    msg = ''
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
  {#if !$hasName}
    <p class="err">Please input your Name~~</p>
  {/if}
</div>

<div id="top">
  <input
    placeholder="message…"
    id="msg"
    on:keyup={handlekeyup}
    bind:value={msg}
    type="text"
  />
  {#if !$hasMsg}
    <p class="err">Please input your Msg~</p>
  {/if}
</div>
