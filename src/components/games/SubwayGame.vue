<template>
  <div>
    <div class="gp">地下鐵迷宮</div>

    <div v-if="!finished" class="subway-board">
      <div class="subway-route">
        <span
          v-for="(station, i) in route.stations"
          :key="station"
          class="subway-station"
          :class="{ current: i === currentIndex, done: i < currentIndex }"
        >
          {{ station }}
        </span>
      </div>

      <div class="subway-panel">
        <div class="subway-now">出發：{{ currentStation }}</div>
        <div class="subway-goal">終點：{{ route.goal }}</div>
        <div class="subway-event">{{ lastEventText }}</div>
      </div>

      <div class="subway-lines">
        <button
          v-for="option in currentOptions"
          :key="option.id"
          class="subway-line-btn"
          @click="chooseLine(option)"
        >
          <span>{{ option.name }}</span>
          <small>{{ option.note }}</small>
        </button>
      </div>

      <div class="subway-log" v-if="logs.length">
        <div v-for="(log, i) in logs.slice(-3)" :key="i">{{ log }}</div>
      </div>
    </div>

    <div v-else class="subway-board">
      <div class="subway-summary-title">今天的旅程</div>
      <div class="subway-summary">{{ summary }}</div>
      <div class="subway-log">
        <div v-for="(log, i) in logs" :key="i">{{ log }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { usePetStore } from '../../stores/pet'
import { gameLine, isIchiroGame } from './gameTarget'

const store = usePetStore()
const ichiroMode = isIchiroGame(store)

const ROUTE_JSON = {
  starts: ['澀谷站', '橫濱站', '櫻木町站', '元町・中華街站'],
  goals: ['日本大通站', '馬車道站', '港未來站', '關內站', '新高島站'],
  middle: ['代官山站', '菊名站', '反町站', '高島町站', '伊勢佐木長者町站', '阪東橋站', '石川町站'],
  lines: [
    { id: 'express', name: 'A線', note: '快但人擠', step: 1, eventType: 'crowded' },
    { id: 'local', name: 'B線', note: '慢但可能遇到事', step: 1, eventType: 'soft' },
    { id: 'transfer', name: 'C線', note: '轉乘多，路線怪', step: 0, eventType: 'delay' },
    { id: 'bay', name: '海岸線', note: '繞遠但風景好', step: 1, eventType: 'view' }
  ],
  events: {
    crowded: [
      { toki: '車廂裡有人在看你。Toki 皺眉：看什麼。', ichiro: '車廂裡有點擠。Ichiro 小聲說：我們站旁邊一點吧。', mood: -5, aff: 1 },
      { toki: '尖峰時間擠到肩膀。Toki：下次避開這班。', ichiro: '尖峰時間有點辛苦。Ichiro：下次可以避開這班。', mood: -4, aff: 2 },
      { toki: '站在門邊剛好不用擠。Toki：...算你會選。', ichiro: '站在門邊剛好不用擠。Ichiro：這裡很舒服。', mood: 3, aff: 3 }
    ],
    soft: [
      { toki: '找到空位坐下。Toki 把耳機戴上。', ichiro: '找到空位坐下。Ichiro：可以休息一下了。', stamina: 5, mood: 3, aff: 3 },
      { toki: '車廂很安靜。Toki 看起來沒那麼煩。', ichiro: '車廂很安靜。Ichiro 說這段路很舒服。', mood: 6, aff: 4 },
      { toki: '列車慢慢晃著，Toki 沒說話但也沒走開。', ichiro: '列車慢慢晃著，Ichiro 安靜地看著窗外。', mood: 4, aff: 5 }
    ],
    delay: [
      { toki: '錯過班車等了 10 分鐘。Toki：你確定會看路線圖？', ichiro: '錯過班車等了 10 分鐘。Ichiro：沒關係，慢慢來。', extraStops: 1, mood: -3, aff: 1 },
      { toki: '轉乘口施工，只好繞一圈。Toki：麻煩死了。', ichiro: '轉乘口施工，只好繞一圈。Ichiro：這邊也能到嗎？', extraStops: 1, mood: -5, aff: 2 },
      { toki: '走錯月台，但意外發現很安靜的角落。', ichiro: '走錯月台，但意外發現很安靜的角落。Ichiro 看起來很喜歡。', mood: 5, aff: 4 }
    ],
    view: [
      { toki: '偶然看到夕陽映在車窗上。Toki：...還行。', ichiro: '偶然看到夕陽映在車窗上。Ichiro：好漂亮。', mood: 10, aff: 5 },
      { toki: '高架路段看得到海。Toki 多看了一眼。', ichiro: '高架路段看得到海。Ichiro：下次可以再來。', mood: 8, aff: 5 },
      { toki: '到站，Toki 說這裡沒什麼好看的。可是他多看了兩眼。', ichiro: '到站，Ichiro 說這裡很安靜，想多待一下。', mood: 4, aff: 3 }
    ]
  }
}

const route = ref(generateRoute())
const currentIndex = ref(0)
const extraStops = ref(0)
const finished = ref(false)
const lastEventText = ref(ichiroMode ? 'Ichiro：我們慢慢看路線吧。' : 'Toki：別坐錯。')
const logs = ref([])
const totals = ref({ mood: 0, aff: 0, stamina: 0 })
const summary = ref('')
const currentOptions = ref(generateOptions(0))

const currentStation = computed(() => route.value.stations[currentIndex.value])

function generateRoute() {
  const start = pick(ROUTE_JSON.starts)
  let goal = pick(ROUTE_JSON.goals)
  while (goal === start) goal = pick(ROUTE_JSON.goals)

  const middleCount = 1 + Math.floor(Math.random() * 3)
  const middle = shuffle(ROUTE_JSON.middle)
    .filter(station => station !== start && station !== goal)
    .slice(0, middleCount)

  return {
    start,
    goal,
    stations: [start, ...middle, goal]
  }
}

function chooseLine(option) {
  const event = pick(ROUTE_JSON.events[option.eventType])
  const wentWrong = option.step === 0 || event.extraStops

  totals.value.mood += event.mood || 0
  totals.value.aff += event.aff || 0
  totals.value.stamina += event.stamina || 0
  extraStops.value += event.extraStops || 0

  const text = gameLine(store, event.toki, event.ichiro)
  lastEventText.value = text
  logs.value.push(`${currentStation.value} → ${option.name}：${text}`)

  if (wentWrong && extraStops.value > 0) {
    extraStops.value--
    return
  }

  currentIndex.value += 1
  if (currentIndex.value >= route.value.stations.length - 1) finishTrip()
  else currentOptions.value = generateOptions(currentIndex.value)
}

function finishTrip() {
  finished.value = true
  const detours = logs.value.filter(log => log.includes('錯過') || log.includes('繞') || log.includes('施工')).length
  const goodMoments = logs.value.filter(log => log.includes('夕陽') || log.includes('空位') || log.includes('海') || log.includes('安靜')).length
  const target = store.activeGameTarget || 'toki'

  if (totals.value.stamina) {
    if (target === 'ichiro') store.staIchiro = clampStat(store.staIchiro + totals.value.stamina)
    else store.sta = clampStat(store.sta + totals.value.stamina)
  }

  summary.value = buildSummary(detours, goodMoments)
  store.endGame(
    goodMoments >= detours ? 'happy' : 'helpless',
    [summary.value],
    12 + Math.max(-4, totals.value.mood),
    -10,
    6 + Math.max(0, totals.value.aff)
  )
}

function buildSummary(detours, goodMoments) {
  const from = route.value.start
  const to = route.value.goal
  if (detours >= 2) {
    return gameLine(store, `從${from}繞到${to}，中間走錯了幾段路。Toki：下次別帶我來這種地方。可是他還是把路線圖收好了。`, `從${from}繞到${to}，中間走錯了幾段路。Ichiro：雖然繞遠了，但也看到不少地方。`)
  }
  if (goodMoments >= 2) {
    return gameLine(store, `從${from}到${to}的路上，剛好遇到一些不壞的風景。Toki：...只是剛好而已。`, `從${from}到${to}的路上，剛好遇到很好的風景。Ichiro：下次也可以一起走嗎？`)
  }
  return gameLine(store, `你們從${from}搭到${to}，路線不算完美，但最後還是到了。Toki：普通。沒有很差。`, `你和 Ichiro 從${from}搭到${to}，路線不算完美，但最後還是到了。Ichiro：抵達了，辛苦了。`)
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function shuffle(arr) {
  const next = [...arr]
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = next[i]
    next[i] = next[j]
    next[j] = tmp
  }
  return next
}

function generateOptions(index) {
  const count = Math.random() > 0.55 ? 3 : 2
  return shuffle(ROUTE_JSON.lines).slice(0, count).map((line, i) => ({
    ...line,
    id: `${line.id}-${index}-${i}`
  }))
}

function clampStat(value) {
  return Math.max(0, Math.min(100, value))
}
</script>

<style scoped>
.subway-board {
  border:1px solid var(--bd);
  background:var(--s2);
  border-radius:2px;
  padding:12px;
  display:flex;
  flex-direction:column;
  gap:12px;
}
.subway-route {
  display:flex;
  gap:5px;
  align-items:center;
  overflow-x:auto;
  padding-bottom:3px;
}
.subway-station {
  flex:0 0 auto;
  border:1px solid var(--bd);
  background:var(--sur);
  color:var(--dim);
  border-radius:999px;
  padding:7px 9px;
  font-family:'Press Start 2P',monospace;
  font-size:9px;
  white-space:nowrap;
}
.subway-station.done {
  border-color:var(--blue);
  color:var(--blue);
}
.subway-station.current {
  border-color:var(--gold);
  color:var(--gold);
  box-shadow:0 0 8px rgba(245,185,66,.18);
}
.subway-panel {
  border-left:2px solid var(--blue);
  padding-left:10px;
  font-family:'Press Start 2P',monospace;
  line-height:2;
}
.subway-now {
  color:var(--txt);
  font-size:11px;
}
.subway-goal {
  color:var(--dim);
  font-size:9px;
}
.subway-event {
  color:var(--gold);
  font-size:10px;
  margin-top:4px;
}
.subway-lines {
  display:grid;
  grid-template-columns:1fr;
  gap:7px;
}
.subway-line-btn {
  background:var(--sur);
  border:1px solid var(--bd);
  color:var(--txt);
  border-radius:2px;
  padding:10px;
  text-align:left;
  cursor:pointer;
  font-family:'Press Start 2P',monospace;
  display:flex;
  flex-direction:column;
  gap:6px;
}
.subway-line-btn:active {
  border-color:var(--blue);
  background:rgba(64,150,232,.1);
  transform:scale(.99);
}
.subway-line-btn span {
  font-size:11px;
}
.subway-line-btn small {
  color:var(--dim);
  font-size:9px;
  line-height:1.6;
}
.subway-log {
  max-height:150px;
  overflow-y:auto;
  border-top:1px solid var(--bd);
  padding-top:8px;
  color:var(--dim);
  font-family:'Press Start 2P',monospace;
  font-size:9px;
  line-height:2;
}
.subway-summary-title {
  color:var(--gold);
  font-family:'Press Start 2P',monospace;
  font-size:12px;
  text-align:center;
}
.subway-summary {
  color:var(--txt);
  font-family:'Press Start 2P',monospace;
  font-size:10px;
  line-height:2.1;
}
</style>
