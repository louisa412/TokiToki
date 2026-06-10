<template>
  <div>
    <div class="gp">硬幣在哪隻手？</div>
    <div class="gb" v-if="!picked">
      <button class="gcb" @click="pick('left')"> <span class="bg">🤜</span>左手</button>
      <button class="gcb" @click="pick('right')"><span class="bg">🤛</span>右手</button>
    </div>
    <div v-if="picked" class="gr" :class="win ? 'rw' : 'rl'">
      正確是{{ answer === 'left' ? '🤜左手' : '🤛右手' }}<br>{{ win ? '猜對了。運氣不錯。' : '...猜錯了。' }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePetStore } from '../../stores/pet'

const store  = usePetStore()
const answer = ref(Math.random() < 0.5 ? 'left' : 'right')
const picked = ref(false)
const win    = ref(false)

function pick(choice) {
  if (picked.value) return
  picked.value = true
  win.value = choice === answer.value
  store.endGame(
    win.value ? 'happy' : 'energetic',
    win.value ? ['運氣還行。', '哼。'] : ['哈。猜錯了。'],
    5, -5, win.value ? 5 : 3
  )
}
</script>
