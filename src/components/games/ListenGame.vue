<template>
  <div>
    <div class="listen-bubble">「{{ currentLine }}」</div>
    <div class="dim-txt" style="margin-bottom:9px">{{ cur + 1 }} / {{ session.length }}</div>
    <button class="gcb" style="margin:auto" :disabled="done" @click="next">
      <span class="bg">{{ isLast ? '🙏' : '👂' }}</span>{{ isLast ? '好的，記住了' : '繼續聽' }}
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePetStore } from '../../stores/pet'
import { gameMsgs, isIchiroGame } from './gameTarget'

const store = usePetStore()

// 根據好感度選不同風格台詞段落
const SESSIONS = {
  low: [
    ['那傢伙真的煩死了。嘰嘰喳喳沒完沒了。',
     '你懂那種感覺嗎。算了，你可能不懂。',
     '...你還在聽？',
     '反正我自己解決。謝你聽著。'],

    ['今天工作又堆上來了。沒完沒了。',
     '外面那些人根本不懂規矩。',
     '...你不用說什麼，我只是說說。',
     '你來就好。'],

    ['有時候很安靜，有時候又很煩。',
     '你不在的時候更慢。',
     '我沒有在等你。只是剛好沒別的事。',
     '...你來了就算了。'],
  ],
  mid: [
    ['你一來氣氛就變了。有點煩。但也不壞。',
     '我剛剛其實有點無聊。現在沒有。',
     '別誤會，不是因為你。',
     '......好吧，可能有一點。你可以自己理解。'],

    ['不要走太快。我還沒說完。',
     '......也沒有要說什麼。就待著。',
     '你現在有空吧。不要說沒有。',
     '再一下就好。我沒有在拜託你。'],

    ['你剛剛那樣不夠。再來一次。',
     '我說的是剛剛那個，你自己知道。',
     '不要裝傻。',
     '你要走也可以。但我會記住。'],
  ],
  high: [
    ['我好像變了。不是變好，是不一樣。',
     '以前不會在意這些。現在會。有點煩。',
     '但我沒有要改回去。',
     '......你最好記住這句話。'],

    ['你是不是故意挑這時候來。',
     '剛好卡在我最無聊的時候。',
     '我不會說謝謝。但你可以自己理解。',
     '現在這樣還行。不要太得意。'],

    ['剛剛很安靜。現在比較吵一點。',
     '我沒在等你，只是剛好你來了。',
     '有點奇怪，不過也沒差。',
     '......你還是會來就好。'],
  ]
}

const ICHIRO_SESSIONS = {
  low: [
    ['今天能一起待一下嗎？',
     '我不太會突然說很多話。',
     '不過你願意聽的話，我會慢慢說。',
     '謝謝你。'],
  ],
  mid: [
    ['最近比較習慣來這裡了。',
     'Toki 雖然嘴上不說，其實有在注意大家。',
     '你也是。你一直都有來。',
     '這樣很好。'],
  ],
  high: [
    ['有時候我會想，能遇到你們真好。',
     '不是很大的事，只是每天多了一點期待。',
     '我會珍惜這種感覺。',
     '也謝謝你一直在。'],
  ]
}

function pickSession() {
  const ichiro = isIchiroGame(store)
  const aff = ichiro ? store.playerAffinityIchiro : store.aff
  let pool
  const sessions = ichiro ? ICHIRO_SESSIONS : SESSIONS
  if (aff >= 201) pool = sessions.high
  else if (aff >= 101) pool = sessions.mid
  else pool = sessions.low
  return pool[Math.floor(Math.random() * pool.length)]
}

const session = ref(pickSession())
const cur     = ref(0)
const done    = ref(false)

const currentLine = computed(() => session.value[cur.value] ?? '')
const isLast      = computed(() => cur.value >= session.value.length - 1)

function next() {
  if (done.value) return
  if (isLast.value) {
    done.value = true
    store.endGame(
      'praised',
      gameMsgs(store, ['......嗯。你一直在聽。', '沒什麼，感謝。', '...謝了。這句忘掉。'], ['{visitor}：謝謝你聽我說。', '能慢慢講完，感覺輕鬆多了。']),
      5, -10, 25
    )
  } else {
    cur.value++
  }
}
</script>
