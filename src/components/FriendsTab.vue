<template>
  <div class="friends-tab">
    <div class="friend-status">
      <div>
        <div class="friend-title">交朋友</div>
        <div class="friend-sub">
          {{ store.hasActiveVisitor ? `${store.activeVisitorName} 來訪中` : store.visitorUnlocked ? '朋友功能已開啟' : '尚未開啟朋友來訪' }}
        </div>
      </div>
      <button
        class="friend-toggle"
        :disabled="store.reacting"
        @click="toggleVisitor"
      >
        {{ store.hasActiveVisitor ? '送客' : store.visitorUnlocked ? '叫 Ichiro' : '開啟' }}
      </button>
    </div>

    <div v-if="store.hasActiveVisitor" class="relationship-card">
      <div class="relationship-head">
        <span>Toki × Ichiro</span>
        <strong>{{ store.relationshipTitle }}</strong>
      </div>
      <div class="bbg rel-meter">
        <div class="bar rel" :style="{ width: `${relationshipPct}%` }"></div>
      </div>
      <div class="relationship-num">{{ Math.round(store.relationshipTokiIchiro) }} / 300</div>
    </div>

    <div class="interact-grid duo-grid">
      <button
        v-for="action in DUO_ACTIONS"
        :key="action.id"
        class="act-btn duo-btn"
        :class="{ locked: store.relationshipTokiIchiro < action.minRel || !store.hasActiveVisitor }"
        :disabled="store.reacting || store.targetIsSleeping('duo')"
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
import { usePetStore, DUO_ACTIONS } from '../stores/pet'

const store = usePetStore()
const emit = defineEmits(['toast'])

const relationshipPct = computed(() => Math.min(Math.round(store.relationshipTokiIchiro / 3), 100))

function toggleVisitor() {
  if (store.hasActiveVisitor) {
    store.sendVisitorHome()
    return
  }
  if (store.visitorUnlocked) {
    store.callVisitor('ichiro')
  } else {
    store.unlockVisitor()
  }
}

function handleDuo(action) {
  const result = store.doDuoAction(action.id)
  if (result === 'need_visitor') emit('toast', { msg: '先讓 Ichiro 來訪', type: 'blue' })
  if (result === 'locked') emit('toast', { msg: `關係需要 ${action.minRel}+`, type: 'red' })
  if (result === 'sleeping') emit('toast', { msg: '有人正在睡，雙人互動暫停', type: 'blue' })
}
</script>
