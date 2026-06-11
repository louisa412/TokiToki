<template>
  <div class="sleep-controls" :class="{ duo: store.hasActiveVisitor }">
    <div class="sleep-group">
      <div v-if="store.hasActiveVisitor" class="sleep-name">{{ store.tokiName }}</div>
      <div class="sleep-bar">
        <button
          class="sleep-btn nap-btn"
          :class="{ 'wake-btn': store.sleeping === 'nap' }"
          :disabled="store.reacting || store.sleeping === 'bed'"
          @click="napClick('toki')"
        >
          <div class="sleep-ico">😪</div>
          <div class="sleep-label">{{ napLabel('toki') }}</div>
        </button>

        <button
          class="sleep-btn bed-btn"
          :class="{ 'wake-btn': store.sleeping === 'bed' }"
          :disabled="store.reacting || store.sleeping === 'nap'"
          @click="bedClick('toki')"
        >
          <div class="sleep-ico">🌙</div>
          <div class="sleep-label">{{ bedLabel('toki') }}</div>
        </button>
      </div>
    </div>

    <div v-if="store.hasActiveVisitor" class="sleep-group">
      <div class="sleep-name">{{ store.activeVisitorName }}</div>
      <div class="sleep-bar">
        <button
          class="sleep-btn nap-btn"
          :class="{ 'wake-btn': store.visitorSleeping === 'nap' }"
          :disabled="store.reacting || store.visitorSleeping === 'bed'"
          @click="napClick('visitor')"
        >
          <div class="sleep-ico">😪</div>
          <div class="sleep-label">{{ napLabel('visitor') }}</div>
        </button>

        <button
          class="sleep-btn bed-btn"
          :class="{ 'wake-btn': store.visitorSleeping === 'bed' }"
          :disabled="store.reacting || store.visitorSleeping === 'nap'"
          @click="bedClick('visitor')"
        >
          <div class="sleep-ico">🌙</div>
          <div class="sleep-label">{{ bedLabel('visitor') }}</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePetStore } from '../stores/pet'
import { _fmtTime } from '../stores/pet'

const store = usePetStore()

function sleepType(target) {
  return target === 'visitor' ? store.visitorSleeping : store.sleeping
}

function sleepRemaining(target) {
  return target === 'visitor' ? store.sleepRemainingVisitor : store.sleepRemaining
}

function napLabel(target) {
  if (sleepType(target) === 'nap') return '叫醒 ' + _fmtTime(sleepRemaining(target))
  return '小睡 10 分'
}

function bedLabel(target) {
  if (sleepType(target) === 'bed') {
    return sleepRemaining(target) > 0 ? '剩 ' + _fmtTime(sleepRemaining(target)) : '叫醒'
  }
  return '睡 8 小時'
}

function napClick(target) {
  if (sleepType(target) === 'nap') store.wakeUp(true, target)
  else store.doSleep('nap', target)
}

function bedClick(target) {
  if (sleepType(target) === 'bed') store.wakeUp(false, target)
  else store.doSleep('bed', target)
}
</script>
