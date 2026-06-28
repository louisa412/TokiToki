<template>
  <div>
    <div class="gp">照順序點 1 到 12</div>
    <div class="dim-txt" style="margin-bottom:8px">下一個：{{ next }}</div>
    <div class="mini-grid">
      <button v-for="n in nums" :key="n" class="mini-cell" :class="{ good: n < next, bad: wrong === n }" :disabled="done || n < next" @click="tap(n)">{{ n }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePetStore } from '../../stores/pet'
import { gameMsgs } from './gameTarget'

const store = usePetStore()
const nums = [...Array(12)].map((_, i) => i + 1).sort(() => Math.random() - 0.5)
const next = ref(1)
const wrong = ref(0)
const done = ref(false)

function tap(n) {
  if (n !== next.value) {
    wrong.value = n
    setTimeout(() => { wrong.value = 0 }, 350)
    return
  }
  next.value++
  if (next.value > 12) {
    done.value = true
    store.endGame('praised', gameMsgs(store, ['順序沒亂。還行。'], ['{target}：順序很穩，做得很好。']), 18, -8, 10)
  }
}
</script>
