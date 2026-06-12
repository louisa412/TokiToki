// ── Memory system ────────────────────────────────────────────────────────────
// 處理相遇記憶的解鎖、防重複與顯示資料組合。
// 記憶定義在 src/data/memories.js；玩家實際取得的 records 存在
// charactersState[characterId].memories，隨既有 save() 一起寫入 localStorage。

import { MEMORY_DEFINITIONS } from '../data/memories'
import { getCharacterName } from '../data/characters'

const DAY_MS = 24 * 3600 * 1000

const FALLBACK_DEFINITION = {
  id: 'unknown',
  type: 'unknown',
  title: '相遇記憶',
  rarity: 'common',
  cardStyle: 'soft',
  spriteMood: 'happy',
  textTemplates: {},
  fallbackText: '你們留下了一段小小的日常記憶。'
}

// 舊存檔的角色 state 可能沒有 memories / milestones，load 時補上預設值
export function ensureMemoryFields(characterState) {
  if (!characterState) return
  if (!Array.isArray(characterState.memories)) characterState.memories = []
  if (!characterState.milestones || typeof characterState.milestones !== 'object') {
    characterState.milestones = {}
  }
}

export function hasMemory(characterState, memoryId) {
  return !!characterState?.memories?.some(m => m && m.id === memoryId)
}

export function getMemoryDefinition(memoryId) {
  return MEMORY_DEFINITIONS[memoryId] || { ...FALLBACK_DEFINITION, id: memoryId }
}

// 為主角色（或 options.characterId 指定的角色）解鎖一個 memory。
// 已解鎖或找不到定義時回傳 null，不重複新增。
// 注意：訪客系統（activeVisitor）不會經過這裡，MVP 只處理主角色 memories。
export function unlockMemory(store, memoryId, options = {}) {
  if (!store || !MEMORY_DEFINITIONS[memoryId]) return null
  const characterId = options.characterId || store.selectedCharacter
  if (!characterId) return null

  const cs = store.charactersState?.[characterId]
  if (!cs) return null
  ensureMemoryFields(cs)
  if (hasMemory(cs, memoryId)) return null

  // 目前主角色的即時數值在 store 的 flat fields 上（save 時才 flush 回
  // charactersState），其他角色直接讀各自的 state
  const isCurrent = characterId === store.selectedCharacter
  const src = isCurrent ? store : cs
  const adoptedAt = (isCurrent ? store.adoptedAt : cs.adoptedAt) || Date.now()

  const record = {
    id: memoryId,
    characterId,
    acquiredAt: Date.now(),
    day: Math.max(1, Math.floor((Date.now() - adoptedAt) / DAY_MS) + 1),
    snapshot: {
      aff: Math.round(src.aff ?? 0),
      sat: Math.round(src.sat ?? 0),
      hlt: Math.round(src.hlt ?? 0),
      moo: Math.round(src.moo ?? 0),
      sta: Math.round(src.sta ?? 0)
    }
  }
  cs.memories.push(record)
  if (typeof store.save === 'function') store.save()
  return record
}

// 組合一張記憶卡需要的顯示資料。文案 fallback 順序：
// 角色專屬 textTemplates → fallbackText → 通用安全文字。
export function getMemoryDisplay(memoryRecord, characterId) {
  const id = memoryRecord?.id ?? 'unknown'
  const cid = characterId || memoryRecord?.characterId || ''
  const def = getMemoryDefinition(id)
  const text = def.textTemplates?.[cid]
    || def.fallbackText
    || FALLBACK_DEFINITION.fallbackText
  return {
    id,
    characterId: cid,
    characterName: getCharacterName(cid),
    title: def.title || FALLBACK_DEFINITION.title,
    text,
    cardStyle: def.cardStyleOverrides?.[cid] || def.cardStyle || 'soft',
    spriteMood: def.spriteMood || 'happy',
    day: memoryRecord?.day ?? 1,
    acquiredAt: memoryRecord?.acquiredAt ?? null,
    snapshot: memoryRecord?.snapshot ?? null
  }
}

// 取得某角色全部 memories 的顯示資料（依取得時間排序）
export function getMemoryDisplayList(characterState, characterId) {
  if (!characterState?.memories) return []
  return characterState.memories
    .slice()
    .sort((a, b) => (a?.acquiredAt ?? 0) - (b?.acquiredAt ?? 0))
    .map(rec => getMemoryDisplay(rec, characterId))
}
