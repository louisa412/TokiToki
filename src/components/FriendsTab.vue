<template>
  <div class="friends-tab">
    <div class="friend-status">
      <div>
        <div class="friend-title">交朋友</div>
        <div class="friend-sub">
          {{ store.hasActiveVisitor
            ? `${store.activeVisitorName} 來訪中`
            : store.visitorUnlocked ? '選一個朋友來訪' : '尚未開啟朋友來訪' }}
        </div>
      </div>
      <button
        v-if="store.hasActiveVisitor"
        class="friend-toggle"
        :disabled="store.reacting"
        @click="store.sendVisitorHome()"
      >送客</button>
    </div>

    <!-- 訪客選擇 -->
    <div v-if="!store.hasActiveVisitor && store.visitorUnlocked" class="visitor-picker">
      <button
        v-for="v in availableVisitors"
        :key="v.id"
        class="visitor-btn"
        :disabled="store.reacting"
        @click="store.callVisitor(v.id)"
      >
        <img :src="`${base}images/${v.id}/happy.png`" class="visitor-av" :alt="v.name" @error="onAvError" />
        <div class="visitor-btn-name">{{ v.name }}</div>
        <div class="visitor-rel">{{ relLabel(v.id) }}</div>
      </button>
    </div>

    <!-- 首次開啟 -->
    <div v-if="!store.visitorUnlocked" class="visitor-unlock-area">
      <button class="friend-toggle" :disabled="store.reacting" @click="store.unlockVisitor('ichiro')">開啟</button>
    </div>

    <!-- 來訪中：關係條 + 雙人互動 -->
    <template v-if="store.hasActiveVisitor">
      <div class="relationship-card">
        <div class="relationship-head">
          <span>{{ store.tokiName }} × {{ store.activeVisitorName }}</span>
          <strong>{{ store.relationshipTitle }}</strong>
        </div>
        <div class="bbg rel-meter">
          <div class="bar rel" :style="{ width: `${relationshipPct}%` }"></div>
        </div>
        <div class="relationship-num">{{ Math.round(store.currentRelationship) }} / 300</div>
      </div>

      <div class="interact-grid duo-grid">
        <button
          v-for="action in DUO_ACTIONS"
          :key="action.id"
          class="act-btn duo-btn"
          :class="{ locked: store.currentRelationship < action.minRel || !store.hasActiveVisitor }"
          :disabled="store.reacting || store.targetIsSleeping('duo')"
          @click="handleDuo(action)"
        >
          <span class="ai">{{ action.ico }}</span>
          <span class="an">{{ action.name }}</span>
          <span v-if="!store.hasActiveVisitor" class="lock-hint">來訪限定</span>
          <span v-else-if="store.currentRelationship < action.minRel" class="lock-hint">關係 {{ action.minRel }}+</span>
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePetStore, DUO_ACTIONS } from '../stores/pet'
import { CHARACTERS } from '../data/characters'

const store = usePetStore()
const emit = defineEmits(['toast'])
const base = import.meta.env.BASE_URL

const availableVisitors = computed(() => {
  const visitors = []
  // Ichiro は常に追加可能（NPC）
  if (store.selectedCharacter !== 'ichiro') {
    visitors.push({ id: 'ichiro', name: 'Ichiro' })
  }
  // 他のプレイアブルキャラクター
  for (const c of CHARACTERS) {
    if (c.id !== store.selectedCharacter) {
      visitors.push({ id: c.id, name: c.name })
    }
  }
  return visitors
})

const relationshipPct = computed(() => Math.min(Math.round(store.currentRelationship / 3), 100))

function relLabel(visitorId) {
  const key = [store.selectedCharacter, visitorId].sort().join('-')
  const rel = store.relationships[key] ?? 0
  if (rel >= 160) return '默契滿分'
  if (rel >= 100) return '好朋友'
  if (rel >= 60)  return '玩伴'
  if (rel >= 25)  return '可以聊天'
  return '剛認識'
}

function onAvError(e) {
  e.target.style.opacity = '0.3'
}

function handleDuo(action) {
  const result = store.doDuoAction(action.id)
  if (result === 'need_visitor') emit('toast', { msg: '先叫朋友來訪', type: 'blue' })
  if (result === 'locked') emit('toast', { msg: `關係需要 ${action.minRel}+`, type: 'red' })
  if (result === 'sleeping') emit('toast', { msg: '有人正在睡，雙人互動暫停', type: 'blue' })
}
</script>
