<template>
  <div class="food-grid" id="foodGrid">
    <button
      v-for="f in FOODS"
      :key="f.id"
      class="food-btn"
      :disabled="store.reacting || store.isSleeping"
      @click="handle(f.id)"
    >
      <span class="fi">{{ f.ico }}</span>
      <div>
        <div class="fn">{{ f.name }}</div>
        <div class="fs">
          <template v-if="f.sat > 0">🍖+{{ f.sat }} </template>
          <template v-if="f.moo > 0">😊+{{ f.moo }}</template>
          <template v-if="f.moo < 0">😊{{ f.moo }}</template>
          <template v-if="f.eng > 0"> ⚡+{{ f.eng }}</template>
          <template v-if="f.aff > 0"> 💛+{{ f.aff }}</template>
          <template v-if="f.aff === 0"> 💛+0</template>
        </div>
      </div>
    </button>
  </div>
</template>

<script setup>
import { usePetStore } from '../stores/pet'
import { FOODS } from '../stores/pet'

const store = usePetStore()
const emit  = defineEmits(['toast'])

function handle(id) {
  store.recordClick()
  const result = store.doFood(id)
  if (result === 'disturbed') {
    emit('toast', { msg: '他不理你', type: 'red' })
  }
}
</script>
