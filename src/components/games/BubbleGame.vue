<template>
  <div>
    <div class="gp">點擊移動泡泡</div>
    <div class="dim-txt">連擊：{{ combo }}　分數：{{ score }}　剩時：{{ timeLeft }}s</div>
    <div class="mini-stage">
      <button v-for="b in bubbles" :key="b.id" class="bubble-dot" :style="{ left: b.x + '%', top: b.y + '%' }" @click="pop(b)">🫧</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePetStore } from '../../stores/pet'
import { gameLine } from './gameTarget'

const store = usePetStore()
const bubbles = ref([])
const score = ref(0)
const combo = ref(0)
const timeLeft = ref(10)
let timer = null
let spawnTimer = null
let id = 0

onMounted(() => {
  spawnTimer = setInterval(spawn, 450)
  timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) finish()
  }, 1000)
})
onUnmounted(() => { clearInterval(timer); clearInterval(spawnTimer) })

function spawn() {
  bubbles.value.push({ id: id++, x: 8 + Math.random() * 78, y: 8 + Math.random() * 76 })
  if (bubbles.value.length > 8) bubbles.value.shift()
}
function pop(b) {
  combo.value++
  score.value += 1 + Math.floor(combo.value / 4)
  bubbles.value = bubbles.value.filter(x => x.id !== b.id)
}
function finish() {
  clearInterval(timer)
  clearInterval(spawnTimer)
  store.endGame(
    score.value >= 18 ? 'energetic' : 'happy',
    [score.value >= 18
      ? gameLine(store, '連擊不錯。', 'Ichiro：連擊很漂亮。')
      : gameLine(store, '泡泡而已，也能玩這麼認真。', 'Ichiro：泡泡聲很舒服。')],
    score.value >= 18 ? 22 : 12,
    -18,
    score.value >= 18 ? 10 : 5
  )
}
</script>
