<template>
  <div>
    <div class="target-note">{{ targetNote }}</div>
    <div v-if="target !== 'duo'" class="game-grid" id="gameGrid">
      <button
        v-for="g in GAMES"
        :key="g.id"
        class="game-btn"
        :disabled="isActionDisabled"
        @click="handle(g.id)"
      >
        <span class="gi">{{ g.ico }}</span>
        <span class="gn">{{ g.name }}</span>
      </button>
    </div>
    <div v-else class="game-grid">
      <button
        v-for="g in DUO_GAME_ACTIONS"
        :key="g.id"
        class="game-btn"
        :class="{ locked: store.relationshipTokiIchiro < g.minRel || !store.hasActiveVisitor }"
        :disabled="isActionDisabled"
        @click="handleDuo(g)"
      >
        <span class="gi">{{ g.ico }}</span>
        <span class="gn">{{ g.name }}</span>
        <span v-if="!store.hasActiveVisitor" class="lock-hint">來訪限定</span>
        <span v-else-if="store.relationshipTokiIchiro < g.minRel" class="lock-hint">關係 {{ g.minRel }}+</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePetStore } from '../stores/pet'
import { DUO_GAME_ACTIONS, GAMES } from '../stores/pet'

const store = usePetStore()
const emit  = defineEmits(['open-game', 'toast'])
const props = defineProps({
  target: { type: String, default: 'toki' }
})

const target = computed(() => props.target)
const isActionDisabled = computed(() => store.reacting || store.targetIsSleeping(props.target))
const targetNote = computed(() => {
  if (props.target === 'ichiro') return `${store.activeVisitorName} 的單獨遊戲`
  if (props.target === 'duo') return `${store.tokiName} 和 ${store.activeVisitorName} 的雙人遊戲`
  return `${store.tokiName} 的單獨遊戲`
})

function handle(id) {
  store.recordClick()
  const result = store.openGame(id, props.target)
  if (result === 'disturbed') {
    const rem = Math.ceil((store.disturbedUntil - Date.now()) / 1000)
    emit('toast', { msg: `他還在生氣...剩${rem}秒`, type: 'red' })
  } else if (result === 'need_visitor') {
    emit('toast', { msg: '先叫朋友來訪', type: 'blue' })
  } else if (result === 'sleeping') {
    emitSleepToast()
  } else if (result === true) {
    emit('open-game', id)
  }
}

function handleDuo(g) {
  const result = store.openGame(g.id, 'duo')
  if (result === 'need_visitor') emit('toast', { msg: '先叫朋友來訪', type: 'blue' })
  else if (result === 'locked') emit('toast', { msg: `關係需要 ${g.minRel}+`, type: 'red' })
  else if (result === 'sleeping') emitSleepToast()
}

function emitSleepToast() {
  if (props.target === 'duo') emit('toast', { msg: '有人正在睡，雙人遊戲暫停', type: 'blue' })
  else emit('toast', { msg: `${props.target === 'ichiro' ? store.activeVisitorName : store.tokiName} 正在睡`, type: 'blue' })
}
</script>
