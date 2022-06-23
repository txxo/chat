<script>
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
  import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from 'firebase/auth'

  const firebaseConfig = {
    apiKey: 'AIzaSyB8KhwqSVpwhxbNguFTnoMwCtJQlwVUUrA',
    authDomain: 'demo1-aa7a1.firebaseapp.com',
    projectId: 'demo1-aa7a1',
    storageBucket: 'demo1-aa7a1.appspot.com',
    messagingSenderId: '999396912644',
    appId: '1:999396912644:web:7014e77ff3a20218f04f51',
  }
  let arr = writable([])
  initializeApp(firebaseConfig)
  let msg = ''
  const db = getFirestore()


  const auth = getAuth()


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
    let nick = document.getElementById('u')
    
    addDoc(colRef, {
      msg: nick.value+'：'+msg,
      createdAt: serverTimestamp(),
    }).then(() => {
      msg = ''
    })
  }





</script>
<div style="margin: 0 auto;display:flex;justify-content:center">
  <label for="username">选择一个名字：</label>
  <select name="username" id="u">
    <option value="鬼之首">鬼之首</option>
    <option value="似血">似血</option>
  </select>
</div>

<hr style="margin:20px ;">
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
