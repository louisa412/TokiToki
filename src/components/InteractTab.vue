<template>
  <div>
    <!-- 一般互動 -->
    <div class="interact-grid">
      <button
        v-for="btn in actions"
        :key="btn.id"
        class="act-btn"
        :disabled="store.reacting || store.isSleeping"
        @click="handle(btn.id)"
      >
        <span class="ai">{{ btn.ico }}</span>
        <span class="an">{{ btn.name }}</span>
      </button>
    </div>

    <!-- 好感解鎖互動 -->
    <div class="unlock-section">
      <div class="unlock-label">解鎖互動</div>
      <div class="interact-grid">
        <button
          v-for="u in UNLOCK_ACTIONS"
          :key="u.id"
          class="act-btn unlock-btn"
          :class="{
            'locked':     store.aff < u.minAff,
            'nightlocked': u.nightOnly && !store.nightMode && store.aff >= u.minAff
          }"
          :disabled="store.reacting || store.isSleeping"
          @click="handleUnlock(u)"
        >
          <span class="ai">{{ u.ico }}</span>
          <span class="an">{{ u.name }}</span>
          <span v-if="store.aff < u.minAff" class="lock-hint">💙{{ u.minAff }}+</span>
          <span v-else-if="u.nightOnly && !store.nightMode" class="lock-hint">🌙限定</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePetStore } from '../stores/pet'
import { UNLOCK_ACTIONS } from '../stores/pet'

const store = usePetStore()
const emit  = defineEmits(['toast'])

const actions = [
  { id: 'pat',     ico: '🤚', name: '摸頭' },
  { id: 'praise',  ico: '👍', name: '稱讚' },
  { id: 'poke',    ico: '👉', name: '戳他' },
  { id: 'disturb', ico: '🔔', name: '打擾' }
]

function handle(id) {
  store.recordClick()
  const result = store.doAction(id)
  if (result === 'disturbed') {
    const rem = Math.ceil((store.disturbedUntil - Date.now()) / 1000)
    emit('toast', { msg: `他現在不理你...剩${rem}秒`, type: 'red' })
  }
}

function handleUnlock(u) {
  if (store.aff < u.minAff) {
    emit('toast', { msg: `好感需要 ${u.minAff}+`, type: 'red' })
    return
  }
  if (u.nightOnly && !store.nightMode) {
    emit('toast', { msg: '這個只能在深夜做', type: 'red' })
    return
  }
  store.recordClick()
  const result = store.doAction(u.id)
  if      (result === 'cooldown')  emit('toast', { msg: '太快了，他需要時間',     type: 'red' })
  else if (result === 'not_night') emit('toast', { msg: '這個只能在深夜做',       type: 'red' })
  else if (result === 'disturbed') {
    const rem = Math.ceil((store.disturbedUntil - Date.now()) / 1000)
    emit('toast', { msg: `他現在不理你...剩${rem}秒`, type: 'red' })
  }
}
</script>
