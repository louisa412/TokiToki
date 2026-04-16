<template>
  <div class="display">
    <div class="corner tl"></div><div class="corner tr"></div>
    <div class="corner bl"></div><div class="corner br"></div>

    <div class="sprite-wrap">
      <img
        class="sprite vis"
        :class="{ bk: bouncing }"
        :src="spriteSrc"
        alt="Toki"
        @load="onLoad"
        @error="onError"
        @click="onSpriteClick"
      />
      <!-- Night overlay -->
      <div class="night-ov" :class="{ on: store.nightMode }"></div>
      <!-- ZZZ -->
      <div class="zzz" :class="{ on: store.isSleeping }">z<br>z<br>z</div>
    </div>

    <div class="status-box">
      <span style="margin-left:10px">{{ store.lastMsg }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { usePetStore } from '../stores/pet'

const store    = usePetStore()
const bouncing = ref(false)

// 允許的圖檔，避免錯字導致 404
const SPRITE_NAMES = new Set([
  'sleeping', 'hungry', 'happy', 'patted', 'energetic',
  'praised', 'disturbed', 'sleepy', 'sad'
])

// Vite：public 資源需加上 BASE_URL，避免部署在子路徑時 /images 404
const spriteSrc = computed(() => {
  const name = SPRITE_NAMES.has(store.currentSprite) ? store.currentSprite : 'energetic'
  return `${import.meta.env.BASE_URL}images/${name}.png`
})

// Bounce on sprite change
watch(() => store.currentSprite, (next, prev) => {
  if (next === prev) return
  bouncing.value = false
  setTimeout(() => {
    bouncing.value = true
    setTimeout(() => { bouncing.value = false }, 280)
  }, 10)
})

function onLoad(e) {
  e.target.style.opacity = '1'
}

function onError(e) {
  // 找不到圖就靜默失敗，不影響 UI
  console.warn('Sprite not found:', e.target.src)
}

function onSpriteClick() {
  store.recordClick()
  store.doAction('pat')
}
</script>