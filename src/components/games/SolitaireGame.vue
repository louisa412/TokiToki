<template>
  <div>
    <div class="gp">點相同花色消除</div>
    <div class="mini-grid">
      <button v-for="(card, i) in cards" :key="i" class="mini-cell" :class="{ good: card.gone, bad: selected === i }" :disabled="done || card.gone" @click="pick(i)">
        {{ card.gone ? ' ' : card.suit + card.num }}
      </button>
    </div>
    <div class="gr" v-if="done">{{ msg }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePetStore } from '../../stores/pet'
import { gameLine } from './gameTarget'

const store = usePetStore()
const suits = ['♠', '♥', '♦', '♣']
const cards = ref([...Array(8)].map((_, i) => ({ suit: suits[Math.floor(i / 2)], num: i % 2 ? 'K' : 'A', gone: false })).sort(() => Math.random() - 0.5))
const selected = ref(-1)
const done = ref(false)
const msg = ref('')

function pick(i) {
  if (selected.value === -1) {
    selected.value = i
    return
  }
  const a = cards.value[selected.value]
  const b = cards.value[i]
  if (a.suit === b.suit && selected.value !== i) {
    a.gone = true
    b.gone = true
  }
  selected.value = -1
  if (cards.value.every(c => c.gone)) {
    done.value = true
    msg.value = gameLine(store, '清完了。{target}：...手牌整理得不錯。', '清完了。{target}：整理得很漂亮。')
    store.endGame('happy', [msg.value], 16, -10, 8)
  }
}
</script>
