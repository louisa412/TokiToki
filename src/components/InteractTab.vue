<template>
  <div class="interact-grid">
    <button
      v-for="btn in actions"
      :key="btn.id"
      class="act-btn"
      :disabled="store.reacting || store.isSleeping"
      @click="handle(btn.id)"
    >
      <span class="ai">{{ btn.ico }}</span>
      <span class="an">{{ btn.name }}</span>
    </button>
  </div>
</template>

<script setup>
import { usePetStore } from '../stores/pet'

const store = usePetStore()

const emit = defineEmits(['toast'])

const actions = [
  { id: 'pat',     ico: '🤚', name: '摸頭' },
  { id: 'praise',  ico: '👍', name: '稱讚' },
  { id: 'poke',    ico: '👉', name: '戳他' },
  { id: 'disturb', ico: '🔔', name: '打擾' }
]

function handle(id) {
  store.recordClick()
  const result = store.doAction(id)
  if (result === 'disturbed') {
    const rem = Math.ceil((store.disturbedUntil - Date.now()) / 1000)
    emit('toast', { msg: `他現在不理你...剩${rem}秒`, type: 'red' })
  }
}
</script>
