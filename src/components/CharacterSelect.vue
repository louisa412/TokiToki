<template>
  <Teleport to="body">
    <div class="char-select-overlay" :class="{ open: modelValue }" @click.self="close">
      <div class="char-select-box">
        <div class="char-select-hdr">
          <span class="modal-title">選擇角色</span>
          <button class="modal-close" @click="close">✕</button>
        </div>

        <div class="char-grid">
          <!-- 已解鎖角色 -->
          <div
            v-for="char in CHARACTERS"
            :key="char.id"
            class="char-card"
            :class="{ 'char-card--selected': store.selectedCharacter === char.id }"
            @click="select(char)"
          >
            <div class="char-av-wrap">
              <img
                :src="`${base}images/${char.id}/happy.png`"
                class="char-av"
                :alt="char.name"
              />
              <div v-if="store.selectedCharacter === char.id" class="char-in-use">使用中</div>
            </div>
            <div class="char-card-name">{{ char.name }}</div>
            <div class="char-card-tag">{{ char.tagline }}</div>
          </div>

          <!-- 鎖定佔位格 -->
          <div
            v-for="n in LOCKED_SLOTS"
            :key="`lock-${n}`"
            class="char-card char-card--locked"
          >
            <div class="char-av-wrap">
              <div class="char-av-lock">🔒</div>
            </div>
            <div class="char-card-name">???</div>
            <div class="char-card-tag">即將登場</div>
          </div>
        </div>

        <div class="char-select-note">切換角色不影響目前的數值</div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { usePetStore } from '../stores/pet'
import { CHARACTERS, LOCKED_SLOTS } from '../data/characters'

const store = usePetStore()
const base  = import.meta.env.BASE_URL

defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])

function close() { emit('update:modelValue', false) }

function select(char) {
  store.setCharacter(char.id)
  close()
}
</script>
