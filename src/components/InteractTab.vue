<template>
  <div v-if="target !== 'duo'">
    <div class="target-note">{{ targetLabel }} 的單獨互動</div>
    <!-- 一般互動 -->
    <div class="interact-grid">
      <button
        v-for="btn in actions"
        :key="btn.id"
        class="act-btn"
        :disabled="isActionDisabled"
        @click="handle(btn.id)"
      >
        <span class="ai">{{ btn.ico }}</span>
        <span class="an">{{ btn.name }}</span>
      </button>
    </div>

    <!-- 好感解鎖互動 -->
    <div v-if="target === 'toki'" class="unlock-section">
      <div class="unlock-label">{{ targetLabel }} 解鎖互動</div>
      <div class="interact-grid">
        <button
          v-for="u in UNLOCK_ACTIONS"
          :key="u.id"
          class="act-btn unlock-btn"
          :class="{
            'locked':     affinity < u.minAff,
            'nightlocked': u.nightOnly && !store.nightMode && affinity >= u.minAff
          }"
          :disabled="isActionDisabled"
          @click="handleUnlock(u)"
        >
          <span class="ai">{{ u.ico }}</span>
          <span class="an">{{ u.name }}</span>
          <span v-if="affinity < u.minAff" class="lock-hint">💙{{ u.minAff }}+</span>
          <span v-else-if="u.nightOnly && !store.nightMode" class="lock-hint">🌙限定</span>
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="target-note">{{ store.tokiName }} 和 {{ store.activeVisitorName }} 的雙人互動</div>
    <div class="interact-grid duo-grid">
      <button
        v-for="action in DUO_ACTIONS"
        :key="action.id"
        class="act-btn duo-btn"
        :class="{ locked: store.relationshipTokiIchiro < action.minRel || !store.hasActiveVisitor }"
        :disabled="isActionDisabled"
        @click="handleDuo(action)"
      >
        <span class="ai">{{ action.ico }}</span>
        <span class="an">{{ action.name }}</span>
        <span v-if="!store.hasActiveVisitor" class="lock-hint">來訪限定</span>
        <span v-else-if="store.relationshipTokiIchiro < action.minRel" class="lock-hint">關係 {{ action.minRel }}+</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePetStore } from '../stores/pet'
import { DUO_ACTIONS, UNLOCK_ACTIONS } from '../stores/pet'

const store = usePetStore()
const emit  = defineEmits(['toast'])
const props = defineProps({
  target: { type: String, default: 'toki' }
})

const targetLabel = computed(() => props.target === 'ichiro' ? store.activeVisitorName : store.tokiName)
const affinity = computed(() => props.target === 'ichiro' ? store.playerAffinityIchiro : store.playerAffinityToki)
const isActionDisabled = computed(() => store.reacting || store.targetIsSleeping(props.target))

const actions = [
  { id: 'pat',     ico: '🤚', name: '摸頭' },
  { id: 'praise',  ico: '👍', name: '稱讚' },
  { id: 'idle_together', ico: '😮‍💨', name: '一起發呆' },
  { id: 'poke',    ico: '👉', name: '戳他' },
  { id: 'disturb', ico: '🔔', name: '打擾' }
]

function handle(id) {
  store.recordClick()
  const result = store.doAction(id, props.target)
  if (result === 'disturbed') {
    const rem = Math.ceil((store.disturbedUntil - Date.now()) / 1000)
    emit('toast', { msg: `他現在不理你...剩${rem}秒`, type: 'red' })
  } else if (result === 'need_visitor') {
    emit('toast', { msg: '先讓訪客來訪', type: 'blue' })
  } else if (result === 'cooldown') {
    emit('toast', { msg: '剛剛才發呆過，再等一下', type: 'blue' })
  } else if (result === 'sleeping') emitSleepToast()
}

function handleUnlock(u) {
  if (affinity.value < u.minAff) {
    emit('toast', { msg: `好感需要 ${u.minAff}+`, type: 'red' })
    return
  }
  if (u.nightOnly && !store.nightMode) {
    emit('toast', { msg: '這個只能在深夜做', type: 'red' })
    return
  }
  store.recordClick()
  const result = store.doAction(u.id, props.target)
  if      (result === 'cooldown')  emit('toast', { msg: '太快了，他需要時間',     type: 'red' })
  else if (result === 'not_night') emit('toast', { msg: '這個只能在深夜做',       type: 'red' })
  else if (result === 'need_visitor') emit('toast', { msg: '先讓訪客來訪', type: 'blue' })
  else if (result === 'sleeping') emitSleepToast()
  else if (result === 'disturbed') {
    const rem = Math.ceil((store.disturbedUntil - Date.now()) / 1000)
    emit('toast', { msg: `他現在不理你...剩${rem}秒`, type: 'red' })
  }
}

function handleDuo(action) {
  const result = store.doDuoAction(action.id)
  if (result === 'need_visitor') emit('toast', { msg: '先讓訪客來訪', type: 'blue' })
  if (result === 'locked') emit('toast', { msg: `關係需要 ${action.minRel}+`, type: 'red' })
  if (result === 'sleeping') emitSleepToast()
}

function emitSleepToast() {
  if (props.target === 'duo') emit('toast', { msg: '有人正在睡，雙人互動暫停', type: 'blue' })
  else emit('toast', { msg: `${targetLabel.value} 正在睡`, type: 'blue' })
}
</script>
