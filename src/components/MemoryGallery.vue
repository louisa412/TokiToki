<template>
  <Teleport to="body">
    <div class="mg-overlay" :class="{ open: modelValue }" @click.self="close">
      <div class="mg-box">
        <div class="mg-hdr">
          <span class="modal-title">相遇記憶</span>
          <button class="modal-close" @click="close">✕</button>
        </div>

        <div class="mg-sub">{{ characterName }} 的記憶 · {{ memories.length }} 段</div>

        <div v-if="memories.length" class="mg-list">
          <MemoryCard
            v-for="m in memories"
            :key="m.id"
            :character-id="m.characterId"
            :memory-id="m.id"
            :title="m.title"
            :text="m.text"
            :day="m.day"
            :acquired-at="m.acquiredAt"
            :card-style="m.cardStyle"
            :sprite-mood="m.spriteMood"
          />
        </div>

        <div v-else class="mg-empty">
          <div class="mg-empty-ico">🕊</div>
          <div>還沒有留下記憶。</div>
          <div class="mg-empty-hint">和他一起度過的日常，會慢慢留在這裡。</div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { usePetStore } from '../stores/pet'
import { getCharacterName } from '../data/characters'
import { getMemoryDisplayList } from '../systems/memorySystem'

const store = usePetStore()

defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])

function close() { emit('update:modelValue', false) }

const characterName = computed(() => getCharacterName(store.selectedCharacter))

const memories = computed(() => {
  const cs = store.charactersState[store.selectedCharacter]
  return getMemoryDisplayList(cs, store.selectedCharacter)
})
</script>

<style scoped>
.mg-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, .82);
  z-index: 300;
  align-items: center;
  justify-content: center;
}
.mg-overlay.open { display: flex; }

.mg-box {
  background: var(--sur);
  border: 1px solid var(--bd);
  width: min(92vw, 380px);
  min-height: 300px;
  max-height: 85dvh;
  overflow-y: auto;
  padding: 18px;
  animation: su .2s ease;
}

.mg-hdr {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--bd);
}

.mg-sub {
  font-size: 11px;
  color: var(--dim);
  margin-bottom: 14px;
}

.mg-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding-bottom: 6px;
}

.mg-empty {
  text-align: center;
  color: var(--dim);
  font-size: 13px;
  line-height: 2;
  padding: 34px 0 38px;
}
.mg-empty-ico { font-size: 26px; opacity: .6; }
.mg-empty-hint { font-size: 11px; opacity: .8; }
</style>
