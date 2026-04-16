<template>
  <div>
    <div class="listen-bubble">「{{ lines[cur] }}」</div>
    <div class="dim-txt" style="margin-bottom:9px">{{ cur + 1 }} / {{ lines.length }}</div>
    <button class="gcb" style="margin:auto" @click="next">
      <span class="bg">{{ isLast ? '🙏' : '👂' }}</span>{{ isLast ? '好的，記住了' : '繼續聽' }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePetStore } from '../../stores/pet'

const store = usePetStore()

const lines = [
  '那傢伙真是煩死了，一直嘰嘰喳喳的...',
  '...工作又堆上來了。沒完沒了。',
  '外面那些人根本不懂規矩。',
  '...你聽著嗎？算了，繼續說。',
  '不管了。反正我自己解決。......謝你聽著。'
]

const cur    = ref(0)
const isLast = computed(() => cur.value >= lines.length - 1)

function next() {
  cur.value++
  if (cur.value >= lines.length) {
    store.endGame('praised', ['......嗯。你一直在聽。', '沒什麼，感謝。', '...謝了。'], 5, -10, 25)
  }
}
</script>
