import { initializeApp } from 'firebase/app'
import { arr, hasMsg, hasName,addSound,delSound } from '../config/store'
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

const fbconfig = {
  apiKey: 'AIzaSyB8KhwqSVpwhxbNguFTnoMwCtJQlwVUUrA',
  authDomain: 'demo1-aa7a1.firebaseapp.com',
  projectId: 'demo1-aa7a1',
  storageBucket: 'demo1-aa7a1.appspot.com',
  messagingSenderId: '999396912644',
  appId: '1:999396912644:web:7014e77ff3a20218f04f51',
}

initializeApp(fbconfig)
const db = getFirestore()
const colRef = collection(db, 'books')
const q = query(colRef, orderBy('createdAt', 'desc'))

onSnapshot(q, (snaptshot) => {
  let items = []
  snaptshot.docs.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() })
  })
  arr.set(items)
})

const del = (id) => {
  const docRef = doc(db, 'books', id)
  deleteDoc(docRef).then(()=>{
    delSound.set(true)
  })
}

function addMsg(nick, msg, nickn) {
  if (nick.trim() == '') {
    hasName.set(false)
    return
  }

  if (msg.trim() == '') {
    hasName.set(true)
    hasMsg.set(false)
    return
  }

  hasMsg.set(true)

  addDoc(colRef, {
    msg: nick + '： ' + msg,
    createdAt: serverTimestamp(),
  }).then(() => {
    addSound.set(true)
    msg = ''
  })

  hasName.set(true)
  nickn.disabled = true
  nickn.style.display = 'none'
}

export { fbconfig, colRef, db, del, addMsg }
