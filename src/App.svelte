<script>
  import firebaseConfig from '../src/config/fb'
  import moment from 'moment'
  import { quintOut } from 'svelte/easing'
  import { flip } from 'svelte/animate'
  import { scale } from 'svelte/transition'
  import { writable } from 'svelte/store'
  import { initializeApp } from 'firebase/app'
  import {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
  } from 'firebase/firestore'

  let arr = writable([])
  let msg = ''
  let nick = ''
  let hasMsg = false
  let hasName = false

  initializeApp(firebaseConfig)

  const db = getFirestore()
  const colRef = collection(db, 'books')
  const q = query(colRef, orderBy('createdAt', 'desc'))

  onSnapshot(q, (snaptshot) => {
    let items = []
    snaptshot.docs.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() })
    })
    $arr = items
  })

  const del = (id) => {
    const docRef = doc(db, 'books', id)

    deleteDoc(docRef)
  }

  function getTime(t) {
    return moment(t * 1000).format('MM-DD  HH:mm:ss')
  }
  function handlekeyup(e) {
    if (e.key === 'Enter') {
      addMsg()
    }
  }

  function addMsg() {
    // @ts-ignore
    if (document.getElementById('nick').value.trim() == '') {
      hasName = true
      msg = ''
      return
    }
    // @ts-ignore
    if (document.getElementById('msg').value.trim() == '') {
      hasName = false
      hasMsg = true
      return
    }
    hasMsg = false
    addDoc(colRef, {
      msg: nick + '： ' + msg,
      createdAt: serverTimestamp(),
    }).then(() => {
      msg = ''
    })
    hasName = false
    // @ts-ignore
    document.getElementById('nick').disabled = true
  }
</script>

<div id="topname">
  <input
    placeholder="name…"
    type="text"
    id="nick"
    name="name"
    bind:value={nick}
  /><button id="send" on:click={addMsg}>Send</button>
  {#if hasName}
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
    {#if hasMsg}
      <p class="err">message…can not be empty~</p>
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
