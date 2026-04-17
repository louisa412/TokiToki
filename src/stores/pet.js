import { defineStore } from 'pinia'

// ── Constants ──────────────────────────────────────────────────────────────

export const FOODS = [
  // ── 原有食物 ──────────────────────────────────────────────────────────
  { id: 'coffee',   ico: '☕', name: '黑咖啡',       sat: 5,  hlt: 0,   moo: 10,  aff: 5,  sp: 'praised',   msgs: ['嗯。這個可以。', '...勉強合格。', '黑的才對。'] },
  { id: 'ramen',    ico: '🍜', name: '家系拉麵',      sat: 40, hlt: -8,  moo: 15,  aff: 10, sp: 'happy',     msgs: ['...不錯。', '哼，還行。', '就這個。'] },
  { id: 'bento',    ico: '🍱', name: '燒肉便當',      sat: 35, hlt: 5,   moo: 10,  aff: 8,  sp: 'energetic', msgs: ['蛋白質。補充完畢。', '...吃完繼續。', '好。'] },
  { id: 'mapo',     ico: '🌶', name: '激辛麻婆豆腐',  sat: 20, hlt: -5,  moo: 20,  aff: 15, sp: 'happy',     msgs: ['...辣得剛好。', '汗出來了。還行。', '這才叫吃飯。'] },
  { id: 'porridge', ico: '🍓', name: '草莓粥 ★',      sat: 50, hlt: 10,  moo: -20, aff: 30, sp: 'sad',       msgs: ['......你做的？', '...甜的。', '...為什麼是草莓。算了。'] },
  { id: 'cig',      ico: '🚬', name: '巧克力香菸',    sat: 0,  hlt: -10, moo: 25,  aff: 5,  sp: 'praised',   msgs: ['...這種例外。', '不是我喜歡甜的。', '...好抽。'] },
  { id: 'shumai',   ico: '🥟', name: '橫濱燒賣',      sat: 15, hlt: 3,   moo: 10,  aff: 5,  sp: 'energetic', msgs: ['橫濱的味道。', '...合格。', '還不錯。'] },
  { id: 'energy',   ico: '⚡', name: '能量飲',         sat: 5,  hlt: -5,  moo: 5,   aff: 0,  sp: 'energetic', msgs: ['準備好了。', '...體力回來了。', '來吧。'] },
  // ── 上次新增食物 ───────────────────────────────────────────────────────
  { id: 'noodle',   ico: '🍝', name: '泡麵 🌙',        sat: 45, hlt: -12, moo: 15,  aff: 8,  sp: 'happy',     msgs: ['...深夜吃這個最好。', '鹽分超標。知道了。', '...燙的才行。'], nightOnly: true },
  { id: 'beer',     ico: '🍺', name: '罐裝啤酒',       sat: 5,  hlt: -8,  moo: 20,  aff: 5,  sp: 'happy',     msgs: ['...還行。', '苦的才對。', '一罐就好。'] },
  { id: 'onigiri',  ico: '🍙', name: '鹽味飯糰',       sat: 25, hlt: 5,   moo: 5,   aff: 3,  sp: 'energetic', msgs: ['簡單的就行。', '...鹽分剛好。', '不用多的。'] },
  { id: 'donut',    ico: '🍩', name: '甜甜圈',          sat: 20, hlt: -6,  moo: 30,  aff: 8,  sp: 'happy',     msgs: ['...甜的。', '別說出去。', '就這次。'] },
  { id: 'chips',    ico: '🍟', name: '辣味薯片',        sat: 10, hlt: -8,  moo: 15,  aff: 5,  sp: 'energetic', msgs: ['辣的才對。', '...脆。', '可以。'] },
  { id: 'matcha',   ico: '🍦', name: '抹茶冰淇淋',     sat: 15, hlt: 2,   moo: 20,  aff: 10, sp: 'praised',   msgs: ['...抹茶還行。', '甜度適中。', '...你記得我喜歡這個？'] },
  // ── 健康向食物（好感分三段懲罰）──────────────────────────────────────
  { id: 'salad',    ico: '🥗', name: '蔬菜沙拉',   sat: 10, hlt: 25, sp: 'sad', healthFood: true,
    mooTiers: [-15, -8, -4], affTiers: [-5, -2, 0],
    msgTiers: [
      ['你想幹嘛。這什麼東西。', '我又不是兔子。', '...不吃。'],
      ['...你是認真的。', '吃就吃。少廢話。', '...隨便。'],
      ['...算了。你說好就好。', '...不難吃。（小聲）', '...謝。']
    ]
  },
  { id: 'greentea', ico: '🍵', name: '無糖綠茶',   sat: 0,  hlt: 20, sp: 'sad', healthFood: true,
    mooTiers: [-5, -2, 0], affTiers: [0, 0, 3],
    msgTiers: [
      ['...這什麼。', '沒味道。', '你在折磨我？'],
      ['...還行。', '淡的。', '勉強喝。'],
      ['...習慣了。', '有點苦。還行。', '...謝。']
    ]
  },
  { id: 'chicken',  ico: '🍗', name: '水煮雞胸肉', sat: 30, hlt: 30, sp: 'sad', healthFood: true,
    mooTiers: [-20, -12, -6], affTiers: [-8, -3, 0],
    msgTiers: [
      ['你在懲罰我嗎。', '這叫吃飯？', '...難吃。'],
      ['...吃完了。', '下次別這個。', '...謝。'],
      ['...你擔心我。', '知道了。吃。', '...沒你想的那麼難吃。（小聲）']
    ]
  }
]

export const GAMES = [
  { id: 'rps',    ico: '✊', name: '猜拳對決' },
  { id: 'stare',  ico: '👁', name: '瞪眼大賽' },
  { id: 'rap',    ico: '🎤', name: '饒舌接龍' },
  { id: 'coin',   ico: '🪙', name: '猜猜硬幣' },
  { id: 'shoot',  ico: '🎯', name: '標靶射擊' },
  { id: 'polish', ico: '🎙', name: '擦麥克風' },
  { id: 'walk',   ico: '🗺', name: '橫濱散步' },
  { id: 'listen', ico: '💬', name: '聽他抱怨' },
  { id: 'typing', ico: '⌨', name: '打字競速' },
  { id: 'memory', ico: '🃏', name: '記憶翻牌' },
  { id: 'quiz',   ico: '❓', name: '問答猜謎' },
  { id: 'dice',   ico: '🎲', name: '骰子大小' }
]

export const CARE_ITEMS = [
  // 緊急醫療
  { id: 'medicine', ico: '💊', name: '吃藥',    type: 'urgent', hlt: 25, moo: -10, aff: 0,
    msgs:       ['...苦的。', '不需要你多管。', '...謝。'],
    refuseMsgs: ['我沒事。', '你多管什麼。', '退開。']
  },
  { id: 'bandage',  ico: '🩹', name: '貼藥布',  type: 'urgent', hlt: 15, moo: -5,  aff: 0,
    msgs:       ['...小傷而已。', '不用這麼緊張。', '...謝。'],
    refuseMsgs: ['哪裡需要。', '你眼神有問題。', '走開。']
  },
  { id: 'clinic',   ico: '🏥', name: '去診所',  type: 'urgent', hlt: 40, moo: -5,  aff: -5,
    msgs:       ['...沒事了。', '就是小問題。', '...早點來就好了。'],
    refuseMsgs: ['你說我病？', '我自己的身體我清楚。', '不要。']
  },
  // 日常保養
  { id: 'supplement', ico: '🧴', name: '保健食品', type: 'daily',  hlt: 10, moo: 0,   aff: 2,  cooldownHours: 24,
    msgs: ['...這什麼。', '每天都要吃？', '...好。']
  },
  { id: 'bath',       ico: '🛁', name: '泡澡',    type: 'daily',  hlt: 5,  moo: 15,  aff: 5,  cooldownHours: 24,
    msgs: ['...洗完了。', '別偷看。', '...舒服一點了。']
  },
  { id: 'haircut',    ico: '✂️', name: '剪頭髮',  type: 'weekly', hlt: 0,  moo: 10,  aff: 12, cooldownHours: 168,
    msgs: ['...整齊多了。', '不要剪太短。', '...還行。']
  },
  // 定期體檢（限一次）
  { id: 'checkup',    ico: '🩺', name: '定期體檢', type: 'once',  hlt: 15, moo: 5,   aff: 10, sat: 5,
    msgs: ['...沒問題。', '結果出來了。都正常。', '...你記得幫我約。謝。']
  }
]

export const UNLOCK_ACTIONS = [
  { id: 'scarf',      ico: '🧣', name: '提醒穿外套',   minAff: 80  },
  { id: 'sit',        ico: '📖', name: '陪他安靜坐著', minAff: 120, cooldownHours: 6 },
  { id: 'headphones', ico: '🎧', name: '借他耳機聽歌', minAff: 160, cooldownHours: 8 },
  { id: 'latenight',  ico: '🌙', name: '深夜一起待著', minAff: 200, nightOnly: true  }
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

const IDLE_MSGS = {
  hungry: [
    '我餓了。很明顯吧。',
    '你不會沒發現。還是你裝的。',
    '我現在沒什麼耐心。',
    '你要幫就快一點。不要拖。',
    '快點。',
    '你想讓我餓死嗎。'
  ],
  sleepy: [
    '我有點累。不是因為你。只是剛好。',
    '現在聲音有點遠。',
    '安靜一點。',
    '...困了。讓我睡。',
    '眼睛睜不開...',
    '反正我會先睡。'
  ],
  sad: [
    '你剛剛去哪了。',
    '只是有點久。久到我開始覺得你不會來。',
    '還好你最後還是出現了。',
    '我沒有在等你。只是剛好沒別的事。',
    '...算了，你來就好。',
    '...無聊。...隨便。走開。'
  ],
  energetic: [
    '你來了喔。還算準時。',
    '我還以為你今天不會出現。',
    '我沒在等你，只是剛好你來了。',
    '時間過得很慢，你知道嗎。',
    '你不在的時候更慢。',
    '我本來沒打算說話的。但你來了就算了。',
    '你看起來沒什麼變。還是一樣。',
    '我剛剛在想事情。現在不想了。',
    '哼。今天狀態不差。',
    '...有什麼事嗎。',
    '就這樣站著看嗎。'
  ],
  sick: [
    '...頭有點重。別吵我。',
    '...最近狀態不太好。',
    '身體有點沉。',
    '...不舒服。別問。',
    '有點發燒的感覺。不嚴重。',
    '...你來了。就待著。',
    '...現在不想動。',
    '安靜點。頭很痛。'
  ]
}

const NIGHT_MSGS = [
  '這時間你還醒著。也太誇張。',
  '我也是。所以才在這。',
  '現在比較安靜。你不要突然走。',
  '深夜的橫濱很安靜。你不一樣。',
  '這個時間點，有點特別。'
]

// ── Helpers ────────────────────────────────────────────────────────────────

const clamp    = (v, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v))
const rnd      = arr => arr[Math.floor(Math.random() * arr.length)]
const nowMs    = () => Date.now()
const todayStr = () => new Date().toISOString().slice(0, 10)

// ── Store ──────────────────────────────────────────────────────────────────

export const usePetStore = defineStore('pet', {
  state: () => ({
    // Core stats
    sat: 75,
    hlt: 70,
    moo: 65,
    aff: 50,

    // UI state
    currentSprite: 'energetic',
    lastMsg: '橫濱，本大爺回來了。',
    nightMode: false,

    // Interaction state
    reacting: false,
    reactionTimer: null,
    inGame: false,
    activeGameId: null,

    disturbedUntil: 0,
    rapidClicks: [],
    patCount: 0,
    lastPatTime: 0,

    // Sleep state
    sleeping: null,
    sleepEnd: null,
    sleepStart: null,
    _sleepNow: 0,

    // Sickness
    sick: false,
    sickUntil: null,
    lastSickCheck: '',

    // Cooldowns
    careCooldowns:   {},   // { [itemId]: timestamp }
    actionCooldowns: {},   // { [actionId]: timestamp }
    checkupDone:   false,
    checkupActive: false,   // 體檢劇場進行中
    checkupTier:   null,    // 'good' | 'ok' | 'bad'，開場決定，結束才生效

    // Notification dedup
    _notifSent: {}
  }),

  getters: {
    currentTitle: (state) => {
      let title = TITLES[0][1]
      for (const [threshold, name] of TITLES) {
        if (state.aff >= threshold) title = name
      }
      return title
    },
    isDisturbed:    (state) => nowMs() < state.disturbedUntil,
    isSleeping:     (state) => !!state.sleeping,
    isSick:         (state) => state.sick && (state.sickUntil === null || nowMs() < state.sickUntil),
    sleepRemaining: (state) => state.sleepEnd ? Math.max(0, state.sleepEnd - state._sleepNow) : 0
  },

  actions: {
    // ── Persistence ──────────────────────────────────────────────────────

    save() {
      try {
        localStorage.setItem('toki_v5', JSON.stringify({
          sat: this.sat, hlt: this.hlt, moo: this.moo, aff: this.aff,
          sleeping: this.sleeping, sleepEnd: this.sleepEnd, sleepStart: this.sleepStart,
          sick: this.sick, sickUntil: this.sickUntil, lastSickCheck: this.lastSickCheck,
          careCooldowns:   this.careCooldowns,
          actionCooldowns: this.actionCooldowns,
          checkupDone:     this.checkupDone,
          savedAt: nowMs()
        }))
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
        if (!raw) return false
        const d       = JSON.parse(raw)
        const elapsed = (nowMs() - d.savedAt) / 1000
        const t       = Math.min(elapsed, 21600)

        this.sat = clamp(d.sat - t * (1.0 / 64))
        this.hlt = clamp(migrated ? 70 : (d.hlt ?? 70))   // hlt 不隨離線衰減
        this.moo = clamp(d.moo - t * (0.6 / 64))
        this.aff = clamp(d.aff, 0, 300)

        if (!migrated) {
          this.sick            = d.sick || false
          this.sickUntil       = d.sickUntil || null
          this.lastSickCheck   = d.lastSickCheck || ''
          this.careCooldowns   = d.careCooldowns || {}
          this.actionCooldowns = d.actionCooldowns || {}
          this.checkupDone     = d.checkupDone || false
        }

        // 離線時感冒自然痊癒但補扣 hlt
        if (this.sick && this.sickUntil && nowMs() >= this.sickUntil) {
          this.sick      = false
          this.sickUntil = null
          this.hlt       = clamp(this.hlt - 5)
        }

        if (d.sleeping && d.sleepEnd) {
          this.sleeping   = d.sleeping
          this.sleepEnd   = d.sleepEnd
          this.sleepStart = d.sleepStart || d.savedAt
          if (nowMs() >= d.sleepEnd) {
            setTimeout(() => this.wakeUp(false), 500)
          }
          return true
        }

        return { elapsed }
      } catch (_) {
        return false
      }
    },

    // ── Decay (每 8 秒) ───────────────────────────────────────────────────

    tick() {
      if (this.sleeping) {
        this.sat = clamp(this.sat - 0.3 / 8)
        this._updateNightMode()
        return
      }
      const r       = this.nightMode ? 2 : 1
      const mooMult = this.hlt < 30 ? 1.5 : 1   // 健康差 → 心情衰減加快
      this.sat = clamp(this.sat - 1.0 / 8)
      this.moo = clamp(this.moo - (0.6 / 8) * r * mooMult)
      // hlt 不自然衰減，只靠食物 / 照護 / 生病改變
      this._updateNightMode()
      this.checkSickness()
      if (!this.reacting && !this.inGame) this.idleUpdate()
      this.checkNotifications()
    },

    _updateNightMode() {
      const h = new Date().getHours()
      this.nightMode = h >= 22 || h < 6
    },

    // ── Sprite & message ─────────────────────────────────────────────────

    setSprite(name) { this.currentSprite = name },
    setMsg(text)    { this.lastMsg = text },

    idleUpdate() {
      if (this.reacting || this.inGame || this.sleeping) return
      // 生病時優先顯示 sick 台詞
      if (this.isSick) {
        this.setMsg(rnd(IDLE_MSGS.sick))
        return
      }
      const sp = this._getIdleSprite()
      this.setSprite(sp)
      if (this.nightMode && Math.random() < 0.4) {
        this.setMsg(rnd(NIGHT_MSGS))
      } else {
        this.setMsg(rnd(IDLE_MSGS[sp]))
      }
    },

    _getIdleSprite() {
      if (this.sat < 25) return 'hungry'
      if (this.hlt < 25) return 'sleepy'
      if (this.moo < 25) return 'sad'
      return 'energetic'
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

    // ── Rapid-click detection ─────────────────────────────────────────────

    recordClick() {
      const t = nowMs()
      this.rapidClicks = this.rapidClicks.filter(c => t - c < 1000)
      this.rapidClicks.push(t)
      if (this.rapidClicks.length >= 5) {
        this.disturbedUntil = t + 10000
        this.rapidClicks    = []
        this.react('disturbed', ['煩死了。', '你有完沒完。', '再點我打你。'], 2000)
        return true
      }
      return false
    },

    // ── Actions ───────────────────────────────────────────────────────────

    doAction(type) {
      if (this.reacting || this.sleeping) return
      if (this.isDisturbed) return 'disturbed'

      switch (type) {
        case 'pat': {
          const t = nowMs()
          if (t - this.lastPatTime > 60000) this.patCount = 0
          this.lastPatTime = t
          this.patCount++
          if (this.patCount > 3) {
            this.moo = clamp(this.moo - 10)
            this.react('sad', ['煩了。別碰我。', '夠了。', '...滾開。'])
          } else {
            this.moo = clamp(this.moo + 10)
            this.aff = clamp(this.aff + 8, 0, 300)
            this.react('patted', ['...不許摸。', '說了不行...', '...隨你。'])
          }
          break
        }
        case 'praise':
          this.moo = clamp(this.moo + 18)
          this.aff = clamp(this.aff + 10, 0, 300)
          this.react('praised', ['...那是當然的。', '廢話。', '不需要你說。'])
          break
        case 'poke':
          this.moo = clamp(this.moo - 5)
          this.react('disturbed', ['...你幹嘛。', '戳什麼戳。', '找打？'])
          break
        case 'disturb':
          this.moo = clamp(this.moo - 15)
          this.react('disturbed', ['你煩嗎。', '你有完沒完。', '...去。'])
          break
        // ── 好感解鎖互動 ─────────────────────────────────────────────────
        case 'scarf':
          this.moo = clamp(this.moo + 8)
          this.aff = clamp(this.aff + 5, 0, 300)
          this.react('happy', ['...知道了。', '多管閒事。', '...謝。'])
          break
        case 'sit': {
          const cd = this.actionCooldowns['sit'] || 0
          if (nowMs() - cd < 6 * 3600 * 1000) return 'cooldown'
          this.actionCooldowns['sit'] = nowMs()
          this.aff = clamp(this.aff + 12, 0, 300)
          this.react('energetic', ['...。', '你不說話也行。', '...就這樣就好。'])
          break
        }
        case 'headphones': {
          const cd = this.actionCooldowns['headphones'] || 0
          if (nowMs() - cd < 8 * 3600 * 1000) return 'cooldown'
          this.actionCooldowns['headphones'] = nowMs()
          this.moo = clamp(this.moo + 15)
          this.hlt = clamp(this.hlt + 5)
          this.aff = clamp(this.aff + 8, 0, 300)
          this.react('happy', ['...不錯。', '這首我喜歡。', '你的品味還行。'])
          break
        }
        case 'latenight':
          if (!this.nightMode) return 'not_night'
          this.aff = clamp(this.aff + 20, 0, 300)
          this.react('praised', ['...你還在。', '深夜跟你待著，還行。', '...別走太早。'])
          break
      }
      this.save()
    },

    // ── Food ──────────────────────────────────────────────────────────────

    doFood(id) {
      if (this.reacting || this.sleeping) return
      if (this.isDisturbed) return 'disturbed'
      const f = FOODS.find(x => x.id === id)
      if (!f) return

      this.sat = clamp(this.sat + (f.sat || 0))
      this.hlt = clamp(this.hlt + (f.hlt || 0))

      if (f.healthFood) {
        // 好感三段：低 / 中 / 高
        const tier = this.aff >= 200 ? 2 : this.aff >= 100 ? 1 : 0
        this.moo = clamp(this.moo + f.mooTiers[tier])
        this.aff = clamp(this.aff + f.affTiers[tier], 0, 300)
        this.react(f.sp, f.msgTiers[tier], 2200)
      } else {
        this.moo = clamp(this.moo + (f.moo || 0))
        this.aff = clamp(this.aff + (f.aff || 0), 0, 300)
        this.react(f.sp, f.msgs, 2200)
      }
      this.save()
    },

    // ── Care ──────────────────────────────────────────────────────────────

    doCare(id) {
      if (this.reacting || this.sleeping) return
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

    // ── Game ──────────────────────────────────────────────────────────────

    openGame(id) {
      if (this.reacting || this.sleeping) return false
      if (this.isDisturbed) return 'disturbed'
      if (this.sat <= 0) {
        this.react('hungry', ['餓著你想讓我玩？', '先給我吃的。'], 2000)
        this.aff = clamp(this.aff - 5, 0, 300)
        return false
      }
      this.inGame      = true
      this.activeGameId = id
      return true
    },

    closeGame() {
      this.inGame       = false
      this.activeGameId = null
      this.idleUpdate()
    },

    endGame(sprite, msgs, dm, de, da) {
      // hlt < 15 時遊戲回復減半
      const mult = this.hlt < 15 ? 0.5 : 1
      this.moo = clamp(this.moo + Math.round(dm * mult))
      this.aff = clamp(this.aff + da, 0, 300)
      this.save()
      setTimeout(() => {
        this.closeGame()
        this.react(sprite, msgs, 2000)
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
      if (tier === 'good') {
        this.hlt = clamp(this.hlt + 15)
        this.moo = clamp(this.moo + 10)
        this.aff = clamp(this.aff + 12, 0, 300)
        this.react('praised', ['...沒問題。我就說了。', '全部正常。當然。', '...嗯。健康。'], 2200)
      } else if (tier === 'ok') {
        this.hlt = clamp(this.hlt + 20)
        this.moo = clamp(this.moo + 3)
        this.aff = clamp(this.aff + 8, 0, 300)
        this.react('energetic', ['...要注意一下。', '沒大問題。', '...聽到了。'], 2200)
      } else {
        this.hlt = clamp(this.hlt + 25)
        this.moo = clamp(this.moo - 5)
        this.aff = clamp(this.aff + 5, 0, 300)
        this.react('sad', ['...我知道了。', '...下次會注意。', '（沉默）'], 2200)
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
        this.react('sad', ['...好多了。', '昨天狀態很差。', '...算了。'], 2200)
        return
      }

      if (this.sick) return   // 已生病，不重複觸發

      // 根據健康值決定觸發機率
      const chance = this.hlt >= 50 ? 0.05 : this.hlt >= 30 ? 0.15 : 0.35
      if (Math.random() < chance) {
        this.sick      = true
        this.sickUntil = nowMs() + 24 * 60 * 60 * 1000
        this.setMsg('...頭有點重。別吵我。')
        this._sendNotif('sick', 'Toki 生病了 🤒', '他好像有點不舒服，去照顧他。', 1)
      }
    },

    // ── Sleep ──────────────────────────────────────────────────────────────

    doSleep(type) {
      if (this.reacting || this.sleeping) return
      this.sleeping   = type
      this.sleepStart = nowMs()
      this.sleepEnd   = nowMs() + (type === 'nap' ? NAP_MS : BED_MS)
      this._sleepNow  = nowMs()
      this.setSprite('sleeping')
      this.setMsg(type === 'nap' ? '...zz。叫我再叫。' : '...晚安。')
      this.save()
    },

    wakeUp(forced = false) {
      const type    = this.sleeping
      const sleptMs = nowMs() - this.sleepStart

      this.sleeping   = null
      this.sleepEnd   = null
      this.sleepStart = null

      if (forced && type === 'nap') {
        const frac = Math.min(sleptMs / NAP_MS, 1)
        this.moo = clamp(this.moo - 12)
        this.hlt = clamp(this.hlt + Math.round(8 * frac))
        this.react('disturbed', ['你幹嘛。我還沒睡夠。', '...煩。叫什麼叫。', '吵死了。'], 2200)
      } else if (type === 'nap') {
        this.moo = clamp(this.moo + 15)
        this.hlt = clamp(this.hlt + 8)
        this.react('energetic', ['...勉強起來了。', '嗯。好一點了。', '睡了才知道累。'], 2200)
      } else {
        const frac = Math.min(sleptMs / BED_MS, 1)
        this.moo = clamp(this.moo + Math.round(20 * frac))
        this.hlt = clamp(this.hlt + Math.round(15 * frac))
        this.sat = clamp(this.sat - 20)
        const hrs = sleptMs / 3600000
        if (frac >= 0.9) {
          this.react('energetic', ['...睡夠了。', '早。', '嗯。今天狀態不差。'], 2200)
          this._sendNotif('sleepend', 'Toki 睡醒了 ☀️', '他已經起來了，去打個招呼吧。')
        } else {
          const h  = Math.floor(hrs)
          const mn = Math.round((hrs - h) * 60)
          this.react('sleepy', [`才睡${h > 0 ? h + '小時' : ''}${mn > 0 ? mn + '分' : ''}。`, '...還困著。', '太早了。'], 2200)
        }
      }
      this.save()
    },

    tickSleep() {
      if (!this.sleeping) return
      this._sleepNow = nowMs()
      const rem = this.sleepRemaining
      this.setMsg(this.sleeping === 'nap'
        ? `...zz  剩 ${_fmtTime(rem)}`
        : `...zzz  剩 ${_fmtTime(rem)}`)
      if (rem <= 0) this.wakeUp(false)
    },

    // ── Notifications ─────────────────────────────────────────────────────

    checkNotifications() {
      if (this.sleeping) return
      if (this.sat <= 0)  this._sendNotif('sat_crit', 'Toki 餓壞了 🚨',     '「...我不餓。」（他在說謊）', 1)
      if (this.hlt <= 0)  this._sendNotif('hlt_crit', 'Toki 健康亮紅燈 🆘', '他的狀態非常糟糕。', 1)
      if (this.moo <= 0)  this._sendNotif('moo_crit', 'Toki 快爆發了 💢',   '「別管我。」他心情差到極點了。', 1)
      if (this.isSick)    this._sendNotif('sick',     'Toki 生病了 🤒',     '他有點不舒服，去照顧他。')
      if (this.sat > 0 && this.sat < 20) this._sendNotif('sat_warn', 'Toki 餓了 🍜',       '他已經快餓壞了，快去餵他！')
      if (this.hlt > 0 && this.hlt < 20) this._sendNotif('hlt_warn', 'Toki 健康警告 💊',   '他身體狀況不太好，要照顧他。')
      if (this.moo > 0 && this.moo < 20) this._sendNotif('moo_warn', 'Toki 心情很差 😤',   '他在生悶氣，去陪他說說話。')
    },

    scheduleBackgroundNotifications() {
      if (this.sleeping) {
        _tokiBridge({ action: 'cancelAll' })
        return
      }
      const nightMult = this.nightMode ? 2 : 1
      const DECAY = {
        sat: 1.0 / 64,
        moo: (0.6 / 64) * nightMult
      }
      const secsUntil = (val, threshold, decay) =>
        decay <= 0 ? null : Math.max(1, Math.round((val - threshold) / decay))

      const jobs = []
      if (this.sat > 20) jobs.push({ id: 'sat_warn', title: 'Toki 餓了 🍜',       body: '他快餓壞了，快去餵他！',              delay: secsUntil(this.sat, 20, DECAY.sat) })
      if (this.sat > 0)  jobs.push({ id: 'sat_crit', title: 'Toki 餓壞了 🚨',     body: '「...我不餓。」（他在說謊）',          delay: secsUntil(this.sat, 0,  DECAY.sat) })
      if (this.moo > 20) jobs.push({ id: 'moo_warn', title: 'Toki 心情很差 😤',   body: '他在生悶氣，去陪他說說話。',            delay: secsUntil(this.moo, 20, DECAY.moo) })
      if (this.moo > 0)  jobs.push({ id: 'moo_crit', title: 'Toki 快爆發了 💢',   body: '「別管我。」他心情差到極點了。',        delay: secsUntil(this.moo, 0,  DECAY.moo) })
      if (this.isSick)   jobs.push({ id: 'sick',     title: 'Toki 生病了 🤒',     body: '他有點不舒服，去照顧他。',              delay: 1 })

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
      _tokiBridge({ action: 'schedule', id, title, body, delay })
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
