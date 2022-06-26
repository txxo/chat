import { writable } from 'svelte/store'
let arr = writable([])
let hasMsg = writable(true)
let hasName = writable(true)
let addSound = writable(false)
let delSound = writable(false)
export { arr, hasMsg, hasName,addSound,delSound }
