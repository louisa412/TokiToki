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

// 睡覺中用 sleeping.png，其他用對應名稱
const spriteSrc = computed(() => {
  const name = store.currentSprite
  return `/images/${name}.png`
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
