<template>
  <div ref="displayRef" class="display">
    <div class="corner tl"></div><div class="corner tr"></div>
    <div class="corner bl"></div><div class="corner br"></div>

    <div ref="wrapRef" class="sprite-wrap">
      <img
        ref="imgRef"
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
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { usePetStore } from '../stores/pet'

const store    = usePetStore()
const bouncing = ref(false)
const displayRef = ref(null)
const wrapRef    = ref(null)
const imgRef     = ref(null)

// 允許的圖檔，避免錯字導致 404
const SPRITE_NAMES = new Set([
  'sleeping', 'hungry', 'happy', 'patted', 'energetic',
  'praised', 'disturbed', 'sleepy', 'sad', 'sick'
])

// 優先級：睡眠 > 生病（非反應中）> 一般 sprite
const spriteSrc = computed(() => {
  if (store.isSleeping) return `${import.meta.env.BASE_URL}images/sleeping.png`
  if (store.isSick && !store.reacting) return `${import.meta.env.BASE_URL}images/sick.png`
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
  logSpriteLayout('onLoad')
}

function onError(e) {
  // 圖片載入失敗時顯示佔位，方便 debug
  console.warn('Sprite not found:', e.target.src)
  e.target.style.opacity = '0.2'  // 讓圖片區域可見（灰色佔位）
}

function onSpriteClick() {
  store.recordClick()
  store.doAction('pat')
}

function logSpriteLayout(source) {
  if (!import.meta.env.DEV) return
  const display = displayRef.value
  const wrap = wrapRef.value
  const img = imgRef.value
  if (!display || !wrap || !img) return
  const ds = getComputedStyle(display)
  const ws = getComputedStyle(wrap)
  const is = getComputedStyle(img)
  const dRect = display.getBoundingClientRect()
  const wRect = wrap.getBoundingClientRect()
  const iRect = img.getBoundingClientRect()
  console.debug('[sprite-layout]', source, {
    display: { w: dRect.width, h: dRect.height, overflow: ds.overflow },
    wrap: { w: wRect.width, h: wRect.height, overflow: ws.overflow },
    img: {
      w: iRect.width,
      h: iRect.height,
      display: is.display,
      visibility: is.visibility,
      opacity: is.opacity,
      position: is.position,
      objectFit: is.objectFit,
      maxHeight: is.maxHeight,
      maxWidth: is.maxWidth
    }
  })
}

onMounted(async () => {
  await nextTick()
  logSpriteLayout('mounted')
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
})

function onResize() {
  logSpriteLayout('resize')
}
</script>