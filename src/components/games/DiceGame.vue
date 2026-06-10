<template>
  <div style="text-align:center">
    <div class="gp">猜骰子點數大(4-6)還是小(1-3)？</div>

    <div class="dice-area">
      <span class="dice-face" :class="{ rolling }">{{ diceFace }}</span>
    </div>

    <div class="dice-score">連勝：{{ streak }} 局</div>

    <div v-if="!guessing && !rolling" class="dice-result" :class="lastResult">
      {{ resultMsg }}
    </div>

    <div style="display:flex;gap:12px;justify-content:center;margin-top:10px">
      <button class="gcb" :disabled="!guessing || rolling" @click="guess('small')">
        小 (1–3)
      </button>
      <button class="gcb" :disabled="!guessing || rolling" @click="guess('big')">
        大 (4–6)
      </button>
    </div>

    <button v-if="!guessing && !rolling" class="gcb" style="margin:12px auto 0" @click="nextRound">
      {{ streak >= 3 ? '再來' : '繼續' }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePetStore } from '../../stores/pet'

const store = usePetStore()

const FACES  = ['⚀','⚁','⚂','⚃','⚄','⚅']
const diceFace  = ref('🎲')
const rolling   = ref(false)
const guessing  = ref(true)
const streak    = ref(0)
const resultMsg = ref('')
const lastResult = ref('')
const MAX_ROUNDS = 5

let roundsPlayed = 0

function guess(choice) {
  if (!guessing.value || rolling.value) return
  guessing.value = false
  rolling.value  = true

  // Animate roll
  let ticks = 0
  const anim = setInterval(() => {
    diceFace.value = FACES[Math.floor(Math.random() * 6)]
    if (++ticks >= 10) {
      clearInterval(anim)
      rolling.value = false
      const value = Math.ceil(Math.random() * 6)
      diceFace.value = FACES[value - 1]
      const actual = value >= 4 ? 'big' : 'small'
      const win = choice === actual

      if (win) {
        streak.value++
        resultMsg.value = streak.value >= 3 ? `連勝${streak.value}局！不錯。` : '猜對了。運氣還行。'
        lastResult.value = 'win'
      } else {
        resultMsg.value = '猜錯了。沒什麼好說的。'
        lastResult.value = 'lose'
        roundsPlayed++
      }

      roundsPlayed++
      if (roundsPlayed >= MAX_ROUNDS || streak.value >= 3) {
        const good = streak.value >= 3
        setTimeout(() => {
          store.endGame(
            good ? 'happy' : 'energetic',
            [
              good ? `連勝${streak.value}局。你的運氣今天還行。` : `${streak.value}連勝。普通。`,
              good ? '...運氣這種東西真沒用。但這次承認你。' : '骰子而已。別太高興。'
            ],
            good ? 15 : 8, -5, good ? 10 : 4
          )
        }, 900)
      }
    }
  }, 80)
}

function nextRound() {
  diceFace.value = '🎲'
  resultMsg.value = ''
  lastResult.value = ''
  guessing.value = true
}
</script>
