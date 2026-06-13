<template>
  <div>
    <div class="gp">左右移動接 {{ targetName }} 丟下來的物品</div>
    <div class="dim-txt">接到：{{ caught }}　剩時：{{ timeLeft }}s</div>
    <div class="mini-stage" @pointermove="move">
      <div class="fall-item" :style="{ left: item.x + '%', top: item.y + '%' }">{{ item.ico }}</div>
      <div class="catcher" :style="{ left: player + '%' }">🧺</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePetStore } from '../../stores/pet'
import { gameLine, gameTargetName } from './gameTarget'

const store = usePetStore()
const targetName = gameTargetName(store)
const player = ref(50)
const item = ref({ x: 50, y: 0, ico: '☕' })
const caught = ref(0)
const timeLeft = ref(12)
let loop = null
let timer = null

onMounted(() => {
  loop = setInterval(tick, 90)
  timer = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) finish()
  }, 1000)
})
onUnmounted(() => { clearInterval(loop); clearInterval(timer) })

function move(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  player.value = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100))
}
function resetItem() {
  item.value = { x: 8 + Math.random() * 84, y: 0, ico: ['☕', '🎧', '🍫', '🪙'][Math.floor(Math.random() * 4)] }
}
function tick() {
  item.value.y += 4
  if (item.value.y >= 82) {
    if (Math.abs(item.value.x - player.value) < 12) caught.value++
    resetItem()
  }
}
function finish() {
  clearInterval(loop)
  clearInterval(timer)
  store.endGame(
    caught.value >= 6 ? 'happy' : 'helpless',
    [caught.value >= 6
      ? gameLine(store, '反應不差。都接住了。', '{visitor}：接得很穩，謝謝。')
      : gameLine(store, '漏掉不少。{name}：手忙腳亂。', '漏掉不少。{visitor}：沒關係，再練就好。')],
    caught.value >= 6 ? 22 : 10,
    -18,
    caught.value >= 6 ? 10 : 4
  )
}
</script>
