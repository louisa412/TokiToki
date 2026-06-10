<template>
  <div>
    <div class="gp">吃到撞牆結算</div>
    <div class="dim-txt">分數：{{ score }}</div>
    <div class="snake-grid">
      <button v-for="cell in cells" :key="cell" class="snake-cell" :class="{ snake: snake.includes(cell), food: food === cell }" @click="turn(cell)">{{ food === cell ? '●' : snake.includes(cell) ? '■' : '' }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePetStore } from '../../stores/pet'
import { gameLine } from './gameTarget'

const store = usePetStore()
const size = 8
const cells = Array.from({ length: size * size }, (_, i) => i)
const snake = ref([27, 28])
const food = ref(36)
const dir = ref(1)
const score = ref(0)
let loop = null

onMounted(() => { loop = setInterval(step, 380) })
onUnmounted(() => clearInterval(loop))

function turn(cell) {
  const head = snake.value[snake.value.length - 1]
  const hx = head % size
  const hy = Math.floor(head / size)
  const cx = cell % size
  const cy = Math.floor(cell / size)
  if (Math.abs(cx - hx) > Math.abs(cy - hy)) dir.value = cx > hx ? 1 : -1
  else dir.value = cy > hy ? size : -size
}
function placeFood() {
  let next = Math.floor(Math.random() * cells.length)
  while (snake.value.includes(next)) next = Math.floor(Math.random() * cells.length)
  food.value = next
}
function step() {
  const head = snake.value[snake.value.length - 1]
  const next = head + dir.value
  const hitWall = next < 0 || next >= cells.length || (dir.value === 1 && head % size === size - 1) || (dir.value === -1 && head % size === 0)
  if (hitWall || snake.value.includes(next)) {
    clearInterval(loop)
    store.endGame(
      score.value >= 4 ? 'energetic' : 'sad',
      [score.value >= 4
        ? gameLine(store, '活得夠久。', 'Ichiro：撐得很久，很厲害。')
        : gameLine(store, '撞牆了。Toki：看路。', '撞牆了。Ichiro：下次慢慢來。')],
      score.value >= 4 ? 20 : 8,
      -18,
      score.value >= 4 ? 9 : 3
    )
    return
  }
  snake.value.push(next)
  if (next === food.value) {
    score.value++
    placeFood()
  } else {
    snake.value.shift()
  }
}
</script>
