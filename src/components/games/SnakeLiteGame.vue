<template>
  <div>
    <div class="gp">吃到撞牆結算</div>
    <div class="dim-txt">分數：{{ score }}</div>
    <div class="snake-grid">
      <div v-for="cell in cells" :key="cell" class="snake-cell" :class="{ snake: snake.includes(cell), food: food === cell }">{{ food === cell ? '●' : snake.includes(cell) ? '■' : '' }}</div>
    </div>
    <div class="snake-dpad">
      <button class="dpad-btn" @click="setDir(-size)">▲</button>
      <div class="dpad-row">
        <button class="dpad-btn" @click="setDir(-1)">◄</button>
        <button class="dpad-btn" @click="setDir(1)">►</button>
      </div>
      <button class="dpad-btn" @click="setDir(size)">▼</button>
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

function setDir(newDir) {
  if (newDir === -dir.value) return
  dir.value = newDir
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
        ? gameLine(store, '活得夠久。', '{visitor}：撐得很久，很厲害。')
        : gameLine(store, '撞牆了。{name}：看路。', '撞牆了。{visitor}：下次慢慢來。')],
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

<style scoped>
.snake-dpad {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-top: 12px;
}
.dpad-row {
  display: flex;
  gap: 4px;
}
.dpad-btn {
  width: 52px;
  height: 52px;
  font-size: 20px;
  background: var(--sur);
  border: 1px solid var(--bd);
  border-radius: 4px;
  color: var(--txt);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.dpad-btn:active {
  background: rgba(64,150,232,.15);
  border-color: var(--blue);
}
</style>
