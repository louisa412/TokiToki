<template>
  <div class="stats">
    <div v-if="store.isSick" class="sick-badge">🤒 感冒中</div>
    <div class="sr" v-for="s in statRows" :key="s.id">
      <div class="sl">{{ s.ico }}<br><span class="sl-txt">{{ s.label }}</span></div>
      <div class="bbg" :class="{ 'sick-bar': s.id === 'hlt' && store.isSick }">
        <div
          class="bar"
          :class="[s.colorClass, { low: s.value < 25 }]"
          :style="{ width: s.pct + '%' }"
        ></div>
      </div>
      <div class="sn">{{ s.value }}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePetStore } from '../stores/pet'

const store = usePetStore()

const statRows = computed(() => [
  { id: 'sat', ico: '🍖', label: '飽食', colorClass: 'sat', value: Math.round(store.sat), pct: Math.round(store.sat) },
  { id: 'hlt', ico: '💊', label: '健康', colorClass: 'hlt', value: Math.round(store.hlt), pct: Math.round(store.hlt) },
  { id: 'moo', ico: '💢', label: '心情', colorClass: 'moo', value: Math.round(store.moo), pct: Math.round(store.moo) },
  {
    id: 'aff', ico: '💙', label: '好感', colorClass: 'aff',
    value: Math.round(store.aff),
    pct:   Math.min(Math.round(store.aff / 3), 100)
  }
])
</script>
