<template>
  <div class="bgm-control">
    <audio
      ref="audioRef"
      :src="bgmSrc"
      preload="auto"
      loop
      playsinline
      @canplay="audioReady = true"
      @error="audioReady = false"
    ></audio>
    <button
      class="bgm-btn"
      :class="{ on: enabled, missing: !audioReady }"
      :title="buttonTitle"
      @click="toggleMusic"
    >
      {{ enabled ? '♪' : '♪×' }}
    </button>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const STORAGE_KEY = 'tokitoki_bgm_enabled'
const bgmSrc = `${import.meta.env.BASE_URL}audio/bgm.m4a`

const audioRef = ref(null)
const enabled = ref(localStorage.getItem(STORAGE_KEY) !== 'off')
const audioReady = ref(true)

const buttonTitle = computed(() => {
  if (!audioReady.value) return '請放入 public/audio/bgm.m4a'
  return enabled.value ? '關閉背景音樂' : '開啟背景音樂'
})

async function playMusic() {
  const audio = audioRef.value
  if (!audio || !enabled.value) return
  audio.volume = 0.42
  try {
    await audio.play()
  } catch (_) {
    // 瀏覽器需要使用者互動時，下一次點擊會再嘗試播放。
  }
}

function stopMusic() {
  audioRef.value?.pause()
}

function toggleMusic() {
  enabled.value = !enabled.value
  localStorage.setItem(STORAGE_KEY, enabled.value ? 'on' : 'off')
  if (enabled.value) playMusic()
  else stopMusic()
}

function unlockAudio() {
  playMusic()
}

onMounted(() => {
  window.addEventListener('pointerdown', unlockAudio, { passive: true })
  window.addEventListener('keydown', unlockAudio)
  playMusic()
})

onBeforeUnmount(() => {
  window.removeEventListener('pointerdown', unlockAudio)
  window.removeEventListener('keydown', unlockAudio)
})
</script>
