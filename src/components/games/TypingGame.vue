<template>
  <div style="text-align:center">
    <div class="gp">在時間內打出這個詞！</div>
    <div class="ty-word">{{ currentWord }}</div>
    <div class="ty-timer" :class="{ danger: timeLeft <= 2 }">⏱ {{ timeLeft }}秒</div>
    <input
      ref="inputEl"
      class="ty-input"
      v-model="typed"
      :disabled="done"
      @input="checkTyped"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      placeholder="開始輸入..."
    />
    <div class="ty-result" v-if="done">{{ resultMsg }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { usePetStore } from '../../stores/pet'

const store = usePetStore()

const WORDS = [
  '橫濱', '夜晚', '咖啡', '麥克風', '傲嬌',
  '深夜', '拉麵', '冷靜', '存在感', '這樣就好'
]

const currentWord = ref('')
const typed       = ref('')
const timeLeft    = ref(6)
const done        = ref(false)
const resultMsg   = ref('')
const inputEl     = ref(null)

let timer = null

onMounted(() => {
  currentWord.value = WORDS[Math.floor(Math.random() * WORDS.length)]
  inputEl.value?.focus()
  timer = setInterval(() => {
    if (done.value) return
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(timer)
      done.value = true
      resultMsg.value = '時間到了。慢。'
      store.endGame('sad', ['打這麼慢？', '...廢。', '下次快一點。'], 5, -8, 2)
    }
  }, 1000)
})

onUnmounted(() => clearInterval(timer))

function checkTyped() {
  if (done.value) return
  if (typed.value.trim() === currentWord.value) {
    clearInterval(timer)
    done.value = true
    const bonus = timeLeft.value >= 4
    resultMsg.value = bonus ? '速度不錯。這次承認你。' : '...勉強及格。'
    const dm = bonus ? 15 : 8
    const da = bonus ? 10 : 5
    store.endGame('praised', [bonus ? '速度可以。' : '...還行。', '比我想的快一點。', '勉強過了。'], dm, -5, da)
  }
}
</script>
