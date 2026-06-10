// systems/walkSystem.js
// TokiToki 散步系統 v1.0
// 負責：加權隨機抽選、記憶讀寫、偏好判斷、事件觸發、拒絕流程
// ─────────────────────────────────────────────────────────────────

import { LOCATIONS, WALK_EVENTS, CITY_META } from '../data/cities/yokohama.js'

// ═══════════════════════════════════════════════
// 常數
// ═══════════════════════════════════════════════

const DISPLEASURE_MAX        = 3
const COOLDOWN_HOURS         = 36
const RECENCY_PENALTY        = { h24: 0.1, h72: 0.4, h168: 0.7 }
const PETITION_BASE_CHANCE   = 0.3   // 30%
const PETITION_AFF_BONUS     = 0.001 // 每1點好感 +0.1%，上限 +30%
const PETITION_MAX_BONUS     = 0.30
const DISPLEASURE_RESET_TO   = 1     // 36h冷卻後降至此值（不歸零，留有陰影）

// ═══════════════════════════════════════════════
// 記憶存檔結構
//
// store.locationMemory = {
//   [locationId]: {
//     visitCount:   number,
//     displeasure:  number,        // 只用於 disliked 地點
//     lastVisited:  timestamp | null,
//     refusedUntil: timestamp | null,
//   }
// }
// ═══════════════════════════════════════════════

/** 取得或初始化單一地點的記憶 */
function getMemory(store, locationId) {
  if (!store.locationMemory) store.locationMemory = {}
  if (!store.locationMemory[locationId]) {
    store.locationMemory[locationId] = {
      visitCount:   0,
      displeasure:  0,
      lastVisited:  null,
      refusedUntil: null,
    }
  }
  return store.locationMemory[locationId]
}

// ═══════════════════════════════════════════════
// 加權隨機抽選
// ═══════════════════════════════════════════════

/**
 * 計算單一地點的當下抽選權重
 * 考量：tier、preference、最近訪問懲罰、拒絕狀態
 */
function calcWeight(location, memory, now) {
  // 已被拒絕且冷卻未結束 → 完全排除
  if (memory.refusedUntil && now < memory.refusedUntil) return 0

  let w = location.baseWeight

  // 好感加成
  if (location.preference === 'loved')    w += 10
  if (location.preference === 'disliked') w -= 15

  // 最近訪問懲罰
  if (memory.lastVisited) {
    const hours = (now - memory.lastVisited) / 3_600_000
    if      (hours < 24)  w *= RECENCY_PENALTY.h24
    else if (hours < 72)  w *= RECENCY_PENALTY.h72
    else if (hours < 168) w *= RECENCY_PENALTY.h168
  }

  return Math.max(w, 0)
}

/**
 * 從 30 個地點中加權隨機抽出 poolSize 個（不重複）
 * @param {Object} store - Pinia store state
 * @returns {Array} 抽中的地點物件陣列
 */
export function pickWalkPool(store) {
  const now  = Date.now()
  const pool = CITY_META.poolSize

  // 先冷卻：36h 到的 disliked 地點自動降 displeasure
  LOCATIONS.forEach(loc => {
    if (loc.preference !== 'disliked') return
    const mem = getMemory(store, loc.id)
    if (mem.refusedUntil && now >= mem.refusedUntil) {
      mem.displeasure  = DISPLEASURE_RESET_TO
      mem.refusedUntil = null
    }
  })

  // 計算所有地點的權重
  const weighted = LOCATIONS.map(loc => ({
    loc,
    weight: calcWeight(loc, getMemory(store, loc.id), now),
  })).filter(item => item.weight > 0)

  // Weighted sampling without replacement
  const result = []
  const bucket = [...weighted]

  for (let i = 0; i < pool && bucket.length > 0; i++) {
    const total = bucket.reduce((sum, b) => sum + b.weight, 0)
    let r = Math.random() * total
    for (let j = 0; j < bucket.length; j++) {
      r -= bucket[j].weight
      if (r <= 0) {
        result.push(bucket[j].loc)
        bucket.splice(j, 1)
        break
      }
    }
  }

  return result
}

// ═══════════════════════════════════════════════
// 散步執行
// ═══════════════════════════════════════════════

/**
 * 玩家選擇地點後執行散步
 * @returns {Object} { dialogue, event, rewards, refused }
 */
export function executeWalk(store, locationId, affection, isNight) {
  const location = LOCATIONS.find(l => l.id === locationId)
  if (!location) return null

  const mem = getMemory(store, location.id)
  const now = Date.now()

  // ── disliked 地點：先確認是否在拒絕狀態 ──
  if (location.preference === 'disliked') {
    if (mem.refusedUntil && now < mem.refusedUntil) {
      return { refused: true, locationId }
    }
  }

  // ── 更新記憶 ──
  mem.visitCount++
  mem.lastVisited = now

  // ── disliked：先選台詞（用當前值），再累積 displeasure ──
  const dialogue = pickDialogue(location, mem, affection, isNight)

  if (location.preference === 'disliked') {
    if (mem.displeasure < DISPLEASURE_MAX) mem.displeasure++
    if (mem.displeasure >= DISPLEASURE_MAX) {
      mem.refusedUntil = now + COOLDOWN_HOURS * 3_600_000
    }
  }

  // ── 觸發事件 ──
  const event = rollWalkEvent(location, isNight)

  // ── 計算獎勵 ──
  const rewards = calcRewards(location, mem, event, affection)

  return { dialogue, event, rewards, refused: false, locationId }
}

// ═══════════════════════════════════════════════
// 台詞選取
// ═══════════════════════════════════════════════

function pickDialogue(location, memory, affection, isNight) {
  const { visitCount, displeasure } = memory

  // disliked 地點：用 displeasure 分層
  if (location.preference === 'disliked') {
    const prog = location.dislikedProgression
    // 取 displeasure 前的最後一條（顯示即將升格前的台詞）
    const entry = prog[Math.min(displeasure, prog.length - 1)]
    return entry.isRefusal ? null : entry.text
  }

  // 一般 / loved 地點：找符合 visitCount 的最高層台詞
  const tiers = [...location.dialogues.visit].sort((a, b) => b.minVisits - a.minVisits)
  const tier  = tiers.find(t => visitCount >= t.minVisits) || tiers[tiers.length - 1]

  const pool = isNight ? tier.night : tier.day

  // 高好感 + loved：有機率觸發特殊台詞
  const loveLines = location.dialogues?.loved?.highAff
  if (loveLines && affection >= 200 && Math.random() < 0.4) {
    return loveLines[Math.floor(Math.random() * loveLines.length)]
  }

  return pool[Math.floor(Math.random() * pool.length)]
}

// ═══════════════════════════════════════════════
// 事件觸發
// ═══════════════════════════════════════════════

function rollWalkEvent(location, isNight) {
  // 30% 機率觸發事件
  if (Math.random() > 0.30) return null

  const eligible = WALK_EVENTS.filter(e => {
    if (e.nightOnly && !isNight) return false
    if (e.categories && !e.categories.includes(location.category)) return false
    return true
  })

  if (eligible.length === 0) return null

  const total = eligible.reduce((s, e) => s + e.weight, 0)
  let r = Math.random() * total
  for (const e of eligible) {
    r -= e.weight
    if (r <= 0) return e
  }
  return eligible[eligible.length - 1]
}

// ═══════════════════════════════════════════════
// 獎勵計算
// ═══════════════════════════════════════════════

function calcRewards(location, memory, event, affection) {
  const base = { ...location.rewards }

  // 連續多次拜訪同一地點：輕微衰減（鼓勵探索）
  if (memory.visitCount > 5) {
    base.mood     = Math.floor(base.mood     * 0.85)
    base.affection = Math.floor(base.affection * 0.85)
  }

  // loved 地點高好感加成
  if (location.preference === 'loved' && affection >= 120) {
    base.mood      += 4
    base.affection += 3
  }

  // 事件加成
  if (event?.effect) {
    base.mood      = (base.mood      || 0) + (event.effect.mood      || 0)
    base.affection = (base.affection || 0) + (event.effect.affection || 0)
  }

  return base
}

// ═══════════════════════════════════════════════
// 求他去（petition）── disliked 拒絕後使用
// ═══════════════════════════════════════════════

/**
 * 玩家「求他去」被拒絕的地點
 * @returns {Object} { success: boolean, dialogue: string }
 */
export function petitionWalk(store, locationId, affection) {
  const location = LOCATIONS.find(l => l.id === locationId)
  if (!location || location.preference !== 'disliked') return null

  const mem = getMemory(store, location.id)

  // 成功機率：30% base + 好感加成（最高 +30%）
  const bonus   = Math.min(affection * PETITION_AFF_BONUS, PETITION_MAX_BONUS)
  const chance  = PETITION_BASE_CHANCE + bonus
  const success = Math.random() < chance

  const lines    = success ? location.petition.success : location.petition.fail
  const dialogue = lines[Math.floor(Math.random() * lines.length)]

  if (success) {
    // 答應了：解除拒絕，但 displeasure 保留（陰影留著）
    mem.refusedUntil = null
    // 直接執行散步（不再次累積 displeasure，這次是特例）
    const walkResult = executeWalk(store, locationId, affection, isNightTime())
    return { success: true, dialogue, walkResult }
  }

  // 拒絕了：好感微降
  return { success: false, dialogue, affectionPenalty: -3 }
}

// ═══════════════════════════════════════════════
// 查詢 helpers
// ═══════════════════════════════════════════════

/** 取得玩家曾造訪過的地點（含次數）*/
export function getVisitedLocations(store) {
  if (!store.locationMemory) return []
  return LOCATIONS
    .map(loc => ({ ...loc, memory: store.locationMemory[loc.id] }))
    .filter(loc => loc.memory?.visitCount > 0)
    .sort((a, b) => (b.memory?.visitCount || 0) - (a.memory?.visitCount || 0))
}

/** 某地點是否目前處於拒絕狀態 */
export function isLocationRefused(store, locationId) {
  const mem = getMemory(store, locationId)
  return !!(mem.refusedUntil && Date.now() < mem.refusedUntil)
}

/** 取得拒絕地點的冷卻剩餘時間（毫秒）*/
export function getRefuseCooldownMs(store, locationId) {
  const mem = getMemory(store, locationId)
  if (!mem.refusedUntil) return 0
  return Math.max(0, mem.refusedUntil - Date.now())
}

/** 判斷現在是否為深夜模式 */
export function isNightTime() {
  const h = new Date().getHours()
  return h >= 22 || h < 6
}

// ═══════════════════════════════════════════════
// 存檔遷移（新增 locationMemory 欄位）
// ═══════════════════════════════════════════════

export function migrateWalkData(saveData) {
  if (!saveData.locationMemory) {
    saveData.locationMemory = {}
  }
  return saveData
}
