<template>
  <div class="sleep-bar">
    <!-- NAP -->
    <button
      class="sleep-btn nap-btn"
      :class="{ 'wake-btn': store.sleeping === 'nap' }"
      :disabled="store.sleeping === 'bed'"
      @click="napClick"
    >
      <div class="sleep-ico">😪</div>
      <div class="sleep-label">{{ napLabel }}</div>
    </button>

    <!-- BED -->
    <button
      class="sleep-btn bed-btn"
      :class="{ 'wake-btn': store.sleeping === 'bed' }"
      :disabled="store.sleeping === 'nap'"
      @click="bedClick"
    >
      <div class="sleep-ico">🌙</div>
      <div class="sleep-label">{{ bedLabel }}</div>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePetStore } from '../stores/pet'
import { _fmtTime } from '../stores/pet'

const store = usePetStore()

const napLabel = computed(() => {
  if (store.sleeping === 'nap') return '叫醒他 ' + _fmtTime(store.sleepRemaining)
  return '10 分鐘'
})

const bedLabel = computed(() => {
  if (store.sleeping === 'bed') {
    return store.sleepRemaining > 0 ? '剩 ' + _fmtTime(store.sleepRemaining) : '叫醒他'
  }
  return '8 小時'
})

function napClick() {
  if (store.sleeping === 'nap') store.wakeUp(true)
  else store.doSleep('nap')
}

function bedClick() {
  if (store.sleeping === 'bed') store.wakeUp(false)
  else store.doSleep('bed')
}
</script>
