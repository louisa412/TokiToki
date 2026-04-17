<template>
  <div class="care-list">

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
        :disabled="store.reacting || store.isSleeping"
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
        :disabled="store.reacting || store.isSleeping"
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
      :class="{ 'care-used': store.checkupDone }"
      :disabled="store.reacting || store.isSleeping || store.checkupDone"
      @click="handle('checkup')"
    >
      <span class="ci">🩺</span>
      <span class="cn">{{ store.checkupDone ? '定期體檢（已完成）' : '定期體檢（限一次）' }}</span>
    </button>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePetStore } from '../stores/pet'
import { CARE_ITEMS } from '../stores/pet'

const store = usePetStore()
const emit  = defineEmits(['toast'])

const urgentItems = CARE_ITEMS.filter(i => i.type === 'urgent')
const dailyItems  = CARE_ITEMS.filter(i => i.type === 'daily' || i.type === 'weekly')

const canUseUrgent = computed(() => store.hlt <= 30 || store.isSick)

function isOnCooldown(item) {
  const lastUsed   = store.careCooldowns[item.id] || 0
  const cooldownMs = item.cooldownHours * 3600 * 1000
  return Date.now() - lastUsed < cooldownMs
}

function cdLabel(item) {
  const lastUsed   = store.careCooldowns[item.id] || 0
  const rem        = item.cooldownHours * 3600 * 1000 - (Date.now() - lastUsed)
  if (rem <= 0) return ''
  const h = Math.floor(rem / 3600000)
  const m = Math.floor((rem % 3600000) / 60000)
  return h > 0 ? `${h}h後` : `${m}m後`
}

function handle(id) {
  store.recordClick()
  const result = store.doCare(id)
  if (result === 'refused') {
    emit('toast', { msg: 'Toki：我沒事，退開', type: 'red' })
  } else if (result === 'cooldown') {
    const item = CARE_ITEMS.find(i => i.id === id)
    emit('toast', { msg: `${cdLabel(item)}才能再用`, type: 'red' })
  } else if (result === 'used') {
    emit('toast', { msg: '體檢已做過了', type: 'red' })
  } else if (result === 'disturbed') {
    emit('toast', { msg: '他不理你', type: 'red' })
  }
}
</script>
