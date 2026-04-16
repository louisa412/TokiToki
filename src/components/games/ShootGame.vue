<template>
  <div>
    <div style="display:flex;justify-content:space-between;margin-bottom:5px">
      <span class="dim-txt">快點擊目標！</span>
      <span class="dim-txt">命中：{{ hits }}/{{ TOTAL }}　剩時：{{ timeLeft }}s</span>
    </div>
    <div class="sf" ref="fieldRef" style="position:relative;height:180px;border:1px solid var(--bd);border-radius:2px;overflow:hidden">
      <div
        v-for="t in targets"
        :key="t.id"
        class="tgt"
        :class="{ hit: t.hit }"
        :style="{ left: t.x + '%', top: t.y + '%' }"
        @click="shoot(t)"
        @touchend.prevent="shoot(t)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePetStore } from '../../stores/pet'

const store    = usePetStore()
const TOTAL    = 6
const hits     = ref(0)
const timeLeft = ref(12)
const targets  = ref([])
const active   = ref(false)

let countdownId = null
let spawnIds    = []
let idCounter   = 0

onMounted(() => {
  active.value = true
  countdownId = setInterval(() => {
    if (!active.value) return
    timeLeft.value--
    if (timeLeft.value <= 0) finish()
  }, 1000)
  spawnAll()
})

onUnmounted(() => {
  clearInterval(countdownId)
  spawnIds.forEach(clearTimeout)
  active.value = false
})

function spawnAll() {
  for (let i = 0; i < TOTAL; i++) {
    const id = setTimeout(() => {
      if (!active.value) return
      const tgt = { id: idCounter++, x: 15 + Math.random() * 70, y: 15 + Math.random() * 65, hit: false }
      targets.value.push(tgt)
      setTimeout(() => {
        targets.value = targets.value.filter(t => t.id !== tgt.id)
      }, 1900)
    }, i * 1900 + 400)
    spawnIds.push(id)
  }
}

function shoot(tgt) {
  if (!active.value || tgt.hit) return
  tgt.hit = true
  hits.value++
  setTimeout(() => {
    targets.value = targets.value.filter(t => t.id !== tgt.id)
  }, 180)
}

function finish() {
  active.value = false
  clearInterval(countdownId)
  spawnIds.forEach(clearTimeout)
  targets.value = []
  const h = hits.value
  store.endGame(
    h >= TOTAL * 0.7 ? 'energetic' : 'sad',
    h >= TOTAL * 0.7 ? ['...射術不差。', '哼。還行。'] : h >= TOTAL * 0.4 ? ['差不多吧。'] : ['...什麼命中率。'],
    h >= TOTAL * 0.7 ? 25 : h >= TOTAL * 0.4 ? 15 : 8,
    -20,
    h >= TOTAL * 0.7 ? 10 : 6
  )
}
</script>
