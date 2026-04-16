<template>
  <div>
    <div class="gp">出拳！</div>
    <div class="gb" v-if="!result">
      <button class="gcb" @click="play('rock')">   <span class="bg">✊</span>石頭</button>
      <button class="gcb" @click="play('scissors')"><span class="bg">✌️</span>剪刀</button>
      <button class="gcb" @click="play('paper')">  <span class="bg">✋</span>布</button>
    </div>
    <div v-if="result" class="gr" :class="result.cls" v-html="result.html"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePetStore } from '../../stores/pet'

const store = usePetStore()
const emit  = defineEmits(['done'])
const result = ref(null)

const OPTS = ['rock', 'scissors', 'paper']
const NM   = { rock: '✊石頭', scissors: '✌️剪刀', paper: '✋布' }

function play(choice) {
  const tok = OPTS[Math.floor(Math.random() * 3)]
  let cls, txt, dm, da

  if (choice === tok) {
    cls = 'rd'; txt = '平手。又來？'; dm = 3; da = 2
  } else if (
    (choice === 'rock'     && tok === 'scissors') ||
    (choice === 'scissors' && tok === 'paper') ||
    (choice === 'paper'    && tok === 'rock')
  ) {
    cls = 'rw'; txt = '你贏了。手氣好而已。'; dm = 8; da = 5
  } else {
    cls = 'rl'; txt = '輸了？哈。果然。'; dm = 12; da = 5
  }

  result.value = { cls, html: `Toki出了 ${NM[tok]}<br><span class="${cls}">${txt}</span>` }
  store.endGame(
    'happy',
    cls === 'rl' ? ['哈。輸了吧。', '就這樣。'] : ['...只是手滑。', '下次不會輸的。'],
    dm, -5, da
  )
}
</script>
