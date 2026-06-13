<template>
  <div class="action-panel">
    <div class="tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >{{ tab.label }}</button>
    </div>
    <div class="target-bar">
      <button
        v-for="target in targets"
        :key="target.id"
        class="target-btn"
        :class="{ active: activeTarget === target.id, locked: target.needsVisitor && !store.hasActiveVisitor }"
        @click="selectTarget(target)"
      >{{ target.label }}</button>
    </div>
    <div class="tab-panels">
      <div class="tab-panel" :class="{ active: activeTab === 'interact' }">
        <InteractTab :target="activeTarget" @toast="$emit('toast', $event)" />
      </div>
      <div class="tab-panel" :class="{ active: activeTab === 'food' }">
        <FoodTab :target="activeTarget" @toast="$emit('toast', $event)" />
      </div>
      <div class="tab-panel" :class="{ active: activeTab === 'care' }">
        <CareTab :target="activeTarget" @toast="$emit('toast', $event)" />
      </div>
      <div class="tab-panel" :class="{ active: activeTab === 'friends' }">
        <FriendsTab @toast="$emit('toast', $event)" />
      </div>
      <div class="tab-panel" :class="{ active: activeTab === 'games' }">
        <GamesTab :target="activeTarget" @open-game="$emit('open-game', $event)" @toast="$emit('toast', $event)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { usePetStore } from '../stores/pet'
import InteractTab from './InteractTab.vue'
import FoodTab     from './FoodTab.vue'
import CareTab     from './CareTab.vue'
import FriendsTab  from './FriendsTab.vue'
import GamesTab    from './GamesTab.vue'

defineEmits(['open-game', 'toast'])

const store = usePetStore()

const tabs = [
  { id: 'interact', label: '互動' },
  { id: 'food',     label: '餵食' },
  { id: 'care',     label: '照護' },
  { id: 'friends',  label: '朋友' },
  { id: 'games',    label: '遊戲' }
]
const activeTab = ref('interact')
const activeTarget = ref('toki')

const targets = computed(() => [
  { id: 'toki', label: store.tokiName },
  { id: 'ichiro', label: store.activeVisitorName || '訪客', needsVisitor: true },
  { id: 'duo', label: '雙人', needsVisitor: true }
])

function selectTarget(target) {
  if (target.needsVisitor && !store.hasActiveVisitor) {
    activeTarget.value = 'toki'
    return
  }
  activeTarget.value = target.id
}

watch(() => store.hasActiveVisitor, (hasVisitor) => {
  if (!hasVisitor && activeTarget.value !== 'toki') activeTarget.value = 'toki'
})
</script>
