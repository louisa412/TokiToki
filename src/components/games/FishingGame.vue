<template>
  <div>
    <div class="gp">等魚上鉤...</div>
    <div class="mini-board" style="text-align:center">
      <div style="font-size:42px;margin:18px 0">{{ caught ? caught.ico : '🌊' }}</div>
      <div class="gr" v-if="caught">{{ caught.name }}<br>{{ caught.text }}</div>
      <button v-else class="gcb" @click="fish">收線</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePetStore } from '../../stores/pet'
import { gameLine } from './gameTarget'

const store = usePetStore()
const caught = ref(null)
const fishPool = [
  { ico: '🐟', name: '小沙丁魚', toki: '{target}：...至少不是空手。', ichiro: '{target}：小小的，很可愛。', mood: 10, aff: 5 },
  { ico: '🐠', name: '彩色小魚', toki: '{target}：顏色太亮了。普通。', ichiro: '{target}：顏色很漂亮。像海邊的光。', mood: 14, aff: 7 },
  { ico: '🦑', name: '迷路的烏賊', toki: '{target}：牠看起來比你冷靜。', ichiro: '{target}：牠是不是迷路了？有點擔心。', mood: 16, aff: 8 },
  { ico: '🐡', name: '稀有河豚', toki: '{target}：...這個不錯。你運氣還行。', ichiro: '{target}：好少見。今天運氣很好。', mood: 24, aff: 12 }
]

function fish() {
  const roll = Math.random()
  const fish = roll > 0.88 ? fishPool[3] : fishPool[Math.floor(Math.random() * 3)]
  caught.value = {
    ...fish,
    text: gameLine(store, fish.toki, fish.ichiro)
  }
  store.endGame('happy', [caught.value.text], caught.value.mood, -5, caught.value.aff)
}
</script>
