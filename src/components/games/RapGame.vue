<template>
  <div>
    <div class="rap-line">Toki：「{{ current.line }}」</div>
    <div class="rap-round">第{{ roundIdx + 1 }}/{{ rounds.length }}句</div>
    <div style="display:flex;flex-direction:column;gap:6px">
      <button
        v-for="(choice, i) in current.choices"
        :key="i"
        class="rap-choice"
        :class="choiceClass(i)"
        :disabled="answered"
        @click="pick(i)"
      >{{ String.fromCharCode(65 + i) }}. {{ choice }}</button>
    </div>
    <div class="rap-score">得分：{{ score }}/{{ rounds.length }}</div>
    <div v-if="finished" class="gr" :class="resultCls">{{ resultTxt }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePetStore } from '../../stores/pet'

const store = usePetStore()

const rounds = [
  { line: '橫濱的夜，影子拖得老長',     choices: ['月亮也沉默，看著我走', '花園裡蝴蝶在飛舞', '回家吃飯啦'],     correct: 0 },
  { line: '這條路，我獨自踩過多少回',   choices: ['風吹來，帶走一點疲憊', '想要吃冰淇淋哦', '太陽公公出來了'],   correct: 0 },
  { line: '黑咖啡，苦的才對味',         choices: ['像我這種人，就該這樣活', '加很多糖才更甜', '奶茶也不錯呢'],   correct: 0 }
]

const roundIdx  = ref(0)
const score     = ref(0)
const answered  = ref(false)
const selected  = ref(-1)
const finished  = ref(false)

const current = computed(() => rounds[roundIdx.value])

const resultCls = computed(() => score.value === 3 ? 'rw' : score.value > 0 ? 'rd' : 'rl')
const resultTxt = computed(() => score.value === 3 ? '完美接龍！' : score.value > 0 ? '差一點...' : '節奏完全不對。')

function choiceClass(i) {
  if (!answered.value) return ''
  if (i === current.value.correct) return 'ok'
  if (i === selected.value) return 'ng'
  return ''
}

function pick(i) {
  if (answered.value) return
  answered.value = true
  selected.value = i
  if (i === current.value.correct) score.value++

  setTimeout(() => {
    roundIdx.value++
    if (roundIdx.value >= rounds.length) {
      finished.value = true
      const s = score.value
      store.endGame(
        s === 3 ? 'praised' : s > 0 ? 'energetic' : 'sad',
        s === 3 ? ['...不算太差。', '勉強跟上了嘛。'] : s > 0 ? ['還差一點。'] : ['節奏感零分。'],
        s === 3 ? 20 : s > 0 ? 10 : 5,
        -15,
        s === 3 ? 15 : s > 0 ? 8 : 3
      )
    } else {
      answered.value = false
      selected.value = -1
    }
  }, 750)
}
</script>
