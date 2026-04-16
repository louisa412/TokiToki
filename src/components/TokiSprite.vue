<template>
  <div class="display">
    <div class="corner tl"></div><div class="corner tr"></div>
    <div class="corner bl"></div><div class="corner br"></div>

    <div class="sprite-wrap">
      <img
        class="sprite"
        :class="{ vis: loaded, bk: bouncing }"
        :src="spriteSrc"
        alt="Toki"
        @load="onLoad"
        @click="onSpriteClick"
      />
      <!-- Night overlay -->
      <div class="night-ov" :class="{ on: store.nightMode }"></div>
      <!-- ZZZ -->
      <div class="zzz" :class="{ on: store.isSleeping }">z<br>z<br>z</div>
    </div>

    <div class="status-box">
      <span id="msgText" style="margin-left:10px">{{ store.lastMsg }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { usePetStore } from '../stores/pet'

const store = usePetStore()

const loaded   = ref(false)
const bouncing = ref(false)
const prevSprite = ref(store.currentSprite)

const spriteSrc = computed(() => `/images/${store.currentSprite}.png`)

// When sprite changes: fade out → swap → fade in + bounce
watch(() => store.currentSprite, (next, prev) => {
  if (next === prev) return
  loaded.value = false
  bouncing.value = false
  prevSprite.value = prev
})

function onLoad() {
  loaded.value = true
  // Brief bounce animation
  bouncing.value = true
  setTimeout(() => { bouncing.value = false }, 280)
}

function onSpriteClick() {
  store.recordClick()
  store.doAction('pat')
}
</script>
