<template>
  <div v-if="target !== 'duo'" class="care-list">
    <div class="target-note">照護 {{ targetLabel }}</div>

    <!-- 緊急醫療 -->
    <div class="care-section-label">
      緊急醫療
      <span class="care-section-hint" v-if="!canUseUrgent">（健康需 ≤30 或生病）</span>
    </div>
    <div class="care-grid">
      <button
        v-for="item in urgentItems"
        :key="item.id"
        class="care-btn"
        :class="{ 'care-unavail': !canUseUrgent }"
        :disabled="isActionDisabled"
        @click="handle(item.id)"
      >
        <span class="ci">{{ item.ico }}</span>
        <span class="cn">{{ item.name }}</span>
      </button>
    </div>

    <!-- 日常保養 -->
    <div class="care-section-label" style="margin-top:8px">日常保養</div>
    <div class="care-grid">
      <button
        v-for="item in dailyItems"
        :key="item.id"
        class="care-btn"
        :class="{ 'care-oncd': isOnCooldown(item) }"
        :disabled="isActionDisabled"
        @click="handle(item.id)"
      >
        <span class="ci">{{ item.ico }}</span>
        <span class="cn">{{ item.name }}</span>
        <span v-if="isOnCooldown(item)" class="cd-hint">{{ cdLabel(item) }}</span>
      </button>
    </div>

    <!-- 定期體檢 -->
    <div class="care-section-label" style="margin-top:8px">定期體檢</div>
    <button
      class="care-btn care-wide"
      :class="{ 'care-used': checkupDone }"
      :disabled="isActionDisabled || checkupDone"
      @click="handle('checkup')"
    >
      <span class="ci">🩺</span>
      <span class="cn">{{ checkupDone ? '定期體檢（已完成）' : '定期體檢（限一次）' }}</span>
    </button>

  </div>
  <div v-else class="care-list">
    <div class="target-note">Toki 和 Ichiro 的雙人照護</div>
    <div class="care-grid">
      <button
        v-for="item in DUO_CARE_ACTIONS"
        :key="item.id"
        class="care-btn"
        :class="{ 'care-unavail': store.relationshipTokiIchiro < item.minRel || !store.hasActiveVisitor }"
        :disabled="isActionDisabled"
        @click="handleDuo(item)"
      >
        <span class="ci">{{ item.ico }}</span>
        <span class="cn">{{ item.name }}</span>
        <span v-if="!store.hasActiveVisitor" class="cd-hint">來訪</span>
        <span v-else-if="store.relationshipTokiIchiro < item.minRel" class="cd-hint">{{ item.minRel }}+</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePetStore } from '../stores/pet'
import { CARE_ITEMS, DUO_CARE_ACTIONS } from '../stores/pet'

const store = usePetStore()
const emit  = defineEmits(['toast'])
const props = defineProps({
  target: { type: String, default: 'toki' }
})

const urgentItems = CARE_ITEMS.filter(i => i.type === 'urgent')
const dailyItems  = CARE_ITEMS.filter(i => i.type === 'daily' || i.type === 'weekly')

const targetLabel = computed(() => props.target === 'ichiro' ? 'Ichiro' : 'Toki')
const targetHealth = computed(() => props.target === 'ichiro' ? store.hltIchiro : store.hlt)
const checkupDone = computed(() => props.target === 'ichiro' ? store.checkupDoneIchiro : store.checkupDone)
const canUseUrgent = computed(() => targetHealth.value <= 30 || (props.target === 'toki' && store.isSick))
const isActionDisabled = computed(() => store.reacting || store.targetIsSleeping(props.target))

function isOnCooldown(item) {
  const key = props.target === 'ichiro' ? `ichiro:${item.id}` : item.id
  const lastUsed   = store.careCooldowns[key] || 0
  const cooldownMs = item.cooldownHours * 3600 * 1000
  return Date.now() - lastUsed < cooldownMs
}

function cdLabel(item) {
  const key = props.target === 'ichiro' ? `ichiro:${item.id}` : item.id
  const lastUsed   = store.careCooldowns[key] || 0
  const rem        = item.cooldownHours * 3600 * 1000 - (Date.now() - lastUsed)
  if (rem <= 0) return ''
  const h = Math.floor(rem / 3600000)
  const m = Math.floor((rem % 3600000) / 60000)
  return h > 0 ? `${h}h後` : `${m}m後`
}

function handle(id) {
  store.recordClick()
  const result = store.doCare(id, props.target)
  if (result === 'refused') {
    emit('toast', { msg: `${targetLabel.value}：我沒事`, type: 'red' })
  } else if (result === 'cooldown') {
    const item = CARE_ITEMS.find(i => i.id === id)
    emit('toast', { msg: `${cdLabel(item)}才能再用`, type: 'red' })
  } else if (result === 'used') {
    emit('toast', { msg: '體檢已做過了', type: 'red' })
  } else if (result === 'disturbed') {
    emit('toast', { msg: '他不理你', type: 'red' })
  } else if (result === 'need_visitor') {
    emit('toast', { msg: '先讓 Ichiro 來訪', type: 'blue' })
  } else if (result === 'sleeping') emitSleepToast()
}

function handleDuo(item) {
  const result = store.doCare(item.id, 'duo')
  if (result === 'need_visitor') emit('toast', { msg: '先讓 Ichiro 來訪', type: 'blue' })
  else if (result === 'locked') emit('toast', { msg: `關係需要 ${item.minRel}+`, type: 'red' })
  else if (result === 'sleeping') emitSleepToast()
}

function emitSleepToast() {
  if (props.target === 'duo') emit('toast', { msg: '有人正在睡，雙人照護暫停', type: 'blue' })
  else emit('toast', { msg: `${targetLabel.value} 正在睡`, type: 'blue' })
}
</script>
