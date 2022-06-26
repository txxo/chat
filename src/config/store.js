import { writable } from 'svelte/store'
let arr = writable([])
let hasMsg = writable(true)
let hasName = writable(true)

export { arr, hasMsg, hasName }
