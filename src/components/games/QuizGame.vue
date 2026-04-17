<template>
  <div>
    <div class="gp">第{{ qIdx + 1 }}/{{ questions.length }}題</div>
    <div class="quiz-q">{{ q.question }}</div>
    <div style="display:flex;flex-direction:column;gap:6px;margin-top:8px">
      <button
        v-for="(opt, i) in q.options"
        :key="i"
        class="rap-choice"
        :class="answerClass(i)"
        :disabled="answered"
        @click="pick(i)"
      >{{ opt }}</button>
    </div>
    <div class="quiz-comment" v-if="answered">{{ comment }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePetStore } from '../../stores/pet'

const store = usePetStore()

const questions = [
  {
    question: '橫濱最有名的中華街在哪個區？',
    options: ['中區', '西區', '神奈川區', '鶴見區'],
    answer: 0,
    ok: '...你知道橫濱。', wrong: '橫濱人都知道這個。去查地圖。'
  },
  {
    question: '黑咖啡的標準是什麼？',
    options: ['只有咖啡豆和水', '加少量糖', '加奶但不加糖', '即溶咖啡'],
    answer: 0,
    ok: '對。只有這樣才算。', wrong: '加東西進去就不算黑咖啡了。'
  },
  {
    question: '猜拳中剪刀贏什麼？',
    options: ['石頭', '布', '都不贏', '自己'],
    answer: 1,
    ok: '廢話。這都知道。', wrong: '...你連這個都不清楚？'
  },
  {
    question: '深夜幾點到幾點？',
    options: ['20點–24點', '22點–6點', '0點–5點', '21點–3點'],
    answer: 1,
    ok: '嗯。這個時間你應該很熟。', wrong: '深夜才不只到24點。'
  },
  {
    question: 'Toki 最討厭什麼？',
    options: ['被誇獎', '被無視', '被一直打擾', '草莓'],
    answer: 2,
    ok: '...你真的了解我。', wrong: '草莓我不討厭。只是沒要求。'
  }
]

const qIdx    = ref(0)
const score   = ref(0)
const answered = ref(false)
const picked  = ref(-1)
const comment = ref('')

const q = computed(() => questions[qIdx.value])

function answerClass(i) {
  if (!answered.value) return ''
  if (i === q.value.answer) return 'correct'
  if (i === picked.value)   return 'wrong'
  return ''
}

function pick(i) {
  if (answered.value) return
  answered.value = true
  picked.value = i
  const correct = i === q.value.answer
  if (correct) score.value++
  comment.value = correct ? q.value.ok : q.value.wrong

  setTimeout(() => {
    if (qIdx.value < questions.length - 1) {
      qIdx.value++
      answered.value = false
      picked.value = -1
      comment.value = ''
    } else {
      const s = score.value
      const perfect = s === questions.length
      const good    = s >= 3
      store.endGame(
        perfect ? 'praised' : good ? 'energetic' : 'sad',
        [
          perfect ? `全對。${s}/${questions.length}。你合格了。` : `${s}/${questions.length}。`,
          perfect ? '...知道我的事還蠻多的。' : good ? '勉強及格。' : '多了解一下我。',
        ],
        perfect ? 20 : good ? 10 : 3,
        -5,
        perfect ? 15 : good ? 8 : 2
      )
    }
  }, 1200)
}
</script>
