<template>
  <div style="text-align:center">
    <div style="font-size:50px;margin:6px 0">🎤</div>
    <div class="gp">幫他擦麥克風！</div>
    <div class="pw"><div class="pf" :style="{ width: pct + '%' }"></div></div>
    <div class="dim-txt" style="margin-bottom:10px">{{ count }}/{{ MAX }}</div>
    <button class="gcb" style="margin:auto" :disabled="count >= MAX" @click="click">
      <span class="bg">✨</span>擦！
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePetStore } from '../../stores/pet'

const store = usePetStore()
const MAX   = 20
const count = ref(0)
const pct   = computed(() => (count.value / MAX) * 100)

function click() {
  if (count.value >= MAX) return
  count.value++
  if (count.value >= MAX) {
    store.endGame('patted', ['...勉強合格。', '嗯。這樣才對。', '還算用心。'], 10, -5, 20)
  }
}
</script>
