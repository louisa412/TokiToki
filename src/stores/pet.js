import { defineStore } from 'pinia'

// ── Constants ──────────────────────────────────────────────────────────────

export const FOODS = [
  { id: 'coffee',  ico: '☕', name: '黑咖啡',       sat: 5,  moo: 10, aff: 5,  eng: 0,  sp: 'praised',   msgs: ['嗯。這個可以。', '...勉強合格。', '黑的才對。'] },
  { id: 'ramen',   ico: '🍜', name: '家系拉麵',      sat: 40, moo: 15, aff: 10, eng: 0,  sp: 'happy',     msgs: ['...不錯。', '哼，還行。', '就這個。'] },
  { id: 'bento',   ico: '🍱', name: '燒肉便當',      sat: 35, moo: 10, aff: 8,  eng: 5,  sp: 'energetic', msgs: ['蛋白質。補充完畢。', '...吃完繼續。', '好。'] },
  { id: 'mapo',    ico: '🌶', name: '激辛麻婆豆腐',  sat: 20, moo: 20, aff: 15, eng: 0,  sp: 'happy',     msgs: ['...辣得剛好。', '汗出來了。還行。', '這才叫吃飯。'] },
  { id: 'porridge',ico: '🍓', name: '草莓粥 ★',      sat: 50, moo: -20,aff: 30, eng: 0,  sp: 'sad',       msgs: ['......你做的？', '...甜的。', '...為什麼是草莓。算了。'] },
  { id: 'cig',     ico: '🚬', name: '巧克力香菸',    sat: 0,  moo: 25, aff: 5,  eng: 0,  sp: 'praised',   msgs: ['...這種例外。', '不是我喜歡甜的。', '...好抽。'] },
  { id: 'shumai',  ico: '🥟', name: '橫濱燒賣',      sat: 15, moo: 10, aff: 5,  eng: 0,  sp: 'energetic', msgs: ['橫濱的味道。', '...合格。', '還不錯。'] },
  { id: 'energy',  ico: '⚡', name: '能量飲',         sat: 5,  moo: 5,  aff: 0,  eng: 30, sp: 'energetic', msgs: ['準備好了。', '...體力回來了。', '來吧。'] }
]

export const GAMES = [
  { id: 'rps',    ico: '✊', name: '猜拳對決' },
  { id: 'stare',  ico: '👁', name: '瞪眼大賽' },
  { id: 'rap',    ico: '🎤', name: '饒舌接龍' },
  { id: 'coin',   ico: '🪙', name: '猜猜硬幣' },
  { id: 'shoot',  ico: '🎯', name: '標靶射擊' },
  { id: 'polish', ico: '🎙', name: '擦麥克風' },
  { id: 'walk',   ico: '🗺', name: '橫濱散步' },
  { id: 'listen', ico: '💬', name: '聽他抱怨' }
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
    '我不想等太久。',
    '再晚一點我可能會更不爽。',
    '快點。',
    '你想讓我餓死嗎。'
  ],
  sleepy: [
    '我有點累。不是因為你。只是剛好。',
    '現在聲音有點遠。',
    '安靜一點。',
    '我可能會睡著。',
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
  ]
}

// 深夜專屬台詞（nightMode 時 idleUpdate 會混入）
const NIGHT_MSGS = [
  '這時間你還醒著。也太誇張。',
  '我也是。所以才在這。',
  '現在比較安靜。你不要突然走。',
  '深夜的橫濱很安靜。你不一樣。',
  '這個時間點，有點特別。'
]

// ── Helpers ────────────────────────────────────────────────────────────────

const clamp   = (v, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, v))
const rnd     = arr => arr[Math.floor(Math.random() * arr.length)]
const nowMs   = () => Date.now()

// ── Store ──────────────────────────────────────────────────────────────────

export const usePetStore = defineStore('pet', {
  state: () => ({
    // Core stats
    sat: 75,
    eng: 70,
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
    sleeping: null,    // null | 'nap' | 'bed'
    sleepEnd: null,
    sleepStart: null,

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
    isDisturbed: (state) => nowMs() < state.disturbedUntil,
    isSleeping:  (state) => !!state.sleeping,
    sleepRemaining: (state) => state.sleepEnd ? Math.max(0, state.sleepEnd - nowMs()) : 0
  },

  actions: {
    // ── Persistence ──────────────────────────────────────────────────────

    save() {
      try {
        localStorage.setItem('toki_v4', JSON.stringify({
          sat: this.sat, eng: this.eng, moo: this.moo, aff: this.aff,
          sleeping: this.sleeping, sleepEnd: this.sleepEnd, sleepStart: this.sleepStart,
          savedAt: nowMs()
        }))
      } catch (_) {}
    },

    load() {
      try {
        const raw = localStorage.getItem('toki_v4')
        if (!raw) return false
        const d = JSON.parse(raw)
        const elapsed = (nowMs() - d.savedAt) / 1000
        const t = Math.min(elapsed, 21600)

        this.sat = clamp(d.sat - t * (1.0 / 64))
        this.eng = clamp(d.eng - t * (1.2 / 64))
        this.moo = clamp(d.moo - t * (0.6 / 64))
        this.aff = clamp(d.aff, 0, 300)

        // Restore sleep
        if (d.sleeping && d.sleepEnd) {
          this.sleeping   = d.sleeping
          this.sleepEnd   = d.sleepEnd
          this.sleepStart = d.sleepStart || d.savedAt
          if (nowMs() >= d.sleepEnd) {
            // finished while away — schedule wakeup
            setTimeout(() => this.wakeUp(false), 500)
          }
          return true
        }

        // Away toast (handled by App.vue)
        return { elapsed }
      } catch (_) {
        return false
      }
    },

    // ── Decay (called every 8s) ───────────────────────────────────────────

    tick() {
      if (this.sleeping) {
        this.sat = clamp(this.sat - 0.3 / 8)
        this._updateNightMode()
        return
      }
      const r = this.nightMode ? 2 : 1
      this.sat = clamp(this.sat - 1.0 / 8)
      this.eng = clamp(this.eng - (1.2 / 8) * r)
      this.moo = clamp(this.moo - 0.6 / 8)
      this._updateNightMode()
      if (!this.reacting && !this.inGame) this.idleUpdate()
      this.checkNotifications()
    },

    _updateNightMode() {
      const h = new Date().getHours()
      this.nightMode = h >= 22 || h < 6
    },

    // ── Sprite & message ─────────────────────────────────────────────────

    setSprite(name) {
      this.currentSprite = name
    },

    setMsg(text) {
      this.lastMsg = text
    },

    idleUpdate() {
      if (this.reacting || this.inGame || this.sleeping) return
      const sp = this._getIdleSprite()
      this.setSprite(sp)
      // 深夜有機率出現專屬台詞
      if (this.nightMode && Math.random() < 0.4) {
        this.setMsg(rnd(NIGHT_MSGS))
      } else {
        this.setMsg(rnd(IDLE_MSGS[sp]))
      }
    },

    _getIdleSprite() {
      if (this.sat < 25) return 'hungry'
      if (this.eng < 25) return 'sleepy'
      if (this.moo < 25) return 'sad'
      return 'energetic'
    },

    // ── React (blocks UI for dur ms) ─────────────────────────────────────

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
        this.rapidClicks = []
        this.react('disturbed', ['煩死了。', '你有完沒完。', '再點我打你。'], 2000)
        return true // was triggered
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
      }
      this.save()
    },

    doFood(id) {
      if (this.reacting || this.sleeping) return
      if (this.isDisturbed) return 'disturbed'
      const f = FOODS.find(x => x.id === id)
      if (!f) return
      this.sat = clamp(this.sat + f.sat)
      this.moo = clamp(this.moo + f.moo)
      this.eng = clamp(this.eng + f.eng)
      this.aff = clamp(this.aff + f.aff, 0, 300)
      this.react(f.sp, f.msgs, 2200)
      this.save()
    },

    openGame(id) {
      if (this.reacting || this.sleeping) return false
      if (this.isDisturbed) return 'disturbed'
      if (this.sat <= 0) {
        this.react('hungry', ['餓著你想讓我玩？', '先給我吃的。'], 2000)
        this.aff = clamp(this.aff - 5, 0, 300)
        return false
      }
      this.inGame = true
      this.activeGameId = id
      return true
    },

    closeGame() {
      this.inGame = false
      this.activeGameId = null
      this.idleUpdate()
    },

    endGame(sprite, msgs, dm, de, da) {
      this.moo = clamp(this.moo + dm)
      this.eng = clamp(this.eng + de)
      this.aff = clamp(this.aff + da, 0, 300)
      this.save()
      // Close modal after short delay, then react
      setTimeout(() => {
        this.closeGame()
        this.react(sprite, msgs, 2000)
      }, 1100)
    },

    // ── Sleep ──────────────────────────────────────────────────────────────

    doSleep(type) {
      if (this.reacting || this.sleeping) return
      this.sleeping   = type
      this.sleepStart = nowMs()
      this.sleepEnd   = nowMs() + (type === 'nap' ? NAP_MS : BED_MS)
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
        this.eng = clamp(this.eng + 35 * frac)
        this.moo = clamp(this.moo - 12)
        this.react('disturbed', ['你幹嘛。我還沒睡夠。', '...煩。叫什麼叫。', '吵死了。'], 2200)
      } else if (type === 'nap') {
        this.eng = clamp(this.eng + 35)
        this.moo = clamp(this.moo + 5)
        this.react('energetic', ['...勉強起來了。', '嗯。好一點了。', '睡了才知道累。'], 2200)
      } else {
        const frac = Math.min(sleptMs / BED_MS, 1)
        this.eng = clamp(this.eng + 100 * frac)
        this.moo = clamp(this.moo + 8)
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
      this.setSprite('sleepy')
      const rem = this.sleepRemaining
      this.setMsg(this.sleeping === 'nap'
        ? `...zz  剩 ${_fmtTime(rem)}`
        : `...zzz  剩 ${_fmtTime(rem)}`)
      if (rem <= 0) this.wakeUp(false)
    },

    // ── Notifications (JS→Swift bridge) ───────────────────────────────────

    checkNotifications() {
      if (this.sleeping) return
      if (this.sat < 20) this._sendNotif('hungry', 'Toki 餓了 🍜', '他已經快餓壞了，快去餵他！')
      if (this.eng < 20) this._sendNotif('tired',  'Toki 很累 😴', '他快撐不住了，讓他休息一下。')
      if (this.moo < 20) this._sendNotif('mood',   'Toki 心情很差 😤', '他在生悶氣，去陪他說說話。')
    },

    _sendNotif(id, title, body, delay = 1) {
      const bucket = Math.floor(nowMs() / 600000)
      if (this._notifSent[id] === bucket) return
      this._notifSent[id] = bucket
      _tokiBridge({ action: 'schedule', id, title, body, delay })
    }
  }
})

// ── Utilities (module-level, shared) ──────────────────────────────────────

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
