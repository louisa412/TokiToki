<template>
  <div>
    <div class="gp">躲開飛來的物件</div>
    <div class="dim-txt">撐住：{{ timeLeft }}s</div>
    <div class="mini-stage" @pointermove="move">
      <div class="player-dot" :style="{ left: player.x + '%', top: player.y + '%' }">{{ playerMark }}</div>
      <div v-for="b in bullets" :key="b.id" class="bullet-dot" :style="{ left: b.x + '%', top: b.y + '%' }">●</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePetStore } from '../../stores/pet'
import { gameLine, isIchiroGame } from './gameTarget'

const store = usePetStore()
const playerMark = isIchiroGame(store) ? 'I' : 'T'
const player = ref({ x: 50, y: 82 })
const bullets = ref([])
const timeLeft = ref(12)
let id = 0
let loop = null
let timer = null

onMounted(() => {
  loop = setInterval(tick, 80)
  timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) finish(true)
  }, 1000)
})
onUnmounted(() => { clearInterval(loop); clearInterval(timer) })

function move(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  player.value = {
    x: Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100)),
    y: Math.max(5, Math.min(92, ((e.clientY - rect.top) / rect.height) * 100))
  }
}
function tick() {
  if (Math.random() < 0.25) bullets.value.push({ id: id++, x: Math.random() * 96, y: 0, speed: 2.5 + Math.random() * 2 })
  bullets.value = bullets.value.map(b => ({ ...b, y: b.y + b.speed })).filter(b => b.y < 105)
  if (bullets.value.some(b => Math.abs(b.x - player.value.x) < 6 && Math.abs(b.y - player.value.y) < 7)) finish(false)
}
function finish(win) {
  clearInterval(loop)
  clearInterval(timer)
  store.endGame(
    win ? 'energetic' : 'helpless',
    [win
      ? gameLine(store, '躲得很乾淨。{name}：...不錯。', '躲得很乾淨。{visitor}：剛剛很集中。')
      : gameLine(store, '中彈了。{name}：看清楚再動。', '中彈了。{visitor}：還好只是遊戲。')],
    win ? 24 : 8,
    -18,
    win ? 12 : 3
  )
}
</script>
