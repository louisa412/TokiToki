<template>
  <div>
    <div class="gp" style="margin-bottom:10px">帶{{ targetName }}去哪裡？</div>

    <!-- ── 選地點 ── -->
    <div v-if="phase === 'pick'" class="loc-grid">
      <button
        v-for="loc in pool"
        :key="loc.id"
        class="loc-btn"
        @click="pick(loc)"
      >
        <span v-if="hasVisited(loc.id)" class="vis-dot">●</span>
        {{ loc.name }}
      </button>
    </div>

    <!-- ── 散步結果 ── -->
    <div v-if="phase === 'result'" class="loc-result">
      <div class="loc-name">📍 {{ selectedLoc.name }}</div>
      <div class="loc-msg">{{ resultDialogue }}</div>
      <div v-if="resultEvent" class="loc-event">{{ resultEvent.text }}</div>
      <div v-if="resultItem" class="loc-item">🎒 撿到了：{{ resultItem.name }}</div>
      <button class="loc-btn" style="margin-top:14px" @click="confirmResult">好</button>
    </div>

    <!-- ── 拒絕去：詢問是否求他 ── -->
    <div v-if="phase === 'refused'" class="loc-result">
      <div class="loc-name">📍 {{ selectedLoc.name }}</div>
      <div class="loc-msg">{{ refusalText }}</div>
      <div style="margin-top:12px; display:flex; gap:8px; justify-content:center;">
        <button class="loc-btn" @click="doPetition">⋯⋯求他去看看</button>
        <button class="loc-btn" style="opacity:0.5" @click="cancel">算了</button>
      </div>
    </div>

    <!-- ── 求他之後的結果 ── -->
    <div v-if="phase === 'petition'" class="loc-result">
      <div class="loc-name">📍 {{ selectedLoc.name }}</div>
      <div class="loc-msg">{{ petitionDialogue }}</div>
      <button v-if="petitionEnded" class="loc-btn" style="margin-top:14px" @click="confirmResult">好</button>
    </div>

    <!-- 去過幾個地方 -->
    <div v-if="phase === 'pick'" class="dim-txt" style="margin-top:7px">
      去過：{{ visitedCount }} 個地方
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { usePetStore } from '../../stores/pet'
import {
  pickWalkPool,
  executeWalk,
  petitionWalk,
  isNightTime
} from '../../systems/walkSystem'
import { formatGameText, gameTargetName, isIchiroGame } from './gameTarget'

const store = usePetStore()
const ichiroMode = isIchiroGame(store)
const targetName = gameTargetName(store)

const pool            = ref([])
const phase           = ref('pick')   // 'pick' | 'result' | 'refused' | 'petition'
const selectedLoc     = ref(null)
const resultDialogue  = ref('')
const resultEvent     = ref(null)
const resultItem      = ref(null)
const refusalText     = ref('')
const petitionDialogue = ref('')
const petitionEnded   = ref(false)
const pendingRewards  = ref(null)   // { mood, affection, dialogue }

// ── 已去過的地點 ──
const visitedCount = computed(() => {
  if (!store.locationMemory) return 0
  return Object.values(store.locationMemory).filter(m => m.visitCount > 0).length
})

function hasVisited(id) {
  return !!(store.locationMemory?.[id]?.visitCount > 0)
}

onMounted(() => {
  pool.value = pickWalkPool(store)
})

// ── 玩家選擇地點 ──
function pick(loc) {
  selectedLoc.value = loc

  if (ichiroMode) {
    const result = executeIchiroWalk(loc)
    resultDialogue.value = result.dialogue
    resultEvent.value    = result.event
    resultItem.value     = null
    phase.value          = 'result'
    pendingRewards.value = {
      mood: result.rewards.mood,
      affection: result.rewards.affection,
      dialogue: result.dialogue
    }
    return
  }

  const result = executeWalk(store, loc.id, store.aff, isNightTime())

  // 拒絕去
  if (result.refused) {
    const prog = loc.dislikedProgression
    refusalText.value = prog[prog.length - 1].text
    phase.value = 'refused'
    return
  }

  // 正常散步
  resultDialogue.value = result.dialogue || '...'
  resultEvent.value    = result.event    || null
  resultItem.value     = result.event?.item || null

  if (resultItem.value) {
    store.addToInventory(resultItem.value)
  }

  phase.value = 'result'

  const { mood = 0, affection = 0 } = result.rewards
  pendingRewards.value = { mood, affection, dialogue: result.dialogue || '...不錯。' }
}

// ── 求他去 ──
function doPetition() {
  if (ichiroMode) return
  const result = petitionWalk(store, selectedLoc.value.id, store.aff)
  petitionDialogue.value = result.dialogue
  phase.value = 'petition'

  if (result.success && result.walkResult) {
    if (result.walkResult.event?.item) {
      store.addToInventory(result.walkResult.event.item)
    }
    const { mood = 0, affection = 0 } = result.walkResult.rewards
    pendingRewards.value = { mood, affection, dialogue: result.dialogue }
    petitionEnded.value  = true
  } else {
    if (result.affectionPenalty) {
      store._addTokiAffinity(result.affectionPenalty)
      store.save()
    }
    petitionEnded.value = true
    setTimeout(() => store.closeGame(), 2500)
  }
}

// ── 看完，關閉 ──
function confirmResult() {
  const p = pendingRewards.value
  if (p) {
    store.endGame('happy', [p.dialogue], p.mood, 0, p.affection)
    pendingRewards.value = null
  } else {
    store.closeGame()
  }
}

// ── 不求了，換一組地點 ──
function cancel() {
  pool.value = pickWalkPool(store)
  phase.value = 'pick'
}

function executeIchiroWalk(loc) {
  rememberVisit(loc.id)
  const event = Math.random() < 0.35 ? pickIchiroEvent(loc) : null
  const mood = (loc.rewards?.mood || 8) + (event?.mood || 0)
  const affection = (loc.rewards?.affection || 5) + (event?.affection || 0)
  return {
    dialogue: formatGameText(store, pickIchiroDialogue(loc, event)),
    event,
    rewards: { mood, affection }
  }
}

function rememberVisit(id) {
  if (!store.locationMemory) store.locationMemory = {}
  if (!store.locationMemory[id]) {
    store.locationMemory[id] = { visitCount: 0, displeasure: 0, lastVisited: null, refusedUntil: null }
  }
  store.locationMemory[id].visitCount++
  store.locationMemory[id].lastVisited = Date.now()
}

function pickIchiroDialogue(loc, event) {
  if (event) return event.dialogue
  const loved = loc.preference === 'loved'
  const night = isNightTime()
  const lines = loved
    ? [
        `{target}：${loc.name}很舒服。謝謝你帶我來。`,
        `{target}：這裡的氣氛很好，我想多看一下。`,
        night ? `{target}：晚上的${loc.name}很安靜。` : `{target}：白天來這裡也很好。`
      ]
    : [
        `{target}：${loc.name}啊。慢慢走吧。`,
        `{target}：能一起出來，我很開心。`,
        night ? '{target}：夜風有點涼，但很舒服。' : '{target}：今天的光線很好。'
      ]
  return lines[Math.floor(Math.random() * lines.length)]
}

function pickIchiroEvent(loc) {
  const events = [
    { text: '{target} 在路邊停下來看街燈。', dialogue: '{target}：這裡的光很漂亮。', mood: 8, affection: 4 },
    { text: '你們找到一張空長椅坐了一下。', dialogue: '{target}：休息一下也很好。', mood: 6, affection: 3 },
    { text: '路上有點擁擠，{target} 放慢腳步。', dialogue: '{target}：人有點多，我們走旁邊吧。', mood: -3, affection: 2 }
  ]
  if (loc.category === 'sea' || loc.category === 'park') {
    events.push({ text: '風吹過來，{target} 看起來很放鬆。', dialogue: '{target}：這裡很適合散步。', mood: 10, affection: 5 })
  }
  const event = events[Math.floor(Math.random() * events.length)]
  return {
    ...event,
    text: formatGameText(store, event.text),
    dialogue: formatGameText(store, event.dialogue)
  }
}
</script>
