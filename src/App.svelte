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
documentId,
  } from 'firebase/firestore'
  let arr = writable([])
  initializeApp(firebaseConfig)
  let msg = ''
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
  let nick = ''
  function addMsg() {
    // @ts-ignore
    if(document.getElementById('nick').value.trim()==""){
      alert('name cannot be empty!')
      msg = ''
      return
    }
    // @ts-ignore
    if(document.getElementById('msg').value.trim()==""){
      alert('msg cannot be empty~~!!')
      return
    }

    addDoc(colRef, {
      msg: nick+"："+msg,
      createdAt: serverTimestamp(),
    }).then(() => {
      msg = ''
    })
  }
  
  function addName(){
    // @ts-ignore
    if(document.getElementById('nick').value.trim()==""){
      alert('name cannot be empty!')
      return
    }
    // @ts-ignore
    document.getElementById('nick').disabled = true
  }

 function handleaddNamebykey(e){
  if (e.key === 'Enter') {
    addName()
    }
 }
</script>

<div style="margin: 0 auto;display:flex;justify-content:center">
  <label for="name">name=></label>
  <input on:keyup={handleaddNamebykey}  type="text" id="nick" name="name" bind:value={nick}><button on:click={addName}>Confirm</button>
</div>

<hr style="margin:20px ;" />
<main>
  <div id="top">
    <input
      placeholder="message here~Enter~"
      id="msg"
      on:keyup={handlekeyup}
      bind:value={msg}
      type="text"
    />
    <button on:click={addMsg}>Send</button>
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
          <div style="font-size: 16px;display:block;color:white">
            {getTime(item.createdAt)}
          </div>
          {item.msg}
        </li>
      {/each}
    </ul>
  </div>
</main>

<style>
  * {
    list-style: none;
    padding: 0;
    margin: 0;
    font-size: 30px;
  }

  li {
    margin-bottom: 10px;
    background: #e3e3e3;
    border-radius: 10px;
    padding: 5px;
    word-break: break-all;
    white-space: pre-wrap;
    background: pink;
    color: #333;
  }

  ul {
    margin: 0 auto;
  }

  main {
    margin: 0 auto;
    width: 500px;
  }

  #msg {
    width: 100%;
    font-size: 30px;
    padding: 10px;
    border-radius: 6px;
    border: solid 2px pink;
  }

  #top {
    display: flex;
    margin-bottom: 20px;
  }
</style>
