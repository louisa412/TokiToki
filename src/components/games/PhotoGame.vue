<template>
  <div>
    <div class="gp">限時找畫面構圖</div>
    <div class="mini-grid">
      <button v-for="(shot, i) in shots" :key="i" class="mini-cell" :class="{ good: picked === i && shot.good, bad: picked === i && !shot.good }" :disabled="picked !== -1" @click="pick(i)">
        {{ shot.ico }}
      </button>
    </div>
    <div class="gr" v-if="picked !== -1">{{ msg }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePetStore } from '../../stores/pet'
import { gameLine } from './gameTarget'

const store = usePetStore()
const goodAt = Math.floor(Math.random() * 8)
const shots = Array.from({ length: 8 }, (_, i) => ({ ico: ['🚏', '🌆', '☕', '🚲', '🪟', '🌧', '🎧', '🛤'][i], good: i === goodAt }))
const picked = ref(-1)
const msg = ref('')

function pick(i) {
  picked.value = i
  const good = shots[i].good
  msg.value = good
    ? gameLine(store, 'Toki：...這張不錯。', 'Ichiro：光線很溫柔，拍得很好。')
    : gameLine(store, 'Toki：焦點跑掉了。', 'Ichiro：焦點有點跑掉了，但氣氛很好。')
  store.endGame(good ? 'praised' : 'happy', [msg.value], good ? 20 : 10, -5, good ? 10 : 5)
}
</script>
