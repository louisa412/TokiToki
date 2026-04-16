<template>
  <div class="action-panel">
    <!-- Tab bar -->
    <div class="tab-bar">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >{{ tab.label }}</button>
    </div>

    <!-- Panels -->
    <div class="tab-panels">
      <div class="tab-panel" :class="{ active: activeTab === 'interact' }">
        <InteractTab @toast="$emit('toast', $event)" />
      </div>
      <div class="tab-panel" :class="{ active: activeTab === 'food' }">
        <FoodTab @toast="$emit('toast', $event)" />
      </div>
      <div class="tab-panel" :class="{ active: activeTab === 'games' }">
        <GamesTab @open-game="$emit('open-game', $event)" @toast="$emit('toast', $event)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InteractTab from './InteractTab.vue'
import FoodTab     from './FoodTab.vue'
import GamesTab    from './GamesTab.vue'

defineEmits(['open-game', 'toast'])

const tabs = [
  { id: 'interact', label: '互動' },
  { id: 'food',     label: '餵食' },
  { id: 'games',    label: '遊戲' }
]
const activeTab = ref('interact')
</script>
