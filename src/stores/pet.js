import { defineStore } from 'pinia'
import { getCharacterName, CHARACTERS, CHARACTER_MAP } from '../data/characters'
import { CHARACTER_DIALOGUE, DEFAULT_VISITOR_DIALOGUE } from '../data/dialogue'

function pairKey(a, b) { return [a, b].sort().join('-') }

// ── Constants ──────────────────────────────────────────────────────────────

export const FOODS = [
  // ── 原有食物 ──────────────────────────────────────────────────────────
  { id: 'coffee',   ico: '☕', name: '黑咖啡',       sat: 5,  hlt: 0,   moo: 8,   aff: 4,  sp: 'praised',   msgs: ['不錯。', '謝謝。', '喝完了。'] },
  { id: 'ramen',    ico: '🍜', name: '家系拉麵',      sat: 40, hlt: -8,  moo: 12,  aff: 8,  sp: 'happy',     msgs: ['好吃。', '謝謝。', '吃完了。'] },
  { id: 'bento',    ico: '🍱', name: '燒肉便當',      sat: 35, hlt: 5,   moo: 10,  aff: 8,  sp: 'energetic', msgs: ['謝謝你準備的。', '好吃。', '吃完了。'] },
  { id: 'mapo',     ico: '🌶', name: '激辛麻婆豆腐',  sat: 20, hlt: -5,  moo: 10,  aff: 5,  sp: 'happy',     msgs: ['辣！', '謝謝。', '過癮。'] },
  { id: 'porridge', ico: '🍓', name: '草莓粥 ★',      sat: 50, hlt: 10,  moo: 5,   aff: 5,  sp: 'happy',     msgs: ['甜的。', '謝謝。', '吃完了。'] },
  { id: 'cig',      ico: '🚬', name: '巧克力香菸',    sat: 0,  hlt: -10, moo: 5,   aff: 2,  sp: 'energetic', msgs: ['謝謝。', '（吸了一口）', '好。'] },
  { id: 'shumai',   ico: '🥟', name: '橫濱燒賣',      sat: 15, hlt: 3,   moo: 10,  aff: 5,  sp: 'energetic', msgs: ['好吃。', '謝謝。', '吃完了。'] },
  { id: 'energy',   ico: '⚡', name: '能量飲',         sat: 5,  hlt: -5,  moo: 5,   aff: 0,  sp: 'energetic', msgs: ['精神來了。', '謝謝。', '體力恢復。'] },
  { id: 'dark_choco', ico: '🍫', name: '黑巧克力',      sat: 8,  hlt: -5,  sta: 20, moo: 5,   aff: 3,  sp: 'praised',   msgs: ['謝謝。', '苦的。', '不錯。'] },
  { id: 'sports_drink', ico: '🥤', name: '運動飲料',    sat: 5,  hlt: -5,  sta: 20, moo: -5,  aff: 0,  sp: 'helpless',  msgs: ['謝謝。', '補水了。', '喝完了。'] },
  // ── 上次新增食物 ───────────────────────────────────────────────────────
  { id: 'noodle',   ico: '🍝', name: '泡麵 🌙',        sat: 45, hlt: -12, moo: 12,  aff: 6,  sp: 'happy',     msgs: ['好吃。', '謝謝。', '吃完了。'], nightOnly: true },
  { id: 'beer',     ico: '🍺', name: '罐裝啤酒',       sat: 5,  hlt: -8,  moo: 8,   aff: 3,  sp: 'happy',     msgs: ['謝謝。', '喝完了。', '不錯。'] },
  { id: 'onigiri',  ico: '🍙', name: '鹽味飯糰',       sat: 25, hlt: 5,   moo: 8,   aff: 4,  sp: 'energetic', msgs: ['謝謝。', '好吃。', '吃完了。'] },
  { id: 'donut',    ico: '🍩', name: '甜甜圈',          sat: 20, hlt: -6,  moo: 10,  aff: 5,  sp: 'happy',     msgs: ['甜甜的。', '謝謝。', '好吃。'] },
  { id: 'chips',    ico: '🍟', name: '辣味洋芋片',        sat: 10, hlt: -8,  moo: 10,  aff: 4,  sp: 'energetic', msgs: ['脆的。', '謝謝。', '好吃。'] },
  { id: 'matcha',   ico: '🍦', name: '抹茶冰淇淋',     sat: 15, hlt: 2,   moo: 12,  aff: 6,  sp: 'praised',   msgs: ['謝謝。', '抹茶。', '好。'] },
  // ── 健康向食物（好感分三段懲罰）──────────────────────────────────────
  { id: 'salad',    ico: '🥗', name: '蔬菜沙拉',   sat: 10, hlt: 25, sp: 'helpless', healthFood: true,
    mooTiers: [-5, 0, 3], affTiers: [-2, 0, 2],
    msgTiers: [
      ['謝謝。', '吃完了。', '蔬菜。'],
      ['謝謝。', '吃完了。', '健康的。'],
      ['謝謝你。', '很好。', '謝了。']
    ]
  },
  { id: 'greentea', ico: '🍵', name: '無糖綠茶',   sat: 0,  hlt: 20, sp: 'helpless', healthFood: true,
    mooTiers: [-2, 0, 4], affTiers: [0, 1, 3],
    msgTiers: [
      ['謝謝。', '喝完了。', '綠茶。'],
      ['謝謝。', '好喝。', '清爽。'],
      ['謝謝你。', '很好。', '謝了。']
    ]
  },
  { id: 'chicken',  ico: '🍗', name: '水煮雞胸肉', sat: 30, hlt: 30, sp: 'helpless', healthFood: true,
    mooTiers: [-5, 2, 8], affTiers: [-2, 1, 3],
    msgTiers: [
      ['謝謝。', '吃完了。', '健康的。'],
      ['謝謝。', '很好。', '吃完了。'],
      ['謝謝你。', '非常好。', '謝了。']
    ]
  },
  // ── 雙角色食物（Ichiro 來訪時限定）────────────────────────────────────
  { id: 'cake_duo', ico: '🍰', name: '蛋糕', sat: 18, hlt: -3, moo: 12, rel: 10, tokiAff: 6, ichiroAff: 8, duoOnly: true, sp: 'happy',
    msgs: ['{visitor}：甜的很適合一起吃。', '{name}：...你切太大塊了。', '兩個人把蛋糕分完了。']
  },
  { id: 'steak_duo', ico: '🥩', name: '牛排', sat: 35, hlt: 2, moo: 10, rel: 14, tokiAff: 8, ichiroAff: 8, duoOnly: true, sp: 'energetic',
    msgs: ['{name}：這個可以很好吃。', '{visitor}：你喜歡五分熟？', '兩個人一起吃得很滿足。']
  },
  { id: 'tea_duo', ico: '🫖', name: '雙人下午茶', sat: 16, hlt: 6, moo: 18, rel: 18, tokiAff: 10, ichiroAff: 12, duoOnly: true, sp: 'heart',
    msgs: ['{visitor}：想跟你慢慢聊天。', '{name}：...別一直看我。', '茶香讓客廳變得柔和了一點。']
  }
]

export const GAMES = [
  { id: 'rps',    ico: '✊', name: '猜拳對決' },
  { id: 'shoot',  ico: '🎯', name: '標靶射擊' },
  { id: 'walk',   ico: '🗺', name: '橫濱散步' },
  { id: 'listen', ico: '💬', name: '聽他抱怨' },
  { id: 'typing', ico: '⌨', name: '打字競速' },
  { id: 'memory', ico: '🃏', name: '記憶翻牌' },
  { id: 'quiz',   ico: '❓', name: '問答猜謎' },
  { id: 'fishing', ico: '🎣', name: '海邊釣魚' },
  { id: 'warehouse', ico: '📦', name: '倉庫翻找' },
  { id: 'subway', ico: '🚇', name: '地下鐵迷宮' },
  { id: 'photo', ico: '📷', name: '街頭攝影' },
  { id: 'number_chain', ico: '🔢', name: '數字接龍' },
  { id: 'solitaire', ico: '🃏', name: '單人接龍' },
  { id: 'bubble', ico: '🫧', name: '泡泡爆破' },
  { id: 'catcher', ico: '🪃', name: '接東西' },
  { id: 'snake', ico: '🐍', name: '貪食蛇 lite' },
  { id: 'dodge', ico: '🔴', name: '躲子彈' }
]

export const GAME_STAMINA_COSTS = {
  fishing: 5,
  warehouse: 5,
  photo: 5,
  subway: 10,
  number_chain: 8,
  solitaire: 10
}

export const CARE_ITEMS = [
  // 緊急醫療
  { id: 'medicine', ico: '💊', name: '吃藥',    type: 'urgent', hlt: 25, moo: -10, aff: 0,
    msgs:       ['...苦的。', '不需要你管我！。', '...謝了。'],
    refuseMsgs: ['我沒事。', '你多管閒事。', '退開。']
  },
  { id: 'bandage',  ico: '🩹', name: '貼藥布',  type: 'urgent', hlt: 15, moo: -5,  aff: 0,
    msgs:       ['...小傷而已。', '不用這麼緊張。', '...謝了。'],
    refuseMsgs: ['哪裡需要。', '你眼神有問題。', '走開。']
  },
  { id: 'clinic',   ico: '🏥', name: '去診所',  type: 'urgent', hlt: 40, moo: -5,  aff: -5,
    msgs:       ['...沒事了。', '就是小問題。', '...早點來就好了。'],
    refuseMsgs: ['你說我生病？', '我自己的身體我清楚。', '不要。']
  },
  // 日常保養
  { id: 'supplement', ico: '🧴', name: '保健食品', type: 'daily',  hlt: 10, moo: 0,   aff: 2,  cooldownHours: 24,
    msgs: ['...這什麼。', '每天都要吃？', '...好。']
  },
  { id: 'bath',       ico: '🛁', name: '泡澡',    type: 'daily',  hlt: 5,  moo: 15,  aff: 5,  cooldownHours: 24,
    msgs: ['...洗完了。', '別偷看。', '舒服一點了。']
  },
  { id: 'haircut',    ico: '✂️', name: '剪頭髮',  type: 'weekly', hlt: 0,  moo: 10,  aff: 12, cooldownHours: 168,
    msgs: ['整齊多了。', '不要剪太短。', '...還好啦。']
  },
  // 定期體檢（限一次）
  { id: 'checkup',    ico: '🩺', name: '定期體檢', type: 'once',  hlt: 15, moo: 5,   aff: 10, sat: 5,
    msgs: ['...沒問題。', '結果出來了。都正常。', '...謝謝你記得幫我約。']
  }
]

export const UNLOCK_ACTIONS = [
  { id: 'scarf',      ico: '🧣', name: '提醒穿外套',   minAff: 80  },
  { id: 'sit',        ico: '📖', name: '陪他安靜坐著', minAff: 120, cooldownHours: 6 },
  { id: 'headphones', ico: '🎧', name: '借他耳機聽歌', minAff: 160, cooldownHours: 8 },
  { id: 'latenight',  ico: '🌙', name: '深夜一起待著', minAff: 200, nightOnly: true  }
]

export const DUO_ACTIONS = [
  { id: 'snack', ico: '🍪', name: '一起吃點心', minRel: 0, tokiAff: 6, ichiroAff: 6, rel: 8, sat: 8, moo: 8,
    msgs: ['{name}：...你不要搶最後一塊。', '{visitor}：那就一人一半吧。', '兩個人分著吃，氣氛變好了。']
  },
  { id: 'chat', ico: '💬', name: '一起聊天', minRel: 25, tokiAff: 8, ichiroAff: 10, rel: 12, moo: 14,
    msgs: ['{visitor}：原來你是這樣想的。', '{name}：我才沒說那麼多。', '你陪他們聊了一會兒。']
  },
  { id: 'mini_game', ico: '🎮', name: '一起玩小遊戲', minRel: 60, tokiAff: 12, ichiroAff: 12, rel: 16, moo: 18, sta: -10,
    msgs: ['{name}：再一局。', '{visitor}：剛剛配合得很好。', '三個人玩得有點忘記時間。']
  }
]

export const DUO_CARE_ACTIONS = [
  { id: 'rest_together', ico: '🛋', name: '一起休息', minRel: 0, tokiAff: 4, ichiroAff: 4, rel: 8, hlt: 6, sta: 12, moo: 8,
    msgs: ['{visitor}：一起休息一下吧。', '{name}：...也不是不行。', '兩個人安靜地恢復了一點精神。']
  },
  { id: 'check_each_other', ico: '🩺', name: '互相照看', minRel: 30, tokiAff: 6, ichiroAff: 8, rel: 12, hlt: 10, sta: 6, moo: 6,
    msgs: ['{visitor}：你額頭好像不燙了。', '{name}：你也別逞強。', '兩個人互相確認了狀態。']
  }
]

export const DUO_GAME_ACTIONS = [
  { id: 'mini_game', ico: '🎮', name: '一起玩小遊戲', minRel: 60 }
]

export const REL_TITLES = [
  [0, '剛認識'],
  [25, '可以聊天'],
  [60, '玩伴'],
  [100, '好朋友'],
  [160, '默契滿分']
]


export const TITLES = [
  [0,   '陌生人'],
  [51,  '...知道你了'],
  [101, '勉強接受'],
  [151, '算你夥伴'],
  [201, '......（不說）']
]

export const NAP_MS = 10 * 60 * 1000
export const BED_MS = 8  * 60 * 60 * 1000
export const SICK_DISPLAY_MS = 8 * 60 * 60 * 1000


// ── Helpers ────────────────────────────────────────────────────────────────

const clamp    = (v, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v))
const rnd      = arr => arr[Math.floor(Math.random() * arr.length)]
const nowMs    = () => Date.now()
const todayStr = () => new Date().toISOString().slice(0, 10)

// ── Per-character state factory ────────────────────────────────────────────

function createDefaultCharacterState() {
  return {
    sat: 75, hlt: 70, moo: 65, aff: 50, playerAffinity: 50, sta: 80,
    adoptedAt:    null,
    staCritTicks: 0,
    sleeping: null, sleepEnd: null, sleepStart: null, _sleepNow: 0,
    sick: false, sickUntil: null, lastSickCheck: '', lowHealthSince: null,
    careCooldowns: {}, actionCooldowns: {},
    checkupDone: false, checkupActive: false, checkupTier: null,
    inventory: [], locationMemory: {},
    disturbedUntil: 0, rapidClicks: [], patCount: 0, lastPatTime: 0
  }
}

// ── Store ──────────────────────────────────────────────────────────────────

export const usePetStore = defineStore('pet', {
  state: () => ({
    // Core stats
    sat: 75,
    hlt: 70,
    moo: 65,
    aff: 50,
    playerAffinityToki: 50,
    playerAffinityIchiro: 0,
    relationships: {},
    satIchiro: 72,
    hltIchiro: 72,
    mooIchiro: 68,
    staIchiro: 82,
    checkupDoneIchiro: false,
    visitorUnlocked: false,
    activeVisitor: null,
    visitorSprite: 'happy',
    pairEffect: null,
    sta: 80,         // 體力（0-100），與健康分開

    // 養育進度
    adoptedAt: null,     // 第一次載入時間戳
    staCritTicks: 0,     // 連續體力不足計數（超過門檻才傷健康）

    // UI state
    currentSprite: 'energetic',
    lastMsg: '橫濱，本大爺回來了。',
    nightMode: false,
    selectedCharacter: 'toki',

    // Per-character independent save states
    charactersState: { toki: createDefaultCharacterState() },

    // Interaction state
    reacting: false,
    reactionTimer: null,
    inGame: false,
    activeGameId: null,
    activeGameTarget: 'toki',

    disturbedUntil: 0,
    rapidClicks: [],
    patCount: 0,
    lastPatTime: 0,

    // Sleep state
    sleeping: null,
    sleepEnd: null,
    sleepStart: null,
    _sleepNow: 0,
    sleepingIchiro: null,
    sleepEndIchiro: null,
    sleepStartIchiro: null,
    _sleepNowIchiro: 0,
    _sleepNowVisitor: 0,

    // Sickness
    sick: false,
    sickUntil: null,
    lastSickCheck: '',
    lowHealthSinceToki: null,
    lowHealthSinceIchiro: null,

    // Cooldowns
    careCooldowns:   {},   // { [itemId]: timestamp }
    actionCooldowns: {},   // { [actionId]: timestamp }
    checkupDone:   false,
    checkupActive: false,   // 體檢劇場進行中
    checkupTier:   null,    // 'good' | 'ok' | 'bad'，開場決定，結束才生效

    // Walk system
    inventory:      [],   // 散步撿到的食物
    locationMemory: {},   // { [locationId]: { visitCount, displeasure, lastVisited, refusedUntil } }

    // Notification dedup
    _notifSent: {},
    _inAppNotif: null
  }),

  getters: {
    currentTitle: (state) => {
      let title = TITLES[0][1]
      const affinity = state.playerAffinityToki ?? state.aff
      for (const [threshold, name] of TITLES) {
        if (affinity >= threshold) title = name
      }
      return title
    },
    hasActiveVisitor: (state) => state.activeVisitor !== null,
    activeVisitorName: (state) => {
      if (!state.activeVisitor) return ''
      if (state.activeVisitor === 'ichiro') return 'Ichiro'
      return getCharacterName(state.activeVisitor)
    },
    tokiName: (state) => getCharacterName(state.selectedCharacter),
    currentRelationship: (state) => {
      if (!state.activeVisitor) return 0
      const key = pairKey(state.selectedCharacter, state.activeVisitor)
      return state.relationships[key] ?? 0
    },
    relationshipTokiIchiro: (state) => state.relationships[pairKey('toki', 'ichiro')] ?? 0,
    relationshipTitle: (state) => {
      let title = REL_TITLES[0][1]
      const rel = state.activeVisitor
        ? (state.relationships[pairKey(state.selectedCharacter, state.activeVisitor)] ?? 0)
        : 0
      for (const [threshold, name] of REL_TITLES) {
        if (rel >= threshold) title = name
      }
      return title
    },
    isDisturbed:    (state) => nowMs() < state.disturbedUntil,
    isSleeping:     (state) => !!state.sleeping,
    isIchiroSleeping: (state) => !!state.sleepingIchiro,
    isVisitorSleeping: (state) => {
      if (!state.activeVisitor) return false
      if (state.activeVisitor === 'ichiro') return !!state.sleepingIchiro
      return !!(state.charactersState[state.activeVisitor]?.sleeping)
    },
    visitorSleeping: (state) => {
      if (!state.activeVisitor) return null
      if (state.activeVisitor === 'ichiro') return state.sleepingIchiro
      return state.charactersState[state.activeVisitor]?.sleeping ?? null
    },
    visitorSat: (state) => {
      if (!state.activeVisitor) return 0
      if (state.activeVisitor === 'ichiro') return state.satIchiro
      return state.charactersState[state.activeVisitor]?.sat ?? 0
    },
    visitorHlt: (state) => {
      if (!state.activeVisitor) return 0
      if (state.activeVisitor === 'ichiro') return state.hltIchiro
      return state.charactersState[state.activeVisitor]?.hlt ?? 0
    },
    visitorMoo: (state) => {
      if (!state.activeVisitor) return 0
      if (state.activeVisitor === 'ichiro') return state.mooIchiro
      return state.charactersState[state.activeVisitor]?.moo ?? 0
    },
    visitorSta: (state) => {
      if (!state.activeVisitor) return 0
      if (state.activeVisitor === 'ichiro') return state.staIchiro
      return state.charactersState[state.activeVisitor]?.sta ?? 0
    },
    visitorAff: (state) => {
      if (!state.activeVisitor) return 0
      if (state.activeVisitor === 'ichiro') return state.playerAffinityIchiro
      return state.charactersState[state.activeVisitor]?.playerAffinity ?? 0
    },
    visitorShowsSick: (state) => {
      if (!state.activeVisitor) return false
      if (state.activeVisitor === 'ichiro') return state.hltIchiro < 30 && state.lowHealthSinceIchiro && nowMs() - state.lowHealthSinceIchiro >= SICK_DISPLAY_MS
      const cs = state.charactersState[state.activeVisitor]
      return !!(cs && cs.hlt < 30 && cs.lowHealthSince && nowMs() - cs.lowHealthSince >= SICK_DISPLAY_MS)
    },
    isSick:         (state) => state.sick && (state.sickUntil === null || nowMs() < state.sickUntil),
    tokiShowsSick:  (state) => state.hlt < 30 && state.lowHealthSinceToki && nowMs() - state.lowHealthSinceToki >= SICK_DISPLAY_MS,
    ichiroShowsSick: (state) => state.hltIchiro < 30 && state.lowHealthSinceIchiro && nowMs() - state.lowHealthSinceIchiro >= SICK_DISPLAY_MS,
    sleepRemaining: (state) => state.sleepEnd ? Math.max(0, state.sleepEnd - state._sleepNow) : 0,
    sleepRemainingIchiro: (state) => state.sleepEndIchiro ? Math.max(0, state.sleepEndIchiro - state._sleepNowIchiro) : 0,
    sleepRemainingVisitor: (state) => {
      if (!state.activeVisitor) return 0
      if (state.activeVisitor === 'ichiro') return state.sleepEndIchiro ? Math.max(0, state.sleepEndIchiro - state._sleepNowIchiro) : 0
      const cs = state.charactersState[state.activeVisitor]
      return cs?.sleepEnd ? Math.max(0, cs.sleepEnd - state._sleepNowVisitor) : 0
    },
    targetIsSleeping: (state) => (target = 'toki') => {
      if (target === 'duo') {
        const visitorSleeping = state.activeVisitor === 'ichiro'
          ? !!state.sleepingIchiro
          : !!(state.charactersState[state.activeVisitor]?.sleeping)
        return !!state.sleeping || visitorSleeping
      }
      if (target !== 'toki') {
        if (state.activeVisitor === 'ichiro') return !!state.sleepingIchiro
        return !!(state.charactersState[state.activeVisitor]?.sleeping)
      }
      return !!state.sleeping
    },
    adoptedDays:    (state) => {
      if (!state.adoptedAt) return 0
      return Math.floor((Date.now() - state.adoptedAt) / (24 * 3600 * 1000))
    },
    daysLeft: (state) => {
      if (!state.adoptedAt) return 14
      const days = Math.floor((Date.now() - state.adoptedAt) / (24 * 3600 * 1000))
      return Math.max(0, 14 - days)
    },
    isLeaving: (state) => {
      if (!state.adoptedAt) return false
      return Math.floor((Date.now() - state.adoptedAt) / (24 * 3600 * 1000)) >= 14
    }
  },

  actions: {
    // ── Persistence ──────────────────────────────────────────────────────

    save() {
      try {
        this._syncTokiAffinity()
        this._updateSpecialSpriteTimers()
        this._flushToCharactersState(this.selectedCharacter)
        localStorage.setItem('toki_v5', JSON.stringify({
          sat: this.sat, hlt: this.hlt, moo: this.moo, aff: this.aff,
          playerAffinityToki: this.playerAffinityToki,
          playerAffinityIchiro: this.playerAffinityIchiro,
          relationships: this.relationships,
          satIchiro: this.satIchiro,
          hltIchiro: this.hltIchiro,
          mooIchiro: this.mooIchiro,
          staIchiro: this.staIchiro,
          checkupDoneIchiro: this.checkupDoneIchiro,
          visitorUnlocked: this.visitorUnlocked,
          activeVisitor: this.activeVisitor,
          visitorSprite: this.visitorSprite,
          sta: this.sta,
          adoptedAt: this.adoptedAt,
          sleeping: this.sleeping, sleepEnd: this.sleepEnd, sleepStart: this.sleepStart,
          sleepingIchiro: this.sleepingIchiro,
          sleepEndIchiro: this.sleepEndIchiro,
          sleepStartIchiro: this.sleepStartIchiro,
          sick: this.sick, sickUntil: this.sickUntil, lastSickCheck: this.lastSickCheck,
          lowHealthSinceToki: this.lowHealthSinceToki,
          lowHealthSinceIchiro: this.lowHealthSinceIchiro,
          careCooldowns:   this.careCooldowns,
          actionCooldowns: this.actionCooldowns,
          checkupDone:     this.checkupDone,
          inventory:       this.inventory,
          locationMemory:  this.locationMemory,
          selectedCharacter: this.selectedCharacter,
          charactersState:   this.charactersState,
          savedAt: nowMs()
        }))
        if (typeof document !== 'undefined' && document.hidden) {
          this.scheduleBackgroundNotifications()
        } else {
          _tokiBridge({ action: 'cancelAll' })
        }
      } catch (_) {}
    },

    load() {
      try {
        let raw      = localStorage.getItem('toki_v5')
        let migrated = false
        if (!raw) {
          raw      = localStorage.getItem('toki_v4')
          migrated = true
        }
        if (!raw) {
          // 第一次啟動：記錄收養時間
          this.adoptedAt = nowMs()
          this._flushToCharactersState(this.selectedCharacter)
          this.save()
          return false
        }
        const d       = JSON.parse(raw)
        const elapsed = (nowMs() - d.savedAt) / 1000
        const t       = Math.min(elapsed, 21600)

        // ── Ichiro / 訪客系統（永遠從頂層欄位讀取）──────────────────────
        this.playerAffinityIchiro = clamp(d.playerAffinityIchiro ?? 0, 0, 300)
        // 遷移：舊存檔用 relationshipTokiIchiro，新存檔用 relationships map
        if (d.relationships) {
          this.relationships = d.relationships
        } else {
          this.relationships = {}
          if (d.relationshipTokiIchiro) {
            this.relationships[pairKey('toki', 'ichiro')] = clamp(d.relationshipTokiIchiro ?? 0, 0, 300)
          }
        }
        const hadActiveVisitor = d.activeVisitor === 'ichiro'
        const ichiroBaseSat    = d.satIchiro ?? 72
        this.satIchiro = clamp(d.sleepingIchiro
          ? ichiroBaseSat - t * (0.25 / 64)
          : hadActiveVisitor ? ichiroBaseSat - t * (0.85 / 64) : ichiroBaseSat)
        this.hltIchiro = clamp(hadActiveVisitor ? (d.hltIchiro ?? 72) - t * (0.06 / 60) : (d.hltIchiro ?? 72))
        this.lowHealthSinceIchiro = this.hltIchiro < 30 ? (d.lowHealthSinceIchiro || d.savedAt || nowMs()) : null
        this.mooIchiro = clamp(hadActiveVisitor && !d.sleepingIchiro
          ? (d.mooIchiro ?? 68) - t * (0.5 / 64)
          : (d.mooIchiro ?? 68))
        this.staIchiro = d.sleepingIchiro
          ? clamp((d.staIchiro ?? 82) + t * (0.5 / 60))
          : hadActiveVisitor ? clamp((d.staIchiro ?? 82) - t * (0.3 / 64)) : clamp(d.staIchiro ?? 82)
        this.checkupDoneIchiro = d.checkupDoneIchiro ?? false
        this.visitorUnlocked   = d.visitorUnlocked ?? false
        this.activeVisitor     = d.activeVisitor ?? null
        this.visitorSprite     = d.visitorSprite || 'happy'

        if (d.sleepingIchiro && d.sleepEndIchiro) {
          this.sleepingIchiro   = d.sleepingIchiro
          this.sleepEndIchiro   = d.sleepEndIchiro
          this.sleepStartIchiro = d.sleepStartIchiro || d.savedAt
          this._sleepNowIchiro  = nowMs()
          this.visitorSprite    = 'sleeping'
          if (nowMs() >= d.sleepEndIchiro) {
            setTimeout(() => this.wakeUp(false, 'ichiro'), 500)
          }
        }

        // 非 Ichiro 訪客：若正在睡覺且時間已到則喚醒
        if (this.activeVisitor && this.activeVisitor !== 'ichiro') {
          const vcs = this.charactersState[this.activeVisitor]
          if (vcs?.sleeping && vcs?.sleepEnd) {
            this._sleepNowVisitor = nowMs()
            this.visitorSprite = 'sleeping'
            if (nowMs() >= vcs.sleepEnd) {
              setTimeout(() => this.wakeUp(false, this.activeVisitor), 500)
            }
          }
        }

        // ── 主角色狀態 ──────────────────────────────────────────────────
        if (d.charactersState) {
          // 新格式：直接還原 charactersState，對目前角色套用離線衰減
          this.charactersState   = d.charactersState
          this.selectedCharacter = d.selectedCharacter ?? 'toki'
          const id = this.selectedCharacter
          if (!this.charactersState[id]) {
            const newCs = createDefaultCharacterState()
            newCs.adoptedAt = nowMs()
            this.charactersState[id] = newCs
          }
          const cs = this.charactersState[id]
          if (cs.sleeping) {
            cs.sat = clamp(cs.sat - t * (0.3 / 64))
            cs.sta = clamp(cs.sta + t * (0.5 / 60))
          } else {
            cs.sat = clamp(cs.sat - t * (1.0 / 64))
            cs.hlt = clamp(cs.hlt - t * (0.08 / 60))
            cs.moo = clamp(cs.moo - t * (0.6 / 64))
            cs.sta = clamp(cs.sta - t * (0.3 / 64))
          }
          cs.lowHealthSince = cs.hlt < 30 ? (cs.lowHealthSince || d.savedAt || nowMs()) : null
          if (cs.sick && cs.sickUntil && nowMs() >= cs.sickUntil) {
            cs.sick = false; cs.sickUntil = null; cs.hlt = clamp(cs.hlt - 5)
          }
          this._loadFromCharactersState(id)

        } else {
          // 舊格式：把平坦 Toki 狀態遷移到 charactersState.toki
          const cs        = createDefaultCharacterState()
          cs.sat          = clamp(d.sat - t * (1.0 / 64))
          cs.hlt          = clamp((migrated ? 70 : (d.hlt ?? 70)) - t * (0.08 / 60))
          cs.moo          = clamp(d.moo - t * (0.6 / 64))
          cs.aff          = clamp(d.playerAffinityToki ?? d.aff ?? 50, 0, 300)
          cs.playerAffinity = cs.aff
          cs.sta          = d.sleeping
            ? clamp((d.sta ?? 60) + t * (0.5 / 60))
            : clamp((d.sta ?? 60) - t * (0.3 / 64))
          cs.adoptedAt    = d.adoptedAt || d.savedAt || nowMs()
          cs.sleeping     = d.sleeping   || null
          cs.sleepEnd     = d.sleepEnd   || null
          cs.sleepStart   = d.sleepStart || null
          cs.lowHealthSince = cs.hlt < 30 ? (d.lowHealthSinceToki || d.savedAt || nowMs()) : null
          if (!migrated) {
            cs.sick            = d.sick            || false
            cs.sickUntil       = d.sickUntil       || null
            cs.lastSickCheck   = d.lastSickCheck   || ''
            cs.careCooldowns   = d.careCooldowns   || {}
            cs.actionCooldowns = d.actionCooldowns || {}
            cs.checkupDone     = d.checkupDone     || false
            cs.inventory       = d.inventory       || []
            cs.locationMemory  = d.locationMemory  || {}
          }
          if (cs.sick && cs.sickUntil && nowMs() >= cs.sickUntil) {
            cs.sick = false; cs.sickUntil = null; cs.hlt = clamp(cs.hlt - 5)
          }
          this.charactersState   = { toki: cs }
          this.selectedCharacter = d.selectedCharacter ?? 'toki'
          if (!this.charactersState[this.selectedCharacter]) {
            const newCs = createDefaultCharacterState()
            newCs.adoptedAt = nowMs()
            this.charactersState[this.selectedCharacter] = newCs
          }
          this._loadFromCharactersState(this.selectedCharacter)
        }

        // ── 睡眠結束偵測 ──────────────────────────────────────────────
        if (this.sleeping && this.sleepEnd) {
          this._sleepNow = nowMs()
          if (nowMs() >= this.sleepEnd) setTimeout(() => this.wakeUp(false, 'toki'), 500)
          return true
        }

        return { elapsed }
      } catch (_) {
        return false
      }
    },

    // ── Decay (每 8 秒) ───────────────────────────────────────────────────

    tick() {
      const r       = this.nightMode ? 2 : 1
      const mooMult = this.hlt < 30 ? 1.5 : 1   // 健康差 → 心情衰減加快

      if (this.sleeping) {
        this.sat = clamp(this.sat - 0.3 / 8)
      } else {
        this.sat = clamp(this.sat - 1.0 / 8)
        this.hlt = clamp(this.hlt - 0.08 / 8)
        this.moo = clamp(this.moo - (0.6 / 8) * r * mooMult)
        this.sta = clamp(this.sta - 0.4 / 1)   // ~3/min
      }

      if (this.hasActiveVisitor) {
        if (this.activeVisitor === 'ichiro') {
          if (this.sleepingIchiro) {
            this.satIchiro = clamp(this.satIchiro - 0.25 / 8)
          } else {
            this.satIchiro = clamp(this.satIchiro - 0.85 / 8)
            this.hltIchiro = clamp(this.hltIchiro - 0.06 / 8)
            this.mooIchiro = clamp(this.mooIchiro - (0.5 / 8) * r)
            this.staIchiro = clamp(this.staIchiro - 0.32 / 1)
          }
          if (this.satIchiro < 10 || this.mooIchiro < 10) {
            this.playerAffinityIchiro = clamp(this.playerAffinityIchiro - 0.08, 0, 300)
          }
        } else {
          const cs = this.charactersState[this.activeVisitor]
          if (cs) {
            if (cs.sleeping) {
              cs.sat = clamp(cs.sat - 0.25 / 8)
            } else {
              cs.sat = clamp(cs.sat - 0.85 / 8)
              cs.hlt = clamp(cs.hlt - 0.06 / 8)
              cs.moo = clamp(cs.moo - (0.5 / 8) * r)
              cs.sta = clamp(cs.sta - 0.32 / 1)
            }
            if (cs.sat < 10 || cs.moo < 10) {
              cs.aff = clamp((cs.aff || 0) - 0.08, 0, 300)
              cs.playerAffinity = cs.aff
            }
          }
        }
      }

      // ── 體力衰減（比 sat 稍慢，每 tick -0.4）──────────────────────────
      // 體力極低時連續傷健康（過勞機制）
      if (!this.sleeping && this.sta < 10) {
        this.staCritTicks = (this.staCritTicks || 0) + 1
        if (this.staCritTicks >= 4) {          // 連續 4 tick (~32秒) 體力耗盡才扣血
          this.hlt = clamp(this.hlt - 0.3)
        }
      } else {
        this.staCritTicks = 0
      }

      // ── 好感自然衰減情境 ──────────────────────────────────────────────
      // 他很餓時對你失去信心
      if (this.sat < 10) this.aff = clamp(this.aff - 0.12, 0, 300)
      // 心情很差時也不對你好
      if (this.moo < 10) this.aff = clamp(this.aff - 0.12, 0, 300)
      // 體力耗盡被你忽略
      if (!this.sleeping && this.sta < 5)  this.aff = clamp(this.aff - 0.06, 0, 300)
      // 健康極差（你沒照顧好他）
      if (this.hlt < 20) this.aff = clamp(this.aff - 0.06, 0, 300)
      // 好感高時有極微弱的自然衰退（需要持續維護）
      if (this.aff > 240) this.aff = clamp(this.aff - 0.025, 0, 300)
      this._syncTokiAffinity()

      // hlt 不自然衰減，只靠食物 / 照護 / 生病 / 過勞改變
      this._updateSpecialSpriteTimers()
      this._updateNightMode()
      this.checkSickness()
      if (!this.reacting && !this.inGame) this.idleUpdate()
      this.checkNotifications()
    },

    _updateNightMode() {
      const h = new Date().getHours()
      this.nightMode = h >= 22 || h < 6
    },

    _updateSpecialSpriteTimers() {
      if (this.hlt < 30) {
        if (!this.lowHealthSinceToki) this.lowHealthSinceToki = nowMs()
      } else {
        this.lowHealthSinceToki = null
      }

      if (this.hltIchiro < 30) {
        if (!this.lowHealthSinceIchiro) this.lowHealthSinceIchiro = nowMs()
      } else {
        this.lowHealthSinceIchiro = null
      }

      if (this.hasActiveVisitor && this.activeVisitor !== 'ichiro') {
        const cs = this.charactersState[this.activeVisitor]
        if (cs) {
          if (cs.hlt < 30) { if (!cs.lowHealthSince) cs.lowHealthSince = nowMs() }
          else cs.lowHealthSince = null
        }
      }
    },

    // ── Sprite & message ─────────────────────────────────────────────────

    setSprite(name) { this.currentSprite = name },
    setMsg(text)    {
      this.lastMsg = text
        .replace(/\{name\}/g, this.tokiName)
        .replace(/\{visitor\}/g, this.activeVisitorName || 'Ichiro')
    },

    setCharacter(id) {
      if (id === this.selectedCharacter) return
      this._flushToCharactersState(this.selectedCharacter)
      if (!this.charactersState[id]) {
        const newCs = createDefaultCharacterState()
        newCs.adoptedAt = nowMs()
        this.charactersState[id] = newCs
      }
      this.selectedCharacter = id
      this._loadFromCharactersState(id)
      clearTimeout(this.reactionTimer)
      this.reacting      = false
      this.inGame        = false
      this.activeGameId  = null
      this.currentSprite = 'energetic'
      this.idleUpdate()
      this.save()
    },

    // Copies current flat fields → charactersState[id]
    _flushToCharactersState(id) {
      if (!this.charactersState[id]) this.charactersState[id] = createDefaultCharacterState()
      const cs          = this.charactersState[id]
      cs.sat            = this.sat
      cs.hlt            = this.hlt
      cs.moo            = this.moo
      cs.aff            = this.aff
      cs.playerAffinity = this.playerAffinityToki
      cs.sta            = this.sta
      cs.adoptedAt      = this.adoptedAt
      cs.staCritTicks   = this.staCritTicks
      cs.sleeping       = this.sleeping
      cs.sleepEnd       = this.sleepEnd
      cs.sleepStart     = this.sleepStart
      cs._sleepNow      = this._sleepNow
      cs.sick           = this.sick
      cs.sickUntil      = this.sickUntil
      cs.lastSickCheck  = this.lastSickCheck
      cs.lowHealthSince = this.lowHealthSinceToki
      cs.careCooldowns  = this.careCooldowns
      cs.actionCooldowns = this.actionCooldowns
      cs.checkupDone    = this.checkupDone
      cs.checkupActive  = this.checkupActive
      cs.checkupTier    = this.checkupTier
      cs.inventory      = this.inventory
      cs.locationMemory = this.locationMemory
      cs.disturbedUntil = this.disturbedUntil
      cs.rapidClicks    = this.rapidClicks
      cs.patCount       = this.patCount
      cs.lastPatTime    = this.lastPatTime
    },

    // Copies charactersState[id] → current flat fields
    _loadFromCharactersState(id) {
      const cs              = this.charactersState[id] || createDefaultCharacterState()
      this.sat              = cs.sat
      this.hlt              = cs.hlt
      this.moo              = cs.moo
      this.aff              = cs.aff
      this.playerAffinityToki = cs.playerAffinity ?? cs.aff
      this.sta              = cs.sta
      this.adoptedAt        = cs.adoptedAt || nowMs()
      this.staCritTicks     = cs.staCritTicks || 0
      this.sleeping         = cs.sleeping   || null
      this.sleepEnd         = cs.sleepEnd   || null
      this.sleepStart       = cs.sleepStart || null
      this._sleepNow        = cs.sleeping   ? nowMs() : 0
      this.sick             = cs.sick       || false
      this.sickUntil        = cs.sickUntil  || null
      this.lastSickCheck    = cs.lastSickCheck  || ''
      this.lowHealthSinceToki = cs.lowHealthSince || null
      this.careCooldowns    = cs.careCooldowns  || {}
      this.actionCooldowns  = cs.actionCooldowns || {}
      this.checkupDone      = cs.checkupDone    || false
      this.checkupActive    = cs.checkupActive  || false
      this.checkupTier      = cs.checkupTier    || null
      this.inventory        = cs.inventory      || []
      this.locationMemory   = cs.locationMemory || {}
      this.disturbedUntil   = cs.disturbedUntil || 0
      this.rapidClicks      = cs.rapidClicks    || []
      this.patCount         = cs.patCount       || 0
      this.lastPatTime      = cs.lastPatTime    || 0
    },

    _dlg() {
      return CHARACTER_DIALOGUE[this.selectedCharacter] || CHARACTER_DIALOGUE.toki
    },

    _visitorDlg() {
      const vid = this.activeVisitor
      if (!vid) return DEFAULT_VISITOR_DIALOGUE
      return CHARACTER_DIALOGUE[vid]?.visitor || DEFAULT_VISITOR_DIALOGUE
    },

    // Look up a nested key in visitor dialogue with fallback to DEFAULT.
    // e.g. _vd('actions','pat')  _vd('sleep','forcedNap')  _vd('food','default')
    _vd(section, key) {
      const vd = this._visitorDlg()
      return (vd[section]?.[key]) ?? (DEFAULT_VISITOR_DIALOGUE[section]?.[key]) ?? []
    },

    // Top-level visitor dialogue key with fallback.
    _vt(key) {
      const vd = this._visitorDlg()
      return vd[key] ?? DEFAULT_VISITOR_DIALOGUE[key] ?? []
    },

    _syncTokiAffinity() {
      this.aff = clamp(this.aff, 0, 300)
      this.playerAffinityToki = this.aff
    },

    _addTokiAffinity(amount) {
      this.aff = clamp(this.aff + amount, 0, 300)
      this.playerAffinityToki = this.aff
    },

    _addIchiroAffinity(amount) {
      this.playerAffinityIchiro = clamp(this.playerAffinityIchiro + amount, 0, 300)
    },

    _addVisitorAffinity(amount) {
      if (!this.activeVisitor) return
      if (this.activeVisitor === 'ichiro') {
        this.playerAffinityIchiro = clamp(this.playerAffinityIchiro + amount, 0, 300)
      } else {
        const cs = this.charactersState[this.activeVisitor]
        if (cs) { cs.aff = clamp((cs.aff || 0) + amount, 0, 300); cs.playerAffinity = cs.aff }
      }
    },

    _addRelationship(amount) {
      if (!this.activeVisitor) return
      const key = pairKey(this.selectedCharacter, this.activeVisitor)
      this.relationships[key] = clamp((this.relationships[key] ?? 0) + amount, 0, 300)
    },

    _needsVisitor(target) {
      return (target === 'ichiro' || target === 'duo') && !this.hasActiveVisitor
    },

    _isTargetSleeping(target) {
      if (target === 'duo') return this.isSleeping || this.isVisitorSleeping
      if (target !== 'toki') return this.isVisitorSleeping
      return this.isSleeping
    },

    _targetName(target) {
      if (target === 'duo') return `${this.tokiName} 和 ${this.activeVisitorName}`
      if (target !== 'toki') return this.activeVisitorName
      return this.tokiName
    },

    idleUpdate() {
      if (this.reacting || this.inGame || this.sleeping) return
      // sick 圖只在健康低於 30 且持續 8 小時後顯示。
      const dlg = this._dlg()
      if (this.tokiShowsSick) {
        this.setSprite('sick')
        if (this.hasActiveVisitor) this.visitorSprite = this._getIdleSpriteFor(this.activeVisitor)
        this.setMsg(rnd(dlg.idle?.sick || CHARACTER_DIALOGUE.toki.idle.sick))
        return
      }
      const sp = this._getIdleSprite()
      this.setSprite(sp)
      if (this.hasActiveVisitor) this.visitorSprite = this._getIdleSpriteFor(this.activeVisitor)
      if (this.nightMode && Math.random() < 0.4) {
        this.setMsg(rnd(dlg.night || CHARACTER_DIALOGUE.toki.night))
      } else {
        const idleMsgs = dlg.idle || CHARACTER_DIALOGUE.toki.idle
        this.setMsg(rnd(idleMsgs[sp] || idleMsgs.energetic || CHARACTER_DIALOGUE.toki.idle.energetic))
      }
    },

    _getIdleSprite() {
      if (this.sleeping) return 'sleeping'
      if (this.sat < 50) return 'hungry'
      if (this.tokiShowsSick) return 'sick'
      if (this.sta < 20) return 'impatient'
      if (this.hlt < 30) return 'helpless'
      if (this.moo < 25) return 'sad'
      return this._ambientSprite('toki')
    },

    _getIdleSpriteFor(who) {
      if (who === 'ichiro') {
        if (this.sleepingIchiro) return 'sleeping'
        if (this.satIchiro < 50) return 'hungry'
        if (this.ichiroShowsSick) return 'sick'
        if (this.staIchiro < 20) return 'impatient'
        if (this.hltIchiro < 30) return 'helpless'
        if (this.mooIchiro < 25) return 'helpless'
        return this._ambientSprite('ichiro')
      }
      const cs = this.charactersState[who]
      if (!cs) return 'happy'
      if (cs.sleeping) return 'sleeping'
      if (cs.sat < 50) return 'hungry'
      if (this.visitorShowsSick) return 'sick'
      if (cs.sta < 20) return 'impatient'
      if (cs.hlt < 30) return 'helpless'
      if (cs.moo < 25) return 'helpless'
      return this._ambientSprite(who)
    },

    _ambientSprite(who = 'toki') {
      const aff = who === 'ichiro' ? this.playerAffinityIchiro
        : who === 'toki' ? this.playerAffinityToki
        : (this.charactersState[who]?.playerAffinity ?? 50)
      const rel = this.currentRelationship
      const pool = ['happy', 'happy', 'shy', 'patted']
      if (aff >= 80) pool.push('heart')
      if (rel >= 40 && this.hasActiveVisitor) pool.push('shy', 'heart')
      if (Math.random() < 0.12) pool.push('helpless')
      if (Math.random() < 0.08) pool.push('impatient')
      return rnd(pool)
    },

    // ── React ─────────────────────────────────────────────────────────────

    react(sprite, msgs, dur = 2200) {
      if (this.reacting) return
      this.reacting = true
      clearTimeout(this.reactionTimer)
      this.setSprite(sprite)
      this.setMsg(rnd(msgs))
      this.reactionTimer = setTimeout(() => {
        this.reacting = false
        this.idleUpdate()
      }, dur)
    },

    reactPair(sprite, visitorSprite, effect, msgs, dur = 2400) {
      if (this.reacting) return
      this.reacting = true
      this.pairEffect = effect
      clearTimeout(this.reactionTimer)
      this.setSprite(sprite)
      this.visitorSprite = visitorSprite
      this.setMsg(rnd(msgs))
      this.reactionTimer = setTimeout(() => {
        this.reacting = false
        this.pairEffect = null
        this.idleUpdate()
      }, dur)
    },

    // ── Rapid-click detection ─────────────────────────────────────────────

    recordClick() {
      const t = nowMs()
      this.rapidClicks = this.rapidClicks.filter(c => t - c < 1000)
      this.rapidClicks.push(t)
      if (this.rapidClicks.length >= 5) {
        this.disturbedUntil = t + 10000
        this.rapidClicks    = []
        this.react('disturbed', (this._dlg().actions?.patSpam || CHARACTER_DIALOGUE.toki.actions.patSpam), 2000)
        return true
      }
      return false
    },

    // ── Actions ───────────────────────────────────────────────────────────

    doAction(type, target = 'toki') {
      if (this.reacting) return
      if (this._isTargetSleeping(target)) return 'sleeping'
      if (this._needsVisitor(target)) return 'need_visitor'
      if (target === 'duo') return this.doDuoAction(type)
      if (target === 'ichiro') return this.doIchiroAction(type)
      if (this.isDisturbed) return 'disturbed'

      const act = (this._dlg().actions || CHARACTER_DIALOGUE.toki.actions)
      const a = k => act[k] || CHARACTER_DIALOGUE.toki.actions[k]
      switch (type) {
        case 'pat': {
          const t = nowMs()
          if (t - this.lastPatTime > 60000) this.patCount = 0
          this.lastPatTime = t
          this.patCount++
          if (this.patCount > 3) {
            this.moo = clamp(this.moo - 10)
            this.react('sad', a('patOverdo'))
          } else {
            this.moo = clamp(this.moo + 10)
            this.aff = clamp(this.aff + 8, 0, 300)
            this.react('patted', a('pat'))
          }
          break
        }
        case 'praise':
          this.moo = clamp(this.moo + 18)
          this.aff = clamp(this.aff + 10, 0, 300)
          this.react('praised', a('praise'))
          break
        case 'poke':
          this.moo = clamp(this.moo - 5)
          this.react('disturbed', a('poke'))
          break
        case 'disturb':
          this.moo = clamp(this.moo - 15)
          this.react('disturbed', a('disturb'))
          break
        // ── 好感解鎖互動 ─────────────────────────────────────────────────
        case 'scarf':
          this.moo = clamp(this.moo + 8)
          this.aff = clamp(this.aff + 5, 0, 300)
          this.react('happy', a('scarf'))
          break
        case 'sit': {
          const cd = this.actionCooldowns['sit'] || 0
          if (nowMs() - cd < 6 * 3600 * 1000) return 'cooldown'
          this.actionCooldowns['sit'] = nowMs()
          this.aff = clamp(this.aff + 12, 0, 300)
          this.react('energetic', a('sit'))
          break
        }
        case 'idle_together': {
          const cd = this.actionCooldowns['idle_together'] || 0
          if (nowMs() - cd < 5 * 60 * 1000) return 'cooldown'
          this.actionCooldowns['idle_together'] = nowMs()
          this.sta = clamp(this.sta + 12)
          this.moo = clamp(this.moo + 10)
          this.aff = clamp(this.aff + 6, 0, 300)
          this.react('patted', a('idle_together'))
          break
        }
        case 'headphones': {
          const cd = this.actionCooldowns['headphones'] || 0
          if (nowMs() - cd < 8 * 3600 * 1000) return 'cooldown'
          this.actionCooldowns['headphones'] = nowMs()
          this.moo = clamp(this.moo + 15)
          this.hlt = clamp(this.hlt + 5)
          this.aff = clamp(this.aff + 8, 0, 300)
          this.react('happy', a('headphones'))
          break
        }
        case 'latenight':
          if (!this.nightMode) return 'not_night'
          this.aff = clamp(this.aff + 20, 0, 300)
          this.react('praised', a('latenight'))
          break
      }
      this.save()
    },

    doIchiroAction(type) {
      if (this.reacting) return
      if (!this.hasActiveVisitor) return 'need_visitor'
      const vid = this.activeVisitor
      const addVisitorMoo = (v) => {
        if (vid === 'ichiro') this.mooIchiro = clamp(this.mooIchiro + v)
        else { const cs = this.charactersState[vid]; if (cs) cs.moo = clamp(cs.moo + v) }
      }
      const addVisitorSta = (v) => {
        if (vid === 'ichiro') this.staIchiro = clamp(this.staIchiro + v)
        else { const cs = this.charactersState[vid]; if (cs) cs.sta = clamp(cs.sta + v) }
      }
      switch (type) {
        case 'pat':
          addVisitorMoo(12); this._addVisitorAffinity(9)
          this.reactPair(this.currentSprite, 'patted', 'hearts', this._vd('actions', 'pat'))
          break
        case 'praise':
          addVisitorMoo(16); this._addVisitorAffinity(10)
          this.reactPair(this.currentSprite, 'happy', 'hearts', this._vd('actions', 'praise'))
          break
        case 'poke':
          addVisitorMoo(-4)
          this.reactPair(this.currentSprite, 'helpless', 'near', this._vd('actions', 'poke'))
          break
        case 'disturb':
          addVisitorMoo(-12); this._addVisitorAffinity(-3)
          this.reactPair('disturbed', 'impatient', 'near', this._vd('actions', 'disturb'))
          break
        case 'idle_together':
          addVisitorSta(12); addVisitorMoo(10); this._addVisitorAffinity(6)
          this.reactPair(this.currentSprite, 'happy', 'near', this._vd('actions', 'idle_together'))
          break
        default:
          return false
      }
      this.save()
      return true
    },

    unlockVisitor(id = 'ichiro') {
      this.visitorUnlocked = true
      this.activeVisitor = id
      this.visitorSprite = 'happy'
      this.reactPair('happy', 'happy', 'hearts', this._vt('firstVisit'), 2600)
      this.save()
    },

    callVisitor(id = 'ichiro') {
      if (this.reacting) return
      this.visitorUnlocked = true
      this.activeVisitor = id
      this.visitorSprite = 'happy'
      this._sleepNowVisitor = 0
      this.reactPair('energetic', 'happy', 'near', this._vt('arrival'), 2400)
      this.save()
      return true
    },

    sendVisitorHome() {
      if (!this.hasActiveVisitor) return false
      // capture dialogue while activeVisitor is still set so {visitor} placeholder resolves
      this.react('energetic', this._vt('departure'), 2200)
      if (this.activeVisitor === 'ichiro') {
        this.sleepingIchiro   = null
        this.sleepEndIchiro   = null
        this.sleepStartIchiro = null
      } else {
        const cs = this.charactersState[this.activeVisitor]
        if (cs) { cs.sleeping = null; cs.sleepEnd = null; cs.sleepStart = null }
        this._sleepNowVisitor = 0
      }
      this.activeVisitor = null
      this.pairEffect = null
      this.save()
      return true
    },

    doDuoAction(id) {
      if (this.reacting) return
      if (this._isTargetSleeping('duo')) return 'sleeping'
      if (!this.hasActiveVisitor) return 'need_visitor'
      const action = DUO_ACTIONS.find(x => x.id === id)
      if (!action) return false
      if (this.currentRelationship < action.minRel) return 'locked'

      this.sat = clamp(this.sat + (action.sat || 0))
      this.moo = clamp(this.moo + (action.moo || 0))
      this.sta = clamp(this.sta + (action.sta || 0))
      this._addTokiAffinity(action.tokiAff || 0)
      this._addIchiroAffinity(action.ichiroAff || 0)
      this._addRelationship(action.rel || 0)

      const effect = id === 'mini_game' ? 'bounce' : id === 'chat' ? 'near' : 'hearts'
      const visitorSprite = id === 'chat' ? 'shy' : id === 'mini_game' ? 'happy' : 'heart'
      this.reactPair('happy', visitorSprite, effect, action.msgs, 2600)
      this.save()
      return true
    },

    doDuoCareAction(id) {
      if (this.reacting) return
      if (this._isTargetSleeping('duo')) return 'sleeping'
      if (!this.hasActiveVisitor) return 'need_visitor'
      const action = DUO_CARE_ACTIONS.find(x => x.id === id)
      if (!action) return false
      if (this.currentRelationship < action.minRel) return 'locked'

      this.hlt = clamp(this.hlt + (action.hlt || 0))
      this.sta = clamp(this.sta + (action.sta || 0))
      this.moo = clamp(this.moo + (action.moo || 0))
      this.hltIchiro = clamp(this.hltIchiro + (action.hlt || 0))
      this.staIchiro = clamp(this.staIchiro + (action.sta || 0))
      this.mooIchiro = clamp(this.mooIchiro + (action.moo || 0))
      this._addTokiAffinity(action.tokiAff || 0)
      this._addIchiroAffinity(action.ichiroAff || 0)
      this._addRelationship(action.rel || 0)
      this.reactPair('happy', 'happy', 'near', action.msgs, 2600)
      this.save()
      return true
    },

    // ── Food ──────────────────────────────────────────────────────────────

    doFood(id, target = 'toki') {
      if (this.reacting) return
      if (this._isTargetSleeping(target)) return 'sleeping'
      if (this._needsVisitor(target)) return 'need_visitor'
      if (target === 'ichiro') return this.doIchiroFood(id)
      if (this.isDisturbed) return 'disturbed'
      const f = FOODS.find(x => x.id === id)
      if (!f) return
      if (target === 'duo' && !f.duoOnly) return 'single_only'
      if (f.duoOnly && !this.hasActiveVisitor) return 'need_visitor'

      if (f.duoOnly) {
        this.sat = clamp(this.sat + (f.sat || 0))
        this.hlt = clamp(this.hlt + (f.hlt || 0))
        this.sta = clamp(this.sta + (f.sta || 0))
        this.moo = clamp(this.moo + (f.moo || 0))
        this.satIchiro = clamp(this.satIchiro + (f.sat || 0))
        this.hltIchiro = clamp(this.hltIchiro + (f.hlt || 0))
        this.staIchiro = clamp(this.staIchiro + (f.sta || 0))
        this.mooIchiro = clamp(this.mooIchiro + (f.moo || 0))
        this._addTokiAffinity(f.tokiAff || 0)
        this._addIchiroAffinity(f.ichiroAff || 0)
        this._addRelationship(f.rel || 0)
        this.reactPair(f.sp || 'happy', 'heart', 'hearts', f.msgs, 2600)
        this.save()
        return true
      }

      this.sat = clamp(this.sat + (f.sat || 0))
      this.hlt = clamp(this.hlt + (f.hlt || 0))
      this.sta = clamp(this.sta + (f.sta || 0))

      const cp = CHARACTER_MAP[this.selectedCharacter]?.foods?.[id]
      if (f.healthFood) {
        // 好感三段：低 / 中 / 高
        const tier = this.aff >= 200 ? 2 : this.aff >= 100 ? 1 : 0
        const mooTiers = cp?.mooTiers ?? f.mooTiers
        const affTiers = cp?.affTiers ?? f.affTiers
        const msgTiers = cp?.msgTiers ?? f.msgTiers
        const sp       = cp?.sp       ?? f.sp
        this.moo = clamp(this.moo + mooTiers[tier])
        this.aff = clamp(this.aff + affTiers[tier], 0, 300)
        this.react(sp, msgTiers[tier], 2200)
      } else {
        this.moo = clamp(this.moo + (cp?.moo  ?? f.moo  ?? 0))
        this.aff = clamp(this.aff + (cp?.aff  ?? f.aff  ?? 0), 0, 300)
        this.react(cp?.sp ?? f.sp, cp?.msgs ?? f.msgs, 2200)
      }
      this.save()
    },

    doIchiroFood(id) {
      if (this.reacting) return
      if (!this.hasActiveVisitor) return 'need_visitor'
      const vid = this.activeVisitor
      const f = FOODS.find(x => x.id === id)
      if (!f) return
      if (f.duoOnly) return 'duo_only'

      const getVisAff = () => vid === 'ichiro' ? this.playerAffinityIchiro : (this.charactersState[vid]?.playerAffinity ?? 0)
      const addVisitorStats = (dSat, dHlt, dSta, dMoo, dAff) => {
        if (vid === 'ichiro') {
          this.satIchiro = clamp(this.satIchiro + dSat)
          this.hltIchiro = clamp(this.hltIchiro + dHlt)
          this.staIchiro = clamp(this.staIchiro + dSta)
          this.mooIchiro = clamp(this.mooIchiro + dMoo)
          this._addIchiroAffinity(dAff)
        } else {
          const cs = this.charactersState[vid]
          if (cs) {
            cs.sat = clamp(cs.sat + dSat); cs.hlt = clamp(cs.hlt + dHlt)
            cs.sta = clamp(cs.sta + dSta); cs.moo = clamp(cs.moo + dMoo)
            cs.aff = clamp((cs.aff || 0) + dAff, 0, 300); cs.playerAffinity = cs.aff
          }
        }
      }

      const pref = CHARACTER_MAP[vid]?.visitorFoods?.[id]
      if (pref) {
        addVisitorStats(f.sat || 0, f.hlt || 0, f.sta || 0, pref.moo, pref.aff)
        this.reactPair(this.currentSprite, pref.sp || 'happy', 'near', pref.msgs, 2400)
      } else if (f.healthFood) {
        const charFoods = CHARACTER_MAP[vid]?.foods?.[id]
        const aff = getVisAff()
        const tier = aff >= 200 ? 2 : aff >= 100 ? 1 : 0
        const mooTiers = charFoods?.mooTiers ?? f.mooTiers
        const affTiers = charFoods?.affTiers ?? f.affTiers
        addVisitorStats(f.sat || 0, f.hlt || 0, f.sta || 0, mooTiers[tier], affTiers[tier])
        this.reactPair(this.currentSprite, charFoods?.sp ?? 'helpless', 'near', this._vd('food', 'healthFood'), 2400)
      } else {
        addVisitorStats(f.sat || 0, f.hlt || 0, f.sta || 0, f.moo || 0, f.aff || 0)
        const sprite = f.sp === 'sad' ? 'helpless' : f.sp
        this.reactPair(this.currentSprite, sprite, 'near', this._vd('food', 'default'), 2400)
      }
      this.save()
      return true
    },

    // ── Care ──────────────────────────────────────────────────────────────

    doCare(id, target = 'toki') {
      if (this.reacting) return
      if (this._isTargetSleeping(target)) return 'sleeping'
      if (this._needsVisitor(target)) return 'need_visitor'
      if (target === 'ichiro') return this.doIchiroCare(id)
      if (target === 'duo') return this.doDuoCareAction(id)
      if (this.isDisturbed) return 'disturbed'
      const item = CARE_ITEMS.find(x => x.id === id)
      if (!item) return

      // 緊急醫療：hlt > 30 且未生病時拒絕執行
      if (item.type === 'urgent') {
        const needsCare = this.hlt <= 30 || this.isSick
        if (!needsCare) {
          this.moo = clamp(this.moo - 10)
          this.aff = clamp(this.aff - 5, 0, 300)
          this.react('disturbed', item.refuseMsgs, 2000)
          return 'refused'
        }
        // 治好感冒
        if (this.isSick) {
          this.sick         = false
          this.sickUntil    = null
          this.lastSickCheck = ''   // 允許隔天再觸發
        }
      }

      // 每日 / 每週冷卻
      if (item.type === 'daily' || item.type === 'weekly') {
        const lastUsed   = this.careCooldowns[id] || 0
        const cooldownMs = item.cooldownHours * 3600 * 1000
        if (nowMs() - lastUsed < cooldownMs) return 'cooldown'
        this.careCooldowns[id] = nowMs()
      }

      // 一次性體檢 → 改由 openCheckup / closeCheckup 處理
      if (item.type === 'once') {
        return this.openCheckup()
      }

      this.hlt = clamp(this.hlt + (item.hlt || 0))
      this.moo = clamp(this.moo + (item.moo || 0))
      this.aff = clamp(this.aff + (item.aff || 0), 0, 300)

      this.react('happy', item.msgs, 2200)
      this.save()
    },

    doIchiroCare(id) {
      if (this.reacting) return
      if (!this.hasActiveVisitor) return 'need_visitor'
      const vid = this.activeVisitor
      const item = CARE_ITEMS.find(x => x.id === id)
      if (!item) return

      const getVisHlt = () => vid === 'ichiro' ? this.hltIchiro : (this.charactersState[vid]?.hlt ?? 100)
      if (item.type === 'urgent' && getVisHlt() > 30) {
        if (vid === 'ichiro') this.mooIchiro = clamp(this.mooIchiro - 6)
        else { const cs = this.charactersState[vid]; if (cs) cs.moo = clamp(cs.moo - 6) }
        this._addVisitorAffinity(-2)
        this.reactPair(this.currentSprite, 'helpless', 'near', this._vd('care', 'refused'))
        return 'refused'
      }

      const cooldownKey = `visitor:${vid}:${id}`
      if (item.type === 'daily' || item.type === 'weekly') {
        const lastUsed = this.careCooldowns[cooldownKey] || 0
        const cooldownMs = item.cooldownHours * 3600 * 1000
        if (nowMs() - lastUsed < cooldownMs) return 'cooldown'
        this.careCooldowns[cooldownKey] = nowMs()
      }

      if (item.type === 'once') {
        if (vid === 'ichiro') {
          if (this.checkupDoneIchiro) return 'used'
          this.checkupDoneIchiro = true
        } else {
          const cs = this.charactersState[vid]
          if (!cs) return 'used'
          if (cs.checkupDone) return 'used'
          cs.checkupDone = true
        }
      }

      if (vid === 'ichiro') {
        this.hltIchiro = clamp(this.hltIchiro + (item.hlt || 0))
        this.mooIchiro = clamp(this.mooIchiro + (item.moo || 0))
      } else {
        const cs = this.charactersState[vid]
        if (cs) { cs.hlt = clamp(cs.hlt + (item.hlt || 0)); cs.moo = clamp(cs.moo + (item.moo || 0)) }
      }
      this._addVisitorAffinity(item.aff || 0)
      this.reactPair(this.currentSprite, 'happy', 'hearts', this._vd('care', 'accepted'), 2400)
      this.save()
      return true
    },

    // ── Walk inventory ────────────────────────────────────────────────────

    addToInventory(item) {
      this.inventory.push(item)
      this.save()
    },

    // ── Game ──────────────────────────────────────────────────────────────

    openGame(id, target = 'toki') {
      if (this.reacting) return false
      if (this._isTargetSleeping(target)) return 'sleeping'
      if (this._needsVisitor(target)) return 'need_visitor'
      if (target === 'duo') return this.doDuoAction('mini_game')
      if (this.isDisturbed) return 'disturbed'
      const sat = target !== 'toki' ? this.visitorSat : this.sat
      const sta = target !== 'toki' ? this.visitorSta : this.sta
      if (sat <= 0) {
        const gd = this._dlg().game || CHARACTER_DIALOGUE.toki.game
        this.react('hungry', gd.hungry || CHARACTER_DIALOGUE.toki.game.hungry, 2000)
        if (target !== 'toki') this._addVisitorAffinity(-5)
        else this._addTokiAffinity(-5)
        return false
      }
      const staminaCost = GAME_STAMINA_COSTS[id] ?? 18
      if (sta < Math.max(5, staminaCost)) {
        const gd = this._dlg().game || CHARACTER_DIALOGUE.toki.game
        this.react('sleepy', gd.tired || CHARACTER_DIALOGUE.toki.game.tired, 2000)
        return false
      }
      this.inGame      = true
      this.activeGameId = id
      this.activeGameTarget = target
      return true
    },

    closeGame() {
      this.inGame       = false
      this.activeGameId = null
      this.activeGameTarget = 'toki'
      this.idleUpdate()
    },

    endGame(sprite, msgs, dm, de, da) {
      // hlt < 15 時遊戲回復減半
      const target = this.activeGameTarget || 'toki'
      const staminaCost = GAME_STAMINA_COSTS[this.activeGameId] ?? Math.abs(de || 18)
      const mult = (target === 'ichiro' ? this.hltIchiro : this.hlt) < 15 ? 0.5 : 1
      if (target === 'ichiro') {
        this.mooIchiro = clamp(this.mooIchiro + Math.round(dm * mult))
        this._addIchiroAffinity(da)
        this.staIchiro = clamp(this.staIchiro - staminaCost)
      } else {
        this.moo = clamp(this.moo + Math.round(dm * mult))
        this._addTokiAffinity(da)
        this.sta = clamp(this.sta - staminaCost)   // 遊戲耗體力
      }
      this.save()
      setTimeout(() => {
        this.closeGame()
        if (target === 'ichiro') this.reactPair(this.currentSprite, sprite, 'bounce', msgs, 2000)
        else this.react(sprite, msgs, 2000)
      }, 1100)
    },

    // ── Checkup ───────────────────────────────────────────────────────────

    openCheckup() {
      if (this.checkupDone)             return 'used'
      if (this.reacting || this.sleeping) return
      if (this.isDisturbed)             return 'disturbed'
      // 開場就決定結果 tier（根據當前健康值）
      this.checkupTier   = this.hlt >= 70 ? 'good' : this.hlt >= 40 ? 'ok' : 'bad'
      this.checkupActive = true
      return 'ok'
    },

    closeCheckup() {
      const tier         = this.checkupTier
      this.checkupActive = false
      this.checkupDone   = true
      this.checkupTier   = null

      // 依結果 tier 套用數值
      const cu = this._dlg().checkup || CHARACTER_DIALOGUE.toki.checkup
      if (tier === 'good') {
        this.hlt = clamp(this.hlt + 15)
        this.moo = clamp(this.moo + 10)
        this.aff = clamp(this.aff + 12, 0, 300)
        this.react('praised', cu.good || CHARACTER_DIALOGUE.toki.checkup.good, 2200)
      } else if (tier === 'ok') {
        this.hlt = clamp(this.hlt + 20)
        this.moo = clamp(this.moo + 3)
        this.aff = clamp(this.aff + 8, 0, 300)
        this.react('energetic', cu.ok || CHARACTER_DIALOGUE.toki.checkup.ok, 2200)
      } else {
        this.hlt = clamp(this.hlt + 25)
        this.moo = clamp(this.moo - 5)
        this.aff = clamp(this.aff + 5, 0, 300)
        this.react('sad', cu.bad || CHARACTER_DIALOGUE.toki.checkup.bad, 2200)
      }
      this.save()
    },

    // ── Sickness ──────────────────────────────────────────────────────────

    checkSickness() {
      const today = todayStr()
      if (this.lastSickCheck === today) return
      this.lastSickCheck = today

      // 感冒時間到：自然痊癒但扣健康
      if (this.sick && this.sickUntil && nowMs() >= this.sickUntil) {
        this.sick         = false
        this.sickUntil    = null
        this.hlt          = clamp(this.hlt - 5)
        const sk = this._dlg().sickness || CHARACTER_DIALOGUE.toki.sickness
        this.react('sad', sk.recovery || CHARACTER_DIALOGUE.toki.sickness.recovery, 2200)
        return
      }

      if (this.sick) return   // 已生病，不重複觸發

      // 根據健康值決定觸發機率
      const chance = this.hlt >= 50 ? 0.05 : this.hlt >= 30 ? 0.15 : 0.35
      if (Math.random() < chance) {
        this.sick      = true
        this.sickUntil = nowMs() + 24 * 60 * 60 * 1000
        this.setMsg('...頭有點重。別吵我。')
        this._sendNotif('sick', `${this.tokiName} 生病了 🤒`, '他好像有點不舒服，去照顧他。', 1)
      }
    },

    // ── Sleep ──────────────────────────────────────────────────────────────

    doSleep(type, target = 'toki') {
      if (this.reacting) return
      const endAt = nowMs() + (type === 'nap' ? NAP_MS : BED_MS)

      if (target !== 'toki') {
        if (!this.hasActiveVisitor) return 'need_visitor'
        const vid = this.activeVisitor
        if (vid === 'ichiro') {
          if (this.sleepingIchiro) return
          this.sleepingIchiro   = type
          this.sleepStartIchiro = nowMs()
          this.sleepEndIchiro   = endAt
          this._sleepNowIchiro  = nowMs()
        } else {
          const cs = this.charactersState[vid]
          if (!cs || cs.sleeping) return
          cs.sleeping   = type
          cs.sleepStart = nowMs()
          cs.sleepEnd   = endAt
          this._sleepNowVisitor = nowMs()
        }
        this.visitorSprite = 'sleeping'
        const vslp = this._visitorDlg().sleep || DEFAULT_VISITOR_DIALOGUE.sleep
        this.setMsg(type === 'nap' ? (vslp.napStart || DEFAULT_VISITOR_DIALOGUE.sleep.napStart) : (vslp.bedStart || DEFAULT_VISITOR_DIALOGUE.sleep.bedStart))
        this.save()
        return true
      }

      if (this.sleeping) return
      this.sleeping   = type
      this.sleepStart = nowMs()
      this.sleepEnd   = endAt
      this._sleepNow  = nowMs()
      this.setSprite('sleeping')
      const sd = this._dlg().sleep || CHARACTER_DIALOGUE.toki.sleep
      this.setMsg(type === 'nap' ? (sd.napStart || CHARACTER_DIALOGUE.toki.sleep.napStart) : (sd.bedStart || CHARACTER_DIALOGUE.toki.sleep.bedStart))
      this.save()
      return true
    },

    wakeUp(forced = false, target = 'toki') {
      if (target !== 'toki') {
        if (this.activeVisitor === 'ichiro') return this._wakeIchiro(forced)
        return this._wakeVisitor(forced, this.activeVisitor)
      }
      const type = this.sleeping
      if (!type) return
      const sleptMs = nowMs() - (this.sleepStart || nowMs())

      this.sleeping   = null
      this.sleepEnd   = null
      this.sleepStart = null
      this.currentSprite = 'energetic'

      const sw = this._dlg().sleep || CHARACTER_DIALOGUE.toki.sleep
      const s = k => sw[k] || CHARACTER_DIALOGUE.toki.sleep[k]
      if (forced && type === 'nap') {
        const frac = Math.min(sleptMs / NAP_MS, 1)
        this.moo = clamp(this.moo - 12)
        this.hlt = clamp(this.hlt + Math.round(8 * frac))
        this.sta = clamp(this.sta + Math.round(15 * frac))   // 沒睡完，部分體力回復
        this.react('disturbed', s('forcedNap'), 2200)
      } else if (type === 'nap') {
        this.moo = clamp(this.moo + 15)
        this.hlt = clamp(this.hlt + 8)
        this.sta = clamp(this.sta + 25)   // 小睡回體力
        this.react('energetic', s('naturalNap'), 2200)
        this._sendNotif('sleepend', `${this.tokiName} 睡醒了 ☀️`, '小睡結束了，去看看他。', 1)
      } else {
        const frac = Math.min(sleptMs / BED_MS, 1)
        this.moo = clamp(this.moo + Math.round(20 * frac))
        this.hlt = clamp(this.hlt + Math.round(15 * frac))
        this.sta = clamp(this.sta + Math.round(60 * frac))   // 長睡大量回體力
        this.sat = clamp(this.sat - 20)
        const hrs = sleptMs / 3600000
        if (frac >= 0.9) {
          this.react('energetic', s('fullSleep'), 2200)
          this._sendNotif('sleepend', `${this.tokiName} 睡醒了 ☀️`, '他已經起來了，去打個招呼吧。', 1)
        } else {
          const h  = Math.floor(hrs)
          const mn = Math.round((hrs - h) * 60)
          const timeStr = `才睡${h > 0 ? h + '小時' : ''}${mn > 0 ? mn + '分' : ''}。`
          this.react('sleepy', [timeStr, ...s('partialSleep')], 2200)
          this._sendNotif('sleepend', `${this.tokiName} 睡醒了（睡不飽）`, `才睡了${h > 0 ? h + '小時' : ''}${mn > 0 ? mn + '分' : ''}，他有點不高興。`, 1)
        }
      }
      this.save()
    },

    _wakeIchiro(forced = false) {
      const type = this.sleepingIchiro
      if (!type) return
      const sleptMs = nowMs() - (this.sleepStartIchiro || nowMs())

      this.sleepingIchiro   = null
      this.sleepEndIchiro   = null
      this.sleepStartIchiro = null
      this.visitorSprite    = 'happy'

      if (forced && type === 'nap') {
        const frac = Math.min(sleptMs / NAP_MS, 1)
        this.mooIchiro = clamp(this.mooIchiro - 8)
        this.hltIchiro = clamp(this.hltIchiro + Math.round(6 * frac))
        this.staIchiro = clamp(this.staIchiro + Math.round(15 * frac))
        this._addIchiroAffinity(-2)
        this.reactPair(this.currentSprite, 'impatient', 'near', this._vd('sleep', 'forcedNap'), 2200)
      } else if (type === 'nap') {
        this.mooIchiro = clamp(this.mooIchiro + 14)
        this.hltIchiro = clamp(this.hltIchiro + 8)
        this.staIchiro = clamp(this.staIchiro + 25)
        this.reactPair(this.currentSprite, 'happy', 'hearts', this._vd('sleep', 'naturalNap'), 2200)
      } else {
        const frac = Math.min(sleptMs / BED_MS, 1)
        this.mooIchiro = clamp(this.mooIchiro + Math.round(20 * frac))
        this.hltIchiro = clamp(this.hltIchiro + Math.round(15 * frac))
        this.staIchiro = clamp(this.staIchiro + Math.round(60 * frac))
        this.satIchiro = clamp(this.satIchiro - 18)
        if (frac >= 0.9) {
          this.reactPair(this.currentSprite, 'happy', 'hearts', this._vd('sleep', 'fullSleep'), 2200)
        } else {
          this.reactPair(this.currentSprite, 'helpless', 'near', this._vd('sleep', 'partialSleep'), 2200)
        }
      }
      this.save()
    },

    _wakeVisitor(forced = false, vid) {
      const cs = this.charactersState[vid]
      if (!cs?.sleeping) return
      const type = cs.sleeping
      const sleptMs = nowMs() - (cs.sleepStart || nowMs())

      cs.sleeping   = null
      cs.sleepEnd   = null
      cs.sleepStart = null
      this._sleepNowVisitor = 0
      this.visitorSprite    = 'happy'

      if (forced && type === 'nap') {
        const frac = Math.min(sleptMs / NAP_MS, 1)
        cs.moo = clamp(cs.moo - 8)
        cs.hlt = clamp(cs.hlt + Math.round(6 * frac))
        cs.sta = clamp(cs.sta + Math.round(15 * frac))
        this._addVisitorAffinity(-2)
        this.reactPair(this.currentSprite, 'impatient', 'near', this._vd('sleep', 'forcedNap'), 2200)
      } else if (type === 'nap') {
        cs.moo = clamp(cs.moo + 14); cs.hlt = clamp(cs.hlt + 8); cs.sta = clamp(cs.sta + 25)
        this.reactPair(this.currentSprite, 'happy', 'hearts', this._vd('sleep', 'naturalNap'), 2200)
      } else {
        const frac = Math.min(sleptMs / BED_MS, 1)
        cs.moo = clamp(cs.moo + Math.round(20 * frac))
        cs.hlt = clamp(cs.hlt + Math.round(15 * frac))
        cs.sta = clamp(cs.sta + Math.round(60 * frac))
        cs.sat = clamp(cs.sat - 18)
        if (frac >= 0.9) {
          this.reactPair(this.currentSprite, 'happy', 'hearts', this._vd('sleep', 'fullSleep'), 2200)
        } else {
          this.reactPair(this.currentSprite, 'helpless', 'near', this._vd('sleep', 'partialSleep'), 2200)
        }
      }
      this.save()
    },

    tickSleep() {
      const visitorSleeping = this.isVisitorSleeping
      const hadSleep = this.sleeping || visitorSleeping
      if (!hadSleep) return

      if (this.sleeping) {
        this._sleepNow = nowMs()
        const rem = this.sleepRemaining
        if (!this.reacting) {
          this.setMsg(this.sleeping === 'nap'
            ? `${this.tokiName}：...zz  剩 ${_fmtTime(rem)}`
            : `${this.tokiName}：...zzz  剩 ${_fmtTime(rem)}`)
        }
        if (rem <= 0) this.wakeUp(false, 'toki')
      }

      if (visitorSleeping) {
        const vid = this.activeVisitor
        const visName = vid === 'ichiro' ? 'Ichiro' : getCharacterName(vid)
        if (vid === 'ichiro') {
          this._sleepNowIchiro = nowMs()
          const rem = this.sleepRemainingIchiro
          if (!this.reacting && !this.sleeping) {
            this.setMsg(this.sleepingIchiro === 'nap'
              ? `${visName}：...zz  剩 ${_fmtTime(rem)}`
              : `${visName}：...zzz  剩 ${_fmtTime(rem)}`)
          }
          if (rem <= 0) this.wakeUp(false, 'ichiro')
        } else {
          this._sleepNowVisitor = nowMs()
          const rem = this.sleepRemainingVisitor
          if (!this.reacting && !this.sleeping) {
            const cs = this.charactersState[vid]
            this.setMsg(cs?.sleeping === 'nap'
              ? `${visName}：...zz  剩 ${_fmtTime(rem)}`
              : `${visName}：...zzz  剩 ${_fmtTime(rem)}`)
          }
          if (rem <= 0) this.wakeUp(false, vid)
        }
      }
    },

    // ── Notifications ─────────────────────────────────────────────────────

    checkNotifications() {
      if (!this.sleeping) {
        const s = Math.round(this.sat)
        const h = Math.round(this.hlt)
        const m = Math.round(this.moo)
        const e = Math.round(this.sta)

        if (s <= 0)  this._sendNotif('toki_sat_crit', `${this.tokiName} 餓壞了 🚨`,      `飽食：${s}　「...我不餓。」（他在說謊）`, 1)
        if (h <= 0)  this._sendNotif('toki_hlt_crit', `${this.tokiName} 健康亮紅燈 🆘`,  `健康：${h}　他的狀態非常糟糕。`, 1)
        if (m <= 0)  this._sendNotif('toki_moo_crit', `${this.tokiName} 快爆發了 💢`,    `心情：${m}　「別管我。」他心情差到極點了。`, 1)
        if (e <= 0)  this._sendNotif('toki_sta_crit', `${this.tokiName} 精疲力竭了 😵`,  `體力：${e}　他撐不住了，快讓他睡覺。`, 1)
        if (this.isSick) this._sendNotif('toki_sick', `${this.tokiName} 生病了 🤒`, '他有點不舒服，去照顧他。')

        if (s > 0 && s < 20) this._sendNotif('toki_sat_warn', `${this.tokiName} 餓了 🍜`,       `飽食：${s}　快去餵他！`)
        if (h > 0 && h < 20) this._sendNotif('toki_hlt_warn', `${this.tokiName} 健康警告 💊`,   `健康：${h}　要照顧他。`)
        if (m > 0 && m < 20) this._sendNotif('toki_moo_warn', `${this.tokiName} 心情很差 😤`,   `心情：${m}　去陪他說說話。`)
        if (e > 0 && e < 15) this._sendNotif('toki_sta_warn', `${this.tokiName} 快沒體力了 😪`, `體力：${e}　他需要休息了。`)
      }

      if (this.hasActiveVisitor && !this.isVisitorSleeping) {
        const vn = this.activeVisitorName
        const s = Math.round(this.visitorSat)
        const h = Math.round(this.visitorHlt)
        const m = Math.round(this.visitorMoo)
        const e = Math.round(this.visitorSta)

        if (s <= 0)  this._sendNotif('visitor_sat_crit', `${vn} 餓壞了 🚨`,     `飽食：${s}　${vn}：可以吃點東西嗎？`, 1)
        if (h <= 0)  this._sendNotif('visitor_hlt_crit', `${vn} 健康亮紅燈 🆘`, `健康：${h}　他的狀態非常糟糕。`, 1)
        if (m <= 0)  this._sendNotif('visitor_moo_crit', `${vn} 心情很差 🌧`,   `心情：${m}　他看起來有點低落。`, 1)
        if (e <= 0)  this._sendNotif('visitor_sta_crit', `${vn} 精疲力竭了 😵`, `體力：${e}　他需要休息。`, 1)

        if (s > 0 && s < 20) this._sendNotif('visitor_sat_warn', `${vn} 餓了 🍜`,       `飽食：${s}　幫他準備點吃的。`)
        if (h > 0 && h < 20) this._sendNotif('visitor_hlt_warn', `${vn} 健康警告 💊`,   `健康：${h}　要照顧他。`)
        if (m > 0 && m < 20) this._sendNotif('visitor_moo_warn', `${vn} 心情很差 🌧`,   `心情：${m}　去陪他說說話。`)
        if (e > 0 && e < 15) this._sendNotif('visitor_sta_warn', `${vn} 快沒體力了 😪`, `體力：${e}　他需要休息。`)
      }

      // 第 14 天倒數通知
      const left = this.daysLeft
      if (left === 3) this._sendNotif('day3', `${this.tokiName} 還有 3 天 📅`, '他快要離開了，好好珍惜這段時間。')
      if (left === 1) this._sendNotif('day1', `${this.tokiName} 還有 1 天 ⏳`, '明天他就要走了。')
      if (left === 0) this._sendNotif('day0', `${this.tokiName} 要離開了 💔`, '今天是最後一天了。好好陪他。')
    },

    scheduleBackgroundNotifications() {
      const nightMult = this.nightMode ? 2 : 1
      const DECAY = {
        tokiSat: 1.0 / 64,
        tokiHlt: 0.08 / 64,
        tokiMoo: (0.6 / 64) * nightMult,
        tokiSta: 0.4 / 8,
        ichiroSat: 0.85 / 64,
        ichiroHlt: 0.06 / 64,
        ichiroMoo: (0.5 / 64) * nightMult,
        ichiroSta: 0.32 / 8
      }
      const secsUntil = (val, threshold, decay) =>
        decay <= 0 ? null : Math.max(1, Math.round((val - threshold) / decay))

      const jobs = []

      const addStatJobs = ({ prefix, name, sat, hlt, moo, sta, decay, toki = false }) => {
        const s = Math.round(sat)
        const h = Math.round(hlt)
        const m = Math.round(moo)
        const e = Math.round(sta)
        // When health is already low, moo decays 1.5x faster (matches tick() mooMult)
        const effectiveMooDec = decay.moo * (hlt < 30 ? 1.5 : 1)

        if (sat <= 0) jobs.push({ id: `${prefix}_sat_crit`, title: `${name} 餓壞了 🚨`, body: toki ? '飽食：0　「...我不餓。」（他在說謊）' : '飽食：0　他需要吃點東西。', delay: 1 })
        else {
          jobs.push({ id: `${prefix}_sat_crit`, title: `${name} 餓壞了 🚨`, body: toki ? '飽食：0　「...我不餓。」（他在說謊）' : '飽食：0　他需要吃點東西。', delay: secsUntil(sat, 0, decay.sat) })
          if (sat <= 20) jobs.push({ id: `${prefix}_sat_warn`, title: `${name} 餓了 🍜`, body: `飽食：${s}　快去餵他！`, delay: 1 })
          else jobs.push({ id: `${prefix}_sat_warn`, title: `${name} 餓了 🍜`, body: `飽食：20　快去餵他！`, delay: secsUntil(sat, 20, decay.sat) })
        }

        if (hlt <= 0) jobs.push({ id: `${prefix}_hlt_crit`, title: `${name} 健康亮紅燈 🆘`, body: '健康：0　他的狀態非常糟糕。', delay: 1 })
        else {
          jobs.push({ id: `${prefix}_hlt_crit`, title: `${name} 健康亮紅燈 🆘`, body: '健康：0　他的狀態非常糟糕。', delay: secsUntil(hlt, 0, decay.hlt) })
          if (hlt <= 20) jobs.push({ id: `${prefix}_hlt_warn`, title: `${name} 不太舒服 💊`, body: `健康：${h}　該照顧他一下。`, delay: 1 })
          else jobs.push({ id: `${prefix}_hlt_warn`, title: `${name} 不太舒服 💊`, body: `健康：20　該照顧他一下。`, delay: secsUntil(hlt, 20, decay.hlt) })
        }

        if (moo <= 0) jobs.push({ id: `${prefix}_moo_crit`, title: `${name} 心情跌到谷底 💢`, body: '心情：0　去陪他說說話。', delay: 1 })
        else {
          jobs.push({ id: `${prefix}_moo_crit`, title: `${name} 心情跌到谷底 💢`, body: '心情：0　去陪他說說話。', delay: secsUntil(moo, 0, effectiveMooDec) })
          if (moo <= 20) jobs.push({ id: `${prefix}_moo_warn`, title: `${name} 心情很差 😤`, body: `心情：${m}　去陪他說說話。`, delay: 1 })
          else jobs.push({ id: `${prefix}_moo_warn`, title: `${name} 心情很差 😤`, body: `心情：20　去陪他說說話。`, delay: secsUntil(moo, 20, effectiveMooDec) })
        }

        if (sta <= 0) jobs.push({ id: `${prefix}_sta_crit`, title: `${name} 精疲力竭了 😵`, body: '體力：0　他需要休息。', delay: 1 })
        else {
          jobs.push({ id: `${prefix}_sta_crit`, title: `${name} 精疲力竭了 😵`, body: '體力：0　他需要休息。', delay: secsUntil(sta, 0, decay.sta) })
          if (sta <= 15) jobs.push({ id: `${prefix}_sta_warn`, title: `${name} 快沒體力了 😪`, body: `體力：${e}　他需要休息了。`, delay: 1 })
          else jobs.push({ id: `${prefix}_sta_warn`, title: `${name} 快沒體力了 😪`, body: `體力：15　他需要休息了。`, delay: secsUntil(sta, 15, decay.sta) })
        }
      }

      if (!this.sleeping) {
        addStatJobs({
          prefix: 'toki',
          name: this.tokiName,
          sat: this.sat,
          hlt: this.hlt,
          moo: this.moo,
          sta: this.sta,
          decay: { sat: DECAY.tokiSat, hlt: DECAY.tokiHlt, moo: DECAY.tokiMoo, sta: DECAY.tokiSta },
          toki: true
        })
        if (this.isSick) jobs.push({ id: 'toki_sick', title: `${this.tokiName} 生病了 🤒`, body: '他有點不舒服，去照顧他。', delay: 1 })
      } else if (this.sleepEnd) {
        // Sat still decays during sleep (0.3/8 per tick = 0.3/64 per second)
        const SLEEP_SAT_DECAY = 0.3 / 64
        const sleepRemainSec = Math.max(1, Math.ceil((this.sleepEnd - nowMs()) / 1000))
        const satAfterSleep  = Math.max(0, this.sat - SLEEP_SAT_DECAY * sleepRemainSec)
        const wakeTitle      = `${this.tokiName} 睡醒了 ☀️`
        if (satAfterSleep < 20) {
          // Estimate when sat will hit 0 during sleep (may be before wake)
          const satZeroDelay = Math.max(1, Math.round(this.sat / SLEEP_SAT_DECAY))
          jobs.push({ id: 'toki_sleepwake_sat', title: wakeTitle, body: '他睡了很久沒吃東西，記得餵他！', delay: Math.min(satZeroDelay, sleepRemainSec + 30) })
        } else {
          jobs.push({ id: 'toki_sleepwake', title: wakeTitle, body: '他睡醒了，去打個招呼吧。', delay: sleepRemainSec + 30 })
        }
      }

      if (this.hasActiveVisitor && !this.isVisitorSleeping) {
        addStatJobs({
          prefix: 'visitor',
          name: this.activeVisitorName,
          sat: this.visitorSat,
          hlt: this.visitorHlt,
          moo: this.visitorMoo,
          sta: this.visitorSta,
          decay: { sat: DECAY.ichiroSat, hlt: DECAY.ichiroHlt, moo: DECAY.ichiroMoo, sta: DECAY.ichiroSta }
        })
      }

      _tokiBridge({ action: 'cancelAll' })
      for (const j of jobs) {
        _tokiBridge({ action: 'schedule', id: j.id, title: j.title, body: j.body, delay: j.delay })
      }
    },

    cancelBackgroundNotifications() {
      _tokiBridge({ action: 'cancelAll' })
      this._notifSent = {}
    },

    _sendNotif(id, title, body, delay = 1) {
      const bucket = Math.floor(nowMs() / 600000)
      if (this._notifSent[id] === bucket) return
      this._notifSent[id] = bucket
      if (typeof document !== 'undefined' && !document.hidden) {
        // App is in foreground: iOS won't show banner, so surface as in-app toast
        this._inAppNotif = { id, title, body }
      } else {
        _tokiBridge({ action: 'schedule', id, title, body, delay })
      }
    }
  }
})

// ── Utilities ──────────────────────────────────────────────────────────────

export function _fmtTime(ms) {
  if (ms <= 0) return '00:00'
  const total = Math.ceil(ms / 1000)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const p = n => String(n).padStart(2, '0')
  return h > 0 ? `${p(h)}:${p(m)}:${p(s)}` : `${p(m)}:${p(s)}`
}

export function _tokiBridge(msg) {
  try {
    window.webkit?.messageHandlers?.toki?.postMessage(msg)
  } catch (_) {}
}
