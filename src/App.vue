<template>
  <div class="app">
    <!-- Header -->
    <div class="header">
      <div>
        <div class="title">T O K I T O K I</div>
        <div class="lv-badge">稱號：<span>{{ store.currentTitle }}</span></div>
      </div>
      <div class="hdr-r">
        <div class="clock">{{ clock }}</div>
        <div class="night-txt">{{ store.nightMode ? '🌙 深夜模式' : '' }}</div>
        <div class="save-dot" :class="{ flash: savePulse }" title="已存檔"></div>
      </div>
    </div>

    <!-- Character -->
    <TokiSprite />

    <!-- Stats -->
    <StatsPanel />

    <!-- Sleep controls -->
    <SleepControls />

    <!-- Tabbed actions -->
    <ActionPanel @toast="showToast" />

    <!-- Mini-game modal -->
    <GameModal />

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="toast.visible" class="toast" :class="toast.type">{{ toast.msg }}</div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePetStore } from './stores/pet'
import TokiSprite  from './components/TokiSprite.vue'
import StatsPanel  from './components/StatsPanel.vue'
import SleepControls from './components/SleepControls.vue'
import ActionPanel from './components/ActionPanel.vue'
import GameModal   from './components/GameModal.vue'

const store = usePetStore()

// ── Clock ─────────────────────────────────────────────────────────────────
const clock = ref('──:──:──')
function updateClock() {
  const d = new Date()
  const p = n => String(n).padStart(2, '0')
  clock.value = `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}

// ── Toast ──────────────────────────────────────────────────────────────────
const toast = ref({ visible: false, msg: '', type: 'gold' })
let toastTimer = null
function showToast({ msg, type = 'gold' }) {
  clearTimeout(toastTimer)
  toast.value = { visible: true, msg, type }
  toastTimer = setTimeout(() => { toast.value.visible = false }, 2800)
}

// ── Save pulse ─────────────────────────────────────────────────────────────
const savePulse = ref(false)
function triggerSavePulse() {
  savePulse.value = true
  setTimeout(() => { savePulse.value = false }, 600)
}

// ── Timers ─────────────────────────────────────────────────────────────────
let tickerId     = null
let clockId      = null
let autoSaveId   = null

onMounted(() => {
  // Load save & handle away time
  const result = store.load()
  if (result && result.elapsed) {
    const mins = Math.round(result.elapsed / 60)
    if (result.elapsed > 7200) {
      setTimeout(() => showToast({ msg: `你去哪了？${Math.floor(result.elapsed / 3600)}小時了。`, type: 'red' }), 800)
    } else if (mins > 10) {
      setTimeout(() => showToast({ msg: `你消失了${mins}分鐘...`, type: 'blue' }), 800)
    }
  }

  store.idleUpdate()
  updateClock()

  // 8s decay tick
  tickerId = setInterval(() => {
    store.tick()
    store.tickSleep()
  }, 8000)

  // 1s clock + sleep countdown
  clockId = setInterval(() => {
    updateClock()
    if (store.isSleeping) store.tickSleep()
  }, 1000)

  // 30s autosave
  autoSaveId = setInterval(() => {
    store.save()
    triggerSavePulse()
  }, 30000)

  // Save on exit
  const save = () => store.save()
  window.addEventListener('beforeunload', save)
  window.addEventListener('pagehide', save)
  document.addEventListener('visibilitychange', () => { if (document.hidden) store.save() })
})

onUnmounted(() => {
  clearInterval(tickerId)
  clearInterval(clockId)
  clearInterval(autoSaveId)
})
</script>
