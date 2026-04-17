<template>
  <div style="text-align:center">
    <div class="gp">找出所有配對！</div>
    <div class="mem-grid">
      <button
        v-for="(card, i) in cards"
        :key="i"
        class="mem-card"
        :class="{
          flipped:  card.flipped || card.matched,
          matched:  card.matched,
          wrong:    wrongPair.includes(i)
        }"
        :disabled="card.matched || flipping || card.flipped"
        @click="flip(i)"
      >
        <span class="mem-front">{{ card.emoji }}</span>
        <span class="mem-back">?</span>
      </button>
    </div>
    <div class="ty-timer">🧠 {{ moves }}步</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePetStore } from '../../stores/pet'

const store = usePetStore()

const EMOJIS = ['🎤', '🪙', '🎯', '☕', '🍜', '🎲']

const cards     = ref([])
const flipping  = ref(false)
const selected  = ref([])
const moves     = ref(0)
const wrongPair = ref([])

onMounted(() => {
  const pairs = [...EMOJIS, ...EMOJIS]
    .sort(() => Math.random() - 0.5)
    .map(emoji => ({ emoji, flipped: false, matched: false }))
  cards.value = pairs
})

function flip(i) {
  if (flipping.value || cards.value[i].flipped) return
  cards.value[i].flipped = true
  selected.value.push(i)

  if (selected.value.length === 2) {
    flipping.value = true
    moves.value++
    const [a, b] = selected.value
    if (cards.value[a].emoji === cards.value[b].emoji) {
      cards.value[a].matched = true
      cards.value[b].matched = true
      selected.value = []
      flipping.value = false
      if (cards.value.every(c => c.matched)) {
        const perfect = moves.value <= EMOJIS.length + 2
        store.endGame(
          'happy',
          [perfect ? '記憶力還行。' : '...總算配完了。', '沒想到你記得住。', perfect ? '不錯。' : '步數太多了。'],
          perfect ? 18 : 10, -8, perfect ? 12 : 6
        )
      }
    } else {
      wrongPair.value = [a, b]
      setTimeout(() => {
        cards.value[a].flipped = false
        cards.value[b].flipped = false
        selected.value = []
        flipping.value = false
        wrongPair.value = []
      }, 800)
    }
  }
}
</script>
