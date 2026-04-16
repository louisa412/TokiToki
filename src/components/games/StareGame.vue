<template>
  <div style="text-align:center">
    <div class="gp">撐10秒！別去點那個按鈕</div>
    <div class="st-timer">{{ timeLeft > 0 ? timeLeft : (won ? '👑' : '😑') }}</div>
    <div class="st-warn">{{ warn }}</div>
    <button class="gcb" style="margin:auto" :style="temptStyle" @click="blink" :disabled="!active">
      <span class="bg">👁</span>眨眼
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePetStore } from '../../stores/pet'

const store = usePetStore()

const timeLeft   = ref(10)
const warn       = ref('')
const active     = ref(false)
const won        = ref(false)
const temptStyle = ref({})

let countdownId = null
let temptId     = null

onMounted(() => {
  active.value = true
  countdownId = setInterval(() => {
    if (!active.value) return
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(countdownId)
      clearTimeout(temptId)
      active.value = false
      won.value = true
      store.endGame('energetic', ['...你沒眨眼。這次算你的。', '勉強認可。', '哼。不錯。'], 15, -10, 10)
    }
  }, 1000)
  scheduleTempt()
})

onUnmounted(() => {
  clearInterval(countdownId)
  clearTimeout(temptId)
})

function scheduleTempt() {
  temptId = setTimeout(() => {
    if (!active.value) return
    temptStyle.value = { transform: 'scale(1.18)', boxShadow: '0 0 18px rgba(232,64,64,.7)', borderColor: 'var(--red)' }
    warn.value = '👁 盯著我！'
    setTimeout(() => {
      temptStyle.value = {}
      warn.value = ''
    }, 350)
    scheduleTempt()
  }, 1600 + Math.random() * 2000)
}

function blink() {
  if (!active.value) return
  clearInterval(countdownId)
  clearTimeout(temptId)
  active.value = false
  store.endGame('happy', ['果然眨眼了吧。哈。', '忍不住了？', '弱。'], 10, -10, 5)
}
</script>
