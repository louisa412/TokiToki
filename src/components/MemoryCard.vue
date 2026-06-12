<template>
  <div class="mc" :class="`mc--${styleClass}`">
    <div class="mc-label">TokiToki Memory</div>

    <div class="mc-sprite-wrap">
      <img
        v-if="!spriteFailed"
        class="mc-sprite"
        :src="spriteSrc"
        :alt="characterName"
        @error="onSpriteError"
      />
      <div v-else class="mc-sprite-fallback">♡</div>
    </div>

    <div class="mc-title">{{ title }}</div>
    <div class="mc-meta">Day {{ day }} · {{ characterName }}</div>

    <div class="mc-text">{{ text }}</div>

    <div class="mc-date">{{ dateStr }}</div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { getCharacterName } from '../data/characters'

const props = defineProps({
  characterId: { type: String, required: true },
  memoryId:    { type: String, default: '' },
  title:       { type: String, default: '相遇記憶' },
  text:        { type: String, default: '你們留下了一段小小的日常記憶。' },
  day:         { type: Number, default: 1 },
  acquiredAt:  { type: Number, default: null },
  cardStyle:   { type: String, default: 'soft' },
  spriteMood:  { type: String, default: 'happy' }
})

const base = import.meta.env.BASE_URL

const CARD_STYLES = ['soft', 'dark', 'warm', 'night', 'farewell', 'special']
const styleClass = computed(() =>
  CARD_STYLES.includes(props.cardStyle) ? props.cardStyle : 'soft')

const characterName = computed(() => getCharacterName(props.characterId))

// sprite fallback 鏈：{spriteMood}.png → happy.png → ♡ 佔位
const triedHappy   = ref(false)
const spriteFailed = ref(false)
const spriteSrc = computed(() => {
  const mood = triedHappy.value ? 'happy' : (props.spriteMood || 'happy')
  return `${base}images/${props.characterId}/${mood}.png`
})

function onSpriteError() {
  if (!triedHappy.value && props.spriteMood !== 'happy') {
    triedHappy.value = true
  } else {
    spriteFailed.value = true
  }
}

// 換卡片時重置 fallback 狀態
watch(() => [props.characterId, props.spriteMood], () => {
  triedHappy.value = false
  spriteFailed.value = false
})

const dateStr = computed(() => {
  if (!props.acquiredAt) return ''
  const d = new Date(props.acquiredAt)
  if (isNaN(d.getTime())) return ''
  const p = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())}`
})
</script>

<style scoped>
.mc {
  --mc-bg: var(--s2);
  --mc-bd: var(--bd);
  --mc-accent: var(--gold);
  --mc-txt: var(--txt);
  --mc-dim: var(--dim);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: min(78vw, 240px);
  padding: 14px 14px 12px;
  background: var(--mc-bg);
  border: 1px solid var(--mc-bd);
  border-radius: 4px;
  color: var(--mc-txt);
  text-align: center;
  flex-shrink: 0;
}

.mc-label {
  font-family: 'Press Start 2P', monospace;
  font-size: 7px;
  letter-spacing: 1px;
  color: var(--mc-accent);
  border: 1px solid var(--mc-bd);
  border-radius: 2px;
  padding: 4px 8px;
  margin-bottom: 10px;
}

.mc-sprite-wrap {
  width: 84px;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}
.mc-sprite {
  max-width: 100%;
  max-height: 100%;
  image-rendering: pixelated;
}
.mc-sprite-fallback {
  font-size: 34px;
  color: var(--mc-accent);
  opacity: .7;
}

.mc-title {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 4px;
}
.mc-meta {
  font-size: 11px;
  color: var(--mc-accent);
  margin-bottom: 10px;
}
.mc-text {
  font-size: 12px;
  line-height: 1.7;
  color: var(--mc-txt);
  opacity: .92;
  padding: 0 2px;
  margin-bottom: 12px;
  white-space: pre-line;
}
.mc-date {
  font-family: 'Press Start 2P', monospace;
  font-size: 7px;
  color: var(--mc-dim);
  letter-spacing: 1px;
}

/* ── cardStyle 模板 ──────────────────────────────────────────────────── */

/* soft：柔和日常（照護、睡眠、Satomi） */
.mc--soft {
  --mc-bg: #1d1c26;
  --mc-bd: #3a3850;
  --mc-accent: #b8a8e0;
}

/* dark：黑色冷感（Kyouji、反差事件） */
.mc--dark {
  --mc-bg: #101014;
  --mc-bd: #2a2a3a;
  --mc-accent: #e84040;
  --mc-txt: #c8c4d4;
}

/* warm：溫柔暖色（照護、康復、Ichiro） */
.mc--warm {
  --mc-bg: #221a16;
  --mc-bd: #4a3a2c;
  --mc-accent: #f0a060;
}

/* night：深夜 */
.mc--night {
  --mc-bg: #10142a;
  --mc-bd: #2a3258;
  --mc-accent: #4096e8;
}
.mc--night .mc-label::after { content: ' 🌙'; }

/* farewell：離別 */
.mc--farewell {
  --mc-bg: #1a1420;
  --mc-bd: #443050;
  --mc-accent: #c890e8;
}
.mc--farewell::after {
  content: '';
  position: absolute;
  inset: 3px;
  border: 1px dashed var(--mc-bd);
  border-radius: 3px;
  pointer-events: none;
}

/* special：高好感特殊卡 */
.mc--special {
  --mc-bg: #221d12;
  --mc-bd: #5a4a26;
  --mc-accent: var(--gold);
  box-shadow: 0 0 14px rgba(245, 185, 66, .18);
}
.mc--special .mc-label::after { content: ' ★'; }
</style>
