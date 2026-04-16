<template>
  <div class="stats">
    <div class="sr" v-for="s in statRows" :key="s.id">
      <div class="sl">{{ s.label }}</div>
      <div class="bbg">
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
  { id: 'sat', label: '飽食', colorClass: 'sat', value: Math.round(store.sat), pct: Math.round(store.sat) },
  { id: 'eng', label: '體力', colorClass: 'eng', value: Math.round(store.eng), pct: Math.round(store.eng) },
  { id: 'moo', label: '心情', colorClass: 'moo', value: Math.round(store.moo), pct: Math.round(store.moo) },
  {
    id: 'aff', label: '好感', colorClass: 'aff',
    value: Math.round(store.aff),
    pct: Math.min(Math.round(store.aff / 3), 100)   // 0–300 → 0–100%
  }
])
</script>
