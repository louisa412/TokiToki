<template>
  <div>
    <div class="gp">翻開箱子找隱藏物品</div>
    <div class="mini-grid">
      <button v-for="box in boxes" :key="box.id" class="mini-cell" :class="{ good: box.open && box.prize, bad: box.open && !box.prize }" :disabled="done || box.open" @click="open(box)">
        {{ box.open ? box.prize || '空' : '📦' }}
      </button>
    </div>
    <div class="gr" v-if="done">{{ message }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePetStore } from '../../stores/pet'
import { gameLine } from './gameTarget'

const store = usePetStore()
const prizeAt = Math.floor(Math.random() * 8)
const boxes = ref(Array.from({ length: 8 }, (_, id) => ({ id, open: false, prize: id === prizeAt ? '🎧' : '' })))
const tries = ref(0)
const done = ref(false)
const message = ref('')

function open(box) {
  box.open = true
  tries.value++
  if (box.prize || tries.value >= 3) {
    done.value = true
    const found = !!box.prize
    message.value = found
      ? gameLine(store, `找到了舊耳機。${store.tokiName}：...還能用。`, `找到了舊耳機。${store.activeVisitorName}：整理得很仔細。`)
      : gameLine(store, `只找到一堆灰。${store.tokiName}：你翻得很認真。`, `只找到一堆灰。${store.activeVisitorName}：至少確認過了。`)
    store.endGame(found ? 'happy' : 'helpless', [message.value], found ? 18 : 8, -5, found ? 9 : 4)
  }
}
</script>
