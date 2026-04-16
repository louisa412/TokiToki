<template>
  <div class="game-grid" id="gameGrid">
    <button
      v-for="g in GAMES"
      :key="g.id"
      class="game-btn"
      :disabled="store.reacting || store.isSleeping"
      @click="handle(g.id)"
    >
      <span class="gi">{{ g.ico }}</span>
      <span class="gn">{{ g.name }}</span>
    </button>
  </div>
</template>

<script setup>
import { usePetStore } from '../stores/pet'
import { GAMES } from '../stores/pet'

const store = usePetStore()
const emit  = defineEmits(['open-game', 'toast'])

function handle(id) {
  store.recordClick()
  const result = store.openGame(id)
  if (result === 'disturbed') {
    const rem = Math.ceil((store.disturbedUntil - Date.now()) / 1000)
    emit('toast', { msg: `他還在生氣...剩${rem}秒`, type: 'red' })
  } else if (result === true) {
    emit('open-game', id)
  }
}
</script>
