<template>
  <div class="food-grid" id="foodGrid">
    <button
      v-for="f in visibleFoods"
      :key="f.id"
      class="food-btn"
      :class="{ 'food-night': f.nightOnly }"
      :disabled="store.reacting || store.isSleeping"
      @click="handle(f.id)"
    >
      <span class="fi">{{ f.ico }}</span>
      <div>
        <div class="fn">{{ f.name }}</div>
        <div class="fs">
          <template v-if="f.sat > 0">🍖+{{ f.sat }} </template>
          <template v-if="f.hlt > 0"> 💊+{{ f.hlt }}</template>
          <template v-if="f.hlt < 0"> 💊{{ f.hlt }}</template>
          <template v-if="f.moo > 0"> 💢+{{ f.moo }}</template>
          <template v-if="f.moo < 0"> 💢{{ f.moo }}</template>
          <template v-if="f.aff > 0"> 💙+{{ f.aff }}</template>
          <template v-if="f.healthFood"> <span class="health-food-tag">健康</span></template>
        </div>
      </div>
    </button>
    <div v-if="!store.nightMode && hasNightFoods" class="night-hint">
      🌙 深夜限定食物夜間才會出現
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePetStore } from '../stores/pet'
import { FOODS } from '../stores/pet'

const store = usePetStore()
const emit  = defineEmits(['toast'])

const hasNightFoods = FOODS.some(f => f.nightOnly)

const visibleFoods = computed(() =>
  FOODS.filter(f => !f.nightOnly || store.nightMode)
)

function handle(id) {
  store.recordClick()
  const result = store.doFood(id)
  if (result === 'disturbed') {
    emit('toast', { msg: '他不理你', type: 'red' })
  }
}
</script>
