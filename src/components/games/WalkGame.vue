<template>
  <div>
    <div class="gp" style="margin-bottom:10px">帶Toki去散步</div>
    <div class="loc-grid">
      <button
        v-for="loc in locs"
        :key="loc.id"
        class="loc-btn"
        :class="{ vis: visited.has(loc.id) }"
        :disabled="visited.has(loc.id)"
        @click="visit(loc.id)"
      >{{ visited.has(loc.id) ? '✓ ' : '' }}{{ loc.name }}</button>
    </div>
    <div v-if="lastMsg" class="loc-msg">{{ lastMsg }}</div>
    <div class="dim-txt" style="margin-top:7px">已走：{{ visited.size }}/{{ locs.length }}</div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { usePetStore } from '../../stores/pet'

const store = usePetStore()

const locs = [
  { id: 'mm', name: '港未來21',   msg: '摩天輪的方向，他沒說話，只是看著。' },
  { id: 'ct', name: '中華街',     msg: '人很多。他拉低帽簷，繼續往前走。' },
  { id: 'yp', name: '山下公園',   msg: '海風很大。他深呼吸了一口。' },
  { id: 'mo', name: '元町商店街', msg: '他在某個角落停了一下。說了句「不錯」。' },
  { id: 'kk', name: '関内',       msg: '老街區。他說這裡才是真正的橫濱。' },
  { id: 'dk', name: '大黒埠頭',   msg: '港口的味道。他點起香菸，沉默著。' }
]

const visited = reactive(new Set())
const lastMsg = ref('')

function visit(id) {
  const loc = locs.find(l => l.id === id)
  if (!loc || visited.has(id)) return
  visited.add(id)
  lastMsg.value = loc.msg
  if (visited.size >= locs.length) {
    store.endGame('happy', ['...走夠了。不壞。', '橫濱就是這樣。', '...謝了。這句忘掉。'], 15, -30, 15)
  }
}
</script>
